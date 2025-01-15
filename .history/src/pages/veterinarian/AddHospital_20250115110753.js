import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { addPendingHospital } from "../../redux/slices/adminSlice";

function AddHospital() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    services: [""],
    workingHours: {
      monday: { open: "09:00", close: "17:00" },
      tuesday: { open: "09:00", close: "17:00" },
      wednesday: { open: "09:00", close: "17:00" },
      thursday: { open: "09:00", close: "17:00" },
      friday: { open: "09:00", close: "17:00" },
      saturday: { open: "09:00", close: "12:00" },
      sunday: { open: "", close: "" },
    },
    license: "",
  });

  const handleServiceChange = (index, value) => {
    const newServices = [...hospital.services];
    newServices[index] = value;
    setHospital({ ...hospital, services: newServices });
  };

  const addService = () => {
    setHospital({ ...hospital, services: [...hospital.services, ""] });
  };

  const removeService = (index) => {
    const newServices = hospital.services.filter((_, i) => i !== index);
    setHospital({ ...hospital, services: newServices });
  };

  const handleWorkingHourChange = (day, type, value) => {
    setHospital({
      ...hospital,
      workingHours: {
        ...hospital.workingHours,
        [day]: { ...hospital.workingHours[day], [type]: value },
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!hospital.name || !hospital.address || !hospital.license) {
      alert("Please fill in all required fields");
      return;
    }

    // Filter out empty services
    const filteredServices = hospital.services.filter((service) => service.trim());
    if (filteredServices.length === 0) {
      alert("Please add at least one service");
      return;
    }

    dispatch(
      addPendingHospital({
        ...hospital,
        services: filteredServices,
        id: Date.now(),
        status: "pending",
        submittedAt: new Date().toISOString().split("T")[0],
      })
    );

    alert("Hospital registration submitted for approval!");
    navigate("/dashboard"); // Redirect to dashboard after submission
  };

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Register Your Hospital</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hospital Name *
              </label>
              <input
                type="text"
                value={hospital.name}
                onChange={(e) =>
                  setHospital({ ...hospital, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                License Number *
              </label>
              <input
                type="text"
                value={hospital.license}
                onChange={(e) =>
                  setHospital({ ...hospital, license: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address *
              </label>
              <input
                type="text"
                value={hospital.address}
                onChange={(e) =>
                  setHospital({ ...hospital, address: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={hospital.phone}
                onChange={(e) =>
                  setHospital({ ...hospital, phone: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={hospital.email}
                onChange={(e) =>
                  setHospital({ ...hospital, email: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Services</h2>
            <button
              type="button"
              onClick={addService}
              className="flex items-center gap-2 px-3 py-1 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
            >
              <Plus size={16} />
              Add Service
            </button>
          </div>
          <div className="space-y-3">
            {hospital.services.map((service, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleServiceChange(index, e.target.value)}
                  placeholder="e.g., Vaccination, Surgery, Grooming"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
                />
                {hospital.services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Working Hours</h2>
          <div className="space-y-3">
            {days.map((day) => (
              <div key={day} className="grid grid-cols-3 gap-4 items-center">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {day}
                </span>
                <input
                  type="time"
                  value={hospital.workingHours[day].open}
                  onChange={(e) =>
                    handleWorkingHourChange(day, "open", e.target.value)
                  }
                  className="rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
                />
                <input
                  type="time"
                  value={hospital.workingHours[day].close}
                  onChange={(e) =>
                    handleWorkingHourChange(day, "close", e.target.value)
                  }
                  className="rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <textarea
            value={hospital.description}
            onChange={(e) =>
              setHospital({ ...hospital, description: e.target.value })
            }
            rows={4}
            placeholder="Tell us about your hospital..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring focus:ring-[#98E9E9] focus:ring-opacity-50"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
          >
            Submit for Approval
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddHospital; 