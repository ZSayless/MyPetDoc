import { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Edit, Check, X, Star, Trash2, ToggleLeft, ToggleRight, Plus, RefreshCw, AlertTriangle } from "lucide-react";
import {
  approveHospital,
  rejectHospital,
  deleteHospital,
  updateHospital,
  fetchHospitals,
  toggleActiveHospital,
  fetchDeletedHospitals,
  toggleDeleteHospital,
  createHospital,
  deleteHospitalPermanently,
} from "../../../redux/slices/adminSlice";
import { useToast } from "../../../context/ToastContext";

function HospitalsManagement() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const { hospitals, deletedHospitals, loading, pagination, deletedPagination } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [activeTab, setActiveTab] = useState("list");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageIdsToDelete, setImageIdsToDelete] = useState([]);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newHospital, setNewHospital] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    link_website: '',
    map_location: '',
    department: '',
    operating_hours: '',
    specialties: '',
    staff_description: '',
    staff_credentials: ''
  });
  const [newImages, setNewImages] = useState([]);
  const [hospitalToDelete, setHospitalToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (activeTab === "list") {
      dispatch(fetchHospitals({ page: 1, limit: 10 }));
    } else {
      dispatch(fetchDeletedHospitals({ page: 1, limit: 10 }));
    }
  }, [dispatch, activeTab]);

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

  const handleUpdateHospital = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // Thêm các trường thông tin cơ bản
      formData.append('name', selectedHospital.name);
      formData.append('address', selectedHospital.address);
      formData.append('phone', selectedHospital.phone);
      formData.append('email', selectedHospital.email);
      formData.append('link_website', selectedHospital.link_website);
      formData.append('map_location', selectedHospital.map_location);
      formData.append('description', selectedHospital.description);
      formData.append('department', selectedHospital.department);
      formData.append('operating_hours', selectedHospital.operating_hours);
      formData.append('specialties', selectedHospital.specialties);
      formData.append('staff_description', selectedHospital.staff_description);
      formData.append('staff_credentials', selectedHospital.staff_credentials);

      // Thêm ảnh mới
      selectedImages.forEach((file) => {
        formData.append('images', file);
      });

      // Thêm danh sách ID ảnh cần xóa với tên mới
      if (imageIdsToDelete.length > 0) {
        formData.append('imageIdsToDelete', JSON.stringify(imageIdsToDelete));
      }

      await dispatch(updateHospital({
        hospitalId: selectedHospital.id,
        formData
      })).unwrap();

      addToast({
        type: 'success',
        message: 'Cập nhật thông tin bệnh viện thành công!'
      });

      setModalMode('view');
      setSelectedImages([]);
      setImageIdsToDelete([]);
      
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi cập nhật thông tin'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedHospital.images.length - imageIdsToDelete.length > 5) {
      addToast({
        type: 'error',
        message: 'Tối đa 5 ảnh được phép tải lên'
      });
      return;
    }
    setSelectedImages(prev => [...prev, ...files]);
  };

  const handleDeleteImage = (imageId) => {
    setImageIdsToDelete(prev => [...prev, imageId]);
  };

  const handleRemoveSelectedImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
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

  const handleToggleDelete = async (hospitalId) => {
    try {
      const message = "Bạn có chắc chắn muốn thực hiện hành động này?";
      if (window.confirm(message)) {
        await dispatch(toggleDeleteHospital(hospitalId)).unwrap();
        addToast({
          type: "success",
          message: "Thao tác thành công!"
        });
      }
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "Có lỗi xảy ra"
      });
    }
  };

  const handleCreateHospital = async (e) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const formData = new FormData();
      
      // Thêm các trường bắt buộc
      formData.append('name', newHospital.name);
      formData.append('address', newHospital.address);
      formData.append('phone', newHospital.phone);
      formData.append('email', newHospital.email);

      // Thêm các trường không bắt buộc
      if (newHospital.description) formData.append('description', newHospital.description);
      if (newHospital.link_website) formData.append('link_website', newHospital.link_website);
      if (newHospital.map_location) formData.append('map_location', newHospital.map_location);
      if (newHospital.department) formData.append('department', newHospital.department);
      if (newHospital.operating_hours) formData.append('operating_hours', newHospital.operating_hours);
      if (newHospital.specialties) formData.append('specialties', newHospital.specialties);
      if (newHospital.staff_description) formData.append('staff_description', newHospital.staff_description);
      if (newHospital.staff_credentials) formData.append('staff_credentials', newHospital.staff_credentials);

      // Thêm ảnh
      newImages.forEach((file) => {
        formData.append('images', file);
      });

      await dispatch(createHospital(formData)).unwrap();

      addToast({
        type: 'success',
        message: 'Thêm bệnh viện mới thành công!'
      });

      // Reset form
      setNewHospital({
        name: '',
        address: '',
        phone: '',
        email: '',
        description: '',
        link_website: '',
        map_location: '',
        department: '',
        operating_hours: '',
        specialties: '',
        staff_description: '',
        staff_credentials: ''
      });
      setNewImages([]);
      setModalMode('');
      
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi thêm bệnh viện'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + newImages.length > 5) {
      addToast({
        type: 'error',
        message: 'Tối đa 5 ảnh được phép tải lên'
      });
      return;
    }
    setNewImages(prev => [...prev, ...files]);
  };

  const handleRemoveNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeletePermanently = async () => {
    if (!hospitalToDelete) return;
    
    setIsDeleting(true);
    try {
      await dispatch(deleteHospitalPermanently(hospitalToDelete.id)).unwrap();
      
      addToast({
        type: 'success',
        message: 'Xóa bệnh viện thành công!'
      });
      
      setHospitalToDelete(null);
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi xóa bệnh viện'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getFilteredHospitals = () => {
    const currentHospitals = activeTab === "list" ? hospitals : deletedHospitals;
    if (!currentHospitals) return [];
    
    return currentHospitals.filter(hospital => 
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Hàm xử lý đóng form
  const handleCloseForm = () => {
    setModalMode('view');
    setSelectedHospital(null);
    setSelectedImages([]);
    setImageIdsToDelete([]);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header Tabs */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "list" 
              ? "text-white bg-blue-600" 
              : "text-gray-700 bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Danh sách bệnh viện
        </button>
        <button 
          onClick={() => setActiveTab("trash")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "trash" 
              ? "text-white bg-blue-600" 
              : "text-gray-700 bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Thùng rác
        </button>
      </div>

      {/* Search and Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo tên, email, số điện thoại, địa chỉ..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <button 
          onClick={() => setModalMode('create')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creator
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {getFilteredHospitals()?.map((hospital) => (
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
                  <td className="px-6 py-4">
                    {hospital?.creator && (
                      <div className="flex items-center gap-2">
                        {hospital.creator.avatar && (
                          <img 
                            src={hospital.creator.avatar} 
                            alt={hospital.creator.full_name}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {hospital.creator.full_name || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {hospital.creator.email || 'N/A'}
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(hospital)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      {activeTab === "list" ? (
                        <>
                          <button
                            onClick={() => handleEdit(hospital)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleToggleDelete(hospital.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Move to trash"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleToggleDelete(hospital.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Restore"
                          >
                            <RefreshCw size={18} />
                          </button>
                          <button
                            onClick={() => setHospitalToDelete(hospital)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete permanently"
                          >
                            <Trash2 size={18} />
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

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {getFilteredHospitals()?.map((hospital) => (
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

            {hospital?.creator && (
              <div className="mt-4 flex items-center gap-2">
                {hospital.creator.avatar && (
                  <img 
                    src={hospital.creator.avatar} 
                    alt={hospital.creator.full_name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {hospital.creator.full_name || 'N/A'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {hospital.creator.email || 'N/A'}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleView(hospital)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Eye size={18} />
              </button>
              {activeTab === "list" ? (
                <>
                  <button
                    onClick={() => handleEdit(hospital)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleToggleDelete(hospital.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Move to trash"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleToggleDelete(hospital.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                    title="Restore"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={() => setHospitalToDelete(hospital)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Delete permanently"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
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
      {!loading && getFilteredHospitals()?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm 
            ? "Không tìm thấy kết quả phù hợp"
            : activeTab === "list" 
              ? "Không có bệnh viện nào" 
              : "Thùng rác trống"
          }
        </div>
      )}

      {/* Modal */}
      {selectedHospital && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={handleCloseForm}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Ngăn việc click vào modal sẽ đóng nó
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {modalMode === "view" ? "Chi tiết bệnh viện" : "Chỉnh sửa bệnh viện"}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form content */}
              {modalMode === 'edit' && (
                <form onSubmit={handleUpdateHospital} className="space-y-6 p-6">
                  {/* Thông tin cơ bản */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tên bệnh viện</label>
                      <input
                        type="text"
                        value={selectedHospital.name}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, name: e.target.value}))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={selectedHospital.email}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, email: e.target.value}))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                      <input
                        type="text"
                        value={selectedHospital.phone}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, phone: e.target.value}))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Website</label>
                      <input
                        type="text"
                        value={selectedHospital.link_website}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, link_website: e.target.value}))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                      <input
                        type="text"
                        value={selectedHospital.address}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, address: e.target.value}))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vị trí bản đồ</label>
                      <input
                        type="text"
                        value={selectedHospital.map_location}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, map_location: e.target.value}))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Giờ làm việc</label>
                      <input
                        type="text"
                        value={selectedHospital.operating_hours}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, operating_hours: e.target.value}))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Khoa/phòng</label>
                      <input
                        type="text"
                        value={selectedHospital.department}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, department: e.target.value}))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Các trường textarea */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Chuyên khoa</label>
                      <textarea
                        value={selectedHospital.specialties}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, specialties: e.target.value}))}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                      <textarea
                        value={selectedHospital.description}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, description: e.target.value}))}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mô tả nhân viên</label>
                      <textarea
                        value={selectedHospital.staff_description}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, staff_description: e.target.value}))}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Chứng chỉ nhân viên</label>
                      <textarea
                        value={selectedHospital.staff_credentials}
                        onChange={(e) => setSelectedHospital(prev => ({...prev, staff_credentials: e.target.value}))}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Phần upload ảnh */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh</label>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      {selectedHospital.images
                        .filter(img => !imageIdsToDelete.includes(img.id))
                        .map((image) => (
                          <div key={image.id} className="relative">
                            <img
                              src={image.url}
                              alt="Hospital"
                              className="h-24 w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(image.id)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      
                      {selectedImages.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="h-24 w-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSelectedImage(index)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}

                      {selectedHospital.images.length - imageIdsToDelete.length + selectedImages.length < 5 && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="h-24 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400"
                        >
                          <Plus size={24} className="text-gray-400" />
                        </button>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleCloseForm}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Đang lưu...</span>
                        </>
                      ) : (
                        'Lưu thay đổi'
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* View mode content */}
              {modalMode === 'view' && (
                <div className="p-6 space-y-6">
                  {/* Thông tin cơ bản */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Tên bệnh viện</h3>
                      <p className="mt-1 text-sm text-gray-900">{selectedHospital.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1 text-sm text-gray-900">{selectedHospital.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Số điện thoại</h3>
                      <p className="mt-1 text-sm text-gray-900">{selectedHospital.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Website</h3>
                      <a 
                        href={selectedHospital.link_website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-1 text-sm text-blue-600 hover:underline"
                      >
                        {selectedHospital.link_website}
                      </a>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Địa chỉ</h3>
                      <p className="mt-1 text-sm text-gray-900">{selectedHospital.address}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Giờ hoạt động</h3>
                      <p className="mt-1 text-sm text-gray-900">{selectedHospital.operating_hours}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Khoa</h3>
                      <p className="mt-1 text-sm text-gray-900">{selectedHospital.department}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Chuyên khoa</h3>
                      <p className="mt-1 text-sm text-gray-900">{selectedHospital.specialties}</p>
                    </div>
                  </div>

                  {/* Thông tin thêm */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Mô tả</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedHospital.description}</p>
                  </div>

                  {/* Thông tin nhân viên */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Thông tin nhân viên</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedHospital.staff_description}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Chứng chỉ nhân viên</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedHospital.staff_credentials}</p>
                  </div>

                  {/* Hình ảnh */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Hình ảnh</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedHospital.images?.map((image) => (
                        <div key={image.id} className="relative">
                          <img
                            src={image.url}
                            alt="Hospital"
                            className="h-24 w-full object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trạng thái */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Trạng thái:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedHospital.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedHospital.is_active ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleCloseForm}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Đóng
                    </button>
                    <button
                      onClick={() => setModalMode('edit')}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Chỉnh sửa
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Create Modal */}
      {modalMode === 'create' && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setModalMode('')}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Thêm bệnh viện mới</h2>
                <button
                  onClick={() => setModalMode('')}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateHospital} className="space-y-6 p-6">
                {/* Required Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tên bệnh viện <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newHospital.name}
                      onChange={(e) => setNewHospital(prev => ({...prev, name: e.target.value}))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={newHospital.email}
                      onChange={(e) => setNewHospital(prev => ({...prev, email: e.target.value}))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newHospital.phone}
                      onChange={(e) => setNewHospital(prev => ({...prev, phone: e.target.value}))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newHospital.address}
                      onChange={(e) => setNewHospital(prev => ({...prev, address: e.target.value}))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Optional Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    <input
                      type="text"
                      value={newHospital.link_website}
                      onChange={(e) => setNewHospital(prev => ({...prev, link_website: e.target.value}))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Vị trí bản đồ</label>
                    <input
                      type="text"
                      value={newHospital.map_location}
                      onChange={(e) => setNewHospital(prev => ({...prev, map_location: e.target.value}))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Giờ làm việc</label>
                    <input
                      type="text"
                      value={newHospital.operating_hours}
                      onChange={(e) => setNewHospital(prev => ({...prev, operating_hours: e.target.value}))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Khoa/phòng</label>
                    <input
                      type="text"
                      value={newHospital.department}
                      onChange={(e) => setNewHospital(prev => ({...prev, department: e.target.value}))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Textarea Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Chuyên khoa</label>
                    <textarea
                      value={newHospital.specialties}
                      onChange={(e) => setNewHospital(prev => ({...prev, specialties: e.target.value}))}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <textarea
                      value={newHospital.description}
                      onChange={(e) => setNewHospital(prev => ({...prev, description: e.target.value}))}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mô tả nhân viên</label>
                    <textarea
                      value={newHospital.staff_description}
                      onChange={(e) => setNewHospital(prev => ({...prev, staff_description: e.target.value}))}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Chứng chỉ nhân viên</label>
                    <textarea
                      value={newHospital.staff_credentials}
                      onChange={(e) => setNewHospital(prev => ({...prev, staff_credentials: e.target.value}))}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh</label>
                  <div className="grid grid-cols-3 gap-4">
                    {newImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="h-24 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    
                    {newImages.length < 5 && (
                      <label className="h-24 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 cursor-pointer">
                        <Plus size={24} className="text-gray-400" />
                        <input
                          type="file"
                          onChange={handleNewImageChange}
                          multiple
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    disabled={isCreating}
                    onClick={() => setModalMode('')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isCreating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang tạo...</span>
                      </>
                    ) : (
                      'Tạo mới'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Pagination */}
      {getFilteredHospitals()?.length > 0 && (
        <div className="flex items-center justify-between py-3">
          <div className="text-sm text-gray-500">
            Showing {activeTab === "list" ? pagination.page : deletedPagination.page} of{" "}
            {activeTab === "list" ? pagination.totalPages : deletedPagination.totalPages} pages
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const action = activeTab === "list" ? fetchHospitals : fetchDeletedHospitals;
                const currentPage = activeTab === "list" ? pagination.page : deletedPagination.page;
                dispatch(action({ page: currentPage - 1, limit: 10 }));
              }}
              disabled={
                activeTab === "list" 
                  ? pagination.page === 1 || hospitals.length === 0
                  : deletedPagination.page === 1 || deletedHospitals.length === 0
              }
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => {
                const action = activeTab === "list" ? fetchHospitals : fetchDeletedHospitals;
                const currentPage = activeTab === "list" ? pagination.page : deletedPagination.page;
                const totalPages = activeTab === "list" ? pagination.totalPages : deletedPagination.totalPages;
                dispatch(action({ page: currentPage + 1, limit: 10 }));
              }}
              disabled={
                activeTab === "list"
                  ? pagination.page === pagination.totalPages || hospitals.length === 0
                  : deletedPagination.page === deletedPagination.totalPages || deletedHospitals.length === 0
              }
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {hospitalToDelete && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setHospitalToDelete(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-center text-gray-900">
                  Xóa vĩnh viễn bệnh viện
                </h3>
                <p className="text-sm text-center text-gray-500">
                  Bạn có chắc chắn muốn xóa vĩnh viễn bệnh viện "{hospitalToDelete.name}"? 
                  Hành động này không thể hoàn tác.
                </p>
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => setHospitalToDelete(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={handleDeletePermanently}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang xóa...</span>
                      </>
                    ) : (
                      'Xóa vĩnh viễn'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HospitalsManagement;
