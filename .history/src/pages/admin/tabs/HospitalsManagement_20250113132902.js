import { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  MoreVertical,
  Building,
  Check,
  X,
  Star,
} from "lucide-react";
import AddEditHospitalModal from "../modals/AddEditHospitalModal";
import SearchBar from "@/components/common/SearchBar";

function HospitalsManagement() {
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "PetPro Veterinary Hospital",
      address: "123 Nguyen Van Linh, District 7, HCMC",
      rating: 4.8,
      status: "active",
      totalAppointments: 234,
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Pet Care Center",
      address: "456 Le Van Viet, District 9, HCMC",
      rating: 4.5,
      status: "active",
      totalAppointments: 156,
      joinDate: "2024-02-01",
    },
  ]);

  const [showActions, setShowActions] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);

  const handleStatusChange = (hospitalId, newStatus) => {
    setHospitals(
      hospitals.map((hospital) =>
        hospital.id === hospitalId
          ? { ...hospital, status: newStatus }
          : hospital
      )
    );
  };

  const handleDeleteHospital = async (hospitalId) => {
    if (window.confirm("Bạn có chắc muốn xóa bệnh viện này?")) {
      try {
        // TODO: Call API to delete hospital
        setHospitals(
          hospitals.filter((hospital) => hospital.id !== hospitalId)
        );
        alert("Xóa bệnh viện thành công!");
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa bệnh viện");
      }
    }
  };

  const handleUpdateStatus = async (hospitalId, newStatus) => {
    try {
      // TODO: Call API to update hospital status
      setHospitals(
        hospitals.map((hospital) =>
          hospital.id === hospitalId
            ? { ...hospital, status: newStatus }
            : hospital
        )
      );
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật trạng thái");
    }
  };

  const handleAddHospital = async (hospitalData) => {
    try {
      // TODO: Call API to add hospital
      const newHospital = {
        id: Date.now(),
        ...hospitalData,
        totalAppointments: 0,
        joinDate: new Date().toISOString().split("T")[0],
      };
      setHospitals([...hospitals, newHospital]);
      setShowModal(false);
      alert("Thêm bệnh viện thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm bệnh viện");
    }
  };

  const handleEditHospital = async (hospitalData) => {
    try {
      // TODO: Call API to update hospital
      setHospitals(
        hospitals.map((hospital) =>
          hospital.id === editingHospital.id
            ? { ...hospital, ...hospitalData }
            : hospital
        )
      );
      setShowModal(false);
      setEditingHospital(null);
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  return (
    <div>
      {/* Actions Bar */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Hospitals Management</h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <select className="min-w-[140px] px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select className="min-w-[140px] px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none">
              <option value="">Rating</option>
              <option value="4.5+">4.5 and above</option>
              <option value="4+">4.0 and above</option>
            </select>
          </div>
          <button
            onClick={() => {
              setEditingHospital(null);
              setShowModal(true);
            }}
            className="whitespace-nowrap px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-full hover:bg-[#7CD5D5] transition-colors"
          >
            <Building size={20} className="inline-block mr-2" />
            Add New Hospital
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hospital
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Appointments
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {hospitals.map((hospital) => (
              <tr key={hospital.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Building size={20} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {hospital.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {hospital.address}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-900">
                      {hospital.rating}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      hospital.status === "active"
                        ? "bg-green-100 text-green-800"
                        : hospital.status === "inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {hospital.status.charAt(0).toUpperCase() +
                      hospital.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hospital.totalAppointments}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hospital.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowActions(
                          showActions === hospital.id ? null : hospital.id
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {showActions === hospital.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
                        <button
                          onClick={() => {
                            setEditingHospital(hospital);
                            setShowModal(true);
                            setShowActions(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit size={16} className="inline mr-2" />
                          Edit Hospital
                        </button>
                        {hospital.status === "active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(hospital.id, "inactive")
                            }
                            className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-gray-50"
                          >
                            <X size={16} className="inline mr-2" />
                            Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(hospital.id, "active")
                            }
                            className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-50"
                          >
                            <Check size={16} className="inline mr-2" />
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => {
                            /* Handle delete */
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          <Trash2 size={16} className="inline mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Building size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                <p className="text-sm text-gray-500">{hospital.address}</p>
              </div>
              <button
                onClick={() =>
                  setShowActions(
                    showActions === hospital.id ? null : hospital.id
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Rating</p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{hospital.rating}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    hospital.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {hospital.status.charAt(0).toUpperCase() +
                    hospital.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Appointments</p>
                <p className="font-medium">{hospital.totalAppointments}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Join Date</p>
                <p className="font-medium">{hospital.joinDate}</p>
              </div>
            </div>

            {showActions === hospital.id && (
              <div className="flex border-t pt-3 mt-3 gap-2">
                <button
                  onClick={() => {
                    setEditingHospital(hospital);
                    setShowModal(true);
                    setShowActions(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(
                      hospital.id,
                      hospital.status === "active" ? "inactive" : "active"
                    )
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg ${
                    hospital.status === "active"
                      ? "text-yellow-600 hover:bg-yellow-50"
                      : "text-green-600 hover:bg-green-50"
                  }`}
                >
                  {hospital.status === "active" ? (
                    <X size={16} />
                  ) : (
                    <Check size={16} />
                  )}
                  {hospital.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => {
                    /* Handle delete */
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="text-sm text-gray-500 order-2 sm:order-1">
          Showing 1 to 10 of 50 results
        </div>
        <div className="flex gap-2 order-1 sm:order-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Hospital Modal */}
      {showModal && (
        <AddEditHospitalModal
          hospital={editingHospital}
          onClose={() => {
            setShowModal(false);
            setEditingHospital(null);
          }}
          onSubmit={editingHospital ? handleEditHospital : handleAddHospital}
        />
      )}
    </div>
  );
}

export default HospitalsManagement;
