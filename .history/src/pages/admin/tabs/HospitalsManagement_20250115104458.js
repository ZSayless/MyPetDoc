import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Edit, Trash2, Check, X } from "lucide-react";
import { 
  fetchHospitals, 
  approveHospital, 
  rejectHospital 
} from "../../../redux/slices/adminSlice";

function HospitalsManagement() {
  const dispatch = useDispatch();
  const { hospitals, loading } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchHospitals());
  }, [dispatch]);

  const handleView = (hospitalId) => {
    // TODO: Navigate to hospital detail
    console.log("View hospital:", hospitalId);
  };

  const handleEdit = (hospitalId) => {
    // TODO: Open edit modal
    console.log("Edit hospital:", hospitalId);
  };

  const handleApprove = async (hospitalId) => {
    try {
      await dispatch(approveHospital(hospitalId)).unwrap();
    } catch (error) {
      alert("Failed to approve hospital");
    }
  };

  const handleReject = async (hospitalId) => {
    if (window.confirm("Are you sure you want to reject this hospital?")) {
      try {
        await dispatch(rejectHospital(hospitalId)).unwrap();
      } catch (error) {
        alert("Failed to reject hospital");
      }
    }
  };

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
          />
        </div>
      </div>

      {/* Table */}
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
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
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
            {filteredHospitals.map((hospital) => (
              <tr key={hospital.id}>
                <td className="px-6 py-4 whitespace-nowrap">{hospital.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hospital.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    hospital.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : hospital.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {hospital.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{hospital.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{hospital.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => handleView(hospital.id)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(hospital.id)}
                      className="text-green-600 hover:text-green-900"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    {hospital.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(hospital.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => handleReject(hospital.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HospitalsManagement;
