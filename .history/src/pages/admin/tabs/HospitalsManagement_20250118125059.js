import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Edit, Check, X, Star, Trash2 } from "lucide-react";
import {
  approveHospital,
  rejectHospital,
  deleteHospital,
} from "../../../redux/slices/adminSlice";

function HospitalsManagement() {
  const dispatch = useDispatch();
  const { hospitals } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);

  const handleApprove = (hospitalId) => {
    dispatch(approveHospital(hospitalId));
  };

  const handleReject = (hospitalId) => {
    if (window.confirm("Are you sure you want to reject this hospital?")) {
      dispatch(rejectHospital(hospitalId));
    }
  };

  const handleDelete = (hospitalId) => {
    if (window.confirm("Are you sure you want to delete this hospital?")) {
      dispatch(deleteHospital(hospitalId));
    }
  };

  const handleView = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleEdit = (hospital) => {
    setSelectedHospital(hospital);
  };

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredHospitals.map((hospital) => (
                <tr key={hospital.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hospital.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hospital.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star
                        className="w-4 h-4 text-yellow-400 mr-1"
                        fill="currentColor"
                      />
                      {hospital.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        hospital.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {hospital.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(hospital)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(hospital)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(hospital.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredHospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{hospital.name}</h3>
                <p className="text-sm text-gray-500">{hospital.address}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  hospital.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {hospital.status}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Star
                className="w-4 h-4 text-yellow-400 mr-1"
                fill="currentColor"
              />
              <span>{hospital.rating}</span>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleView(hospital)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Eye size={18} />
              </button>
              <button
                onClick={() => handleEdit(hospital)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(hospital.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedHospital && (
        <div className="fixed inset-0 bg-black/50 z-[100]" />
      )}

      {/* Hospital Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">Hospital Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedHospital.name}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={selectedHospital.address}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  value={selectedHospital.phone}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedHospital.email}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <input
                  type="text"
                  value={selectedHospital.status}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedHospital(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HospitalsManagement;
