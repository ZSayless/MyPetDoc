import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Edit, Check, X, Star, Trash2, ToggleLeft, ToggleRight, Plus } from "lucide-react";
import {
  approveHospital,
  rejectHospital,
  deleteHospital,
  updateHospital,
  fetchHospitals,
  toggleActiveHospital,
} from "../../../redux/slices/adminSlice";
import { useToast } from "../../../context/ToastContext";

function HospitalsManagement() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const { hospitals, loading, pagination } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  useEffect(() => {
    dispatch(fetchHospitals({ page: 1, limit: 10 }));
  }, [dispatch]);

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
    setModalMode("view");
  };

  const handleEdit = (hospital) => {
    setSelectedHospital(hospital);
    setModalMode("edit");
  };

  const handleUpdateHospital = (updatedHospital) => {
    // Gọi API để cập nhật hospital
    dispatch(updateHospital(updatedHospital));
  };

  const handleToggleActive = async (hospitalId, currentActiveState) => {
    try {
      const message = currentActiveState 
        ? "Bạn có chắc muốn vô hiệu hóa bệnh viện này?" 
        : "Bạn có chắc muốn kích hoạt bệnh viện này?";
      
      if (window.confirm(message)) {
        await dispatch(toggleActiveHospital(hospitalId)).unwrap();
        addToast({
          type: "success",
          message: `${currentActiveState ? 'Vô hiệu hóa' : 'Kích hoạt'} bệnh viện thành công!`
        });
      }
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "Có lỗi xảy ra khi cập nhật trạng thái"
      });
    }
  };

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      {/* Header Tabs */}
      <div className="flex gap-2 mb-4">
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md">
          Danh sách bệnh viện
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
          Thùng rác
        </button>
      </div>

      {/* Search and Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <Plus size={20} />
          Thêm bệnh viện
        </button>
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
                  Phone
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
                    {hospital.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        hospital.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {hospital.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => handleToggleActive(hospital.id, hospital.is_active)}
                        className={`p-1 rounded hover:bg-gray-100 ${
                          hospital.is_active 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}
                        title={hospital.is_active ? 'Deactivate hospital' : 'Activate hospital'}
                      >
                        {hospital.is_active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                      </button>
                    </div>
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
                <p className="text-sm text-gray-500">{hospital.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  hospital.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {hospital.is_active ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={() => handleToggleActive(hospital.id, hospital.is_active)}
                  className={`p-1 rounded hover:bg-gray-100 ${
                    hospital.is_active 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}
                  title={hospital.is_active ? 'Deactivate hospital' : 'Activate hospital'}
                >
                  {hospital.is_active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                </button>
              </div>
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

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredHospitals.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy bệnh viện nào
        </div>
      )}

      {/* Modal Overlay */}
      {selectedHospital && (
        <div className="fixed inset-0 bg-black/50 z-[100]" />
      )}

      {/* Hospital Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 flex items-center justify-center z-[110]">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {modalMode === "view" ? "Hospital Details" : "Edit Hospital"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={selectedHospital.name}
                    readOnly={modalMode === "view"}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                      modalMode === "view"
                        ? "bg-gray-50"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={selectedHospital.address}
                    readOnly={modalMode === "view"}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                      modalMode === "view"
                        ? "bg-gray-50"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={selectedHospital.phone}
                    readOnly={modalMode === "view"}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                      modalMode === "view"
                        ? "bg-gray-50"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={selectedHospital.email}
                    readOnly={modalMode === "view"}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                      modalMode === "view"
                        ? "bg-gray-50"
                        : "focus:ring-2 focus:ring-blue-500"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <div className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                    modalMode === "view" ? "bg-gray-50" : ""
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedHospital.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedHospital.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => handleToggleActive(selectedHospital.id, selectedHospital.is_active)}
                        className={`p-1 rounded hover:bg-gray-100 ${
                          selectedHospital.is_active
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                        title={selectedHospital.is_active ? 'Deactivate hospital' : 'Activate hospital'}
                      >
                        {selectedHospital.is_active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                {modalMode === "view" ? (
                  <>
                    <button
                      onClick={() => setSelectedHospital(null)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setModalMode("edit")}
                      className="px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setModalMode("view");
                        setSelectedHospital({ ...selectedHospital }); // Reset changes
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        handleUpdateHospital(selectedHospital);
                        setSelectedHospital(null);
                      }}
                      className="px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
                    >
                      Save Changes
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between py-3">
        <div className="text-sm text-gray-500">
          Showing {pagination.page} of {pagination.totalPages} pages
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(fetchHospitals({ page: pagination.page - 1, limit: pagination.limit }))}
            disabled={pagination.page === 1}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => dispatch(fetchHospitals({ page: pagination.page + 1, limit: pagination.limit }))}
            disabled={pagination.page === pagination.totalPages}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default HospitalsManagement;
