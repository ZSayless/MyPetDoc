import { useState, useEffect } from "react";
import { Plus, Edit, Eye, ChevronDown, X, Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutUsHistory, createAboutUs, updateAboutUs, fetchCurrentAboutUs, deleteAboutUs } from "../../../redux/slices/adminSlice";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

function AboutUsManagement() {
  const dispatch = useDispatch();
  const { 
    aboutUsVersions, 
    isLoadingAboutUs, 
    aboutUsError, 
    isSubmittingAboutUs,
    currentAboutUs,
  } = useSelector((state) => state.admin);
  const [expandedId, setExpandedId] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const { addToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVersion, setEditingVersion] = useState(null);
  const [formData, setFormData] = useState({
    title: 'About Us',
    content: '',
    mission: '',
    vision: '',
    core_values: '',
    team_description: ''
  });
  const [errors, setErrors] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingVersion, setDeletingVersion] = useState(null);

  useEffect(() => {
    dispatch(fetchAboutUsHistory());
    dispatch(fetchCurrentAboutUs());
  }, [dispatch]);

  const handleViewVersion = (version) => {
    setSelectedVersion(version);
    setIsViewing(true);
  };

  const isLatestVersion = (version) => {
    if (!currentAboutUs) return false;
    return version.id === currentAboutUs.id;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Tiêu đề không được vượt quá 200 ký tự';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Vui lòng nhập nội dung';
    } else if (formData.content.length > 1000) {
      newErrors.content = 'Nội dung không được vượt quá 1000 ký tự';
    }

    if (!formData.mission.trim()) {
      newErrors.mission = 'Vui lòng nhập sứ mệnh';
    } else if (formData.mission.length > 500) {
      newErrors.mission = 'Sứ mệnh không được vượt quá 500 ký tự';
    }

    if (!formData.vision.trim()) {
      newErrors.vision = 'Vui lòng nhập tầm nhìn';
    } else if (formData.vision.length > 500) {
      newErrors.vision = 'Tầm nhìn không được vượt quá 500 ký tự';
    }

    if (!formData.core_values.trim()) {
      newErrors.core_values = 'Vui lòng nhập giá trị cốt lõi';
    } else if (formData.core_values.length > 500) {
      newErrors.core_values = 'Giá trị cốt lõi không được vượt quá 500 ký tự';
    }

    if (!formData.team_description.trim()) {
      newErrors.team_description = 'Vui lòng nhập mô tả về đội ngũ';
    } else if (formData.team_description.length > 500) {
      newErrors.team_description = 'Mô tả về đội ngũ không được vượt quá 500 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(createAboutUs(formData)).unwrap();
      addToast({
        type: 'success',
        message: 'Tạo phiên bản About Us mới thành công!'
      });
      setIsCreating(false);
      setFormData({
        title: '',
        content: '',
        mission: '',
        vision: '',
        core_values: '',
        team_description: ''
      });
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi tạo phiên bản About Us'
      });
    }
  };

  const handleEditClick = (version) => {
    if (!isLatestVersion(version)) {
      addToast({
        type: 'error',
        message: 'Chỉ có thể chỉnh sửa phiên bản đang sử dụng'
      });
      return;
    }
    setEditingVersion(version);
    setFormData({
      title: version.title,
      content: version.content,
      mission: version.mission,
      vision: version.vision,
      core_values: version.core_values,
      team_description: version.team_description
    });
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(updateAboutUs({
        id: editingVersion.id,
        data: formData
      })).unwrap();
      
      addToast({
        type: 'success',
        message: 'Cập nhật About Us thành công!'
      });
      setIsEditing(false);
      setEditingVersion(null);
      setFormData({
        title: '',
        content: '',
        mission: '',
        vision: '',
        core_values: '',
        team_description: ''
      });

      dispatch(fetchAboutUsHistory());
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi cập nhật About Us'
      });
    }
  };

  const canDelete = () => {
    return aboutUsVersions?.length > 1;
  };

  const handleDeleteClick = (version) => {
    if (!canDelete()) {
      addToast({
        type: 'error',
        message: 'Không thể xóa phiên bản duy nhất'
      });
      return;
    }
    setDeletingVersion(version);
    setIsDeleting(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteAboutUs(deletingVersion.id)).unwrap();
      
      await dispatch(fetchCurrentAboutUs());
      
      addToast({
        type: 'success',
        message: 'Xóa phiên bản thành công!'
      });
      setIsDeleting(false);
      setDeletingVersion(null);

      dispatch(fetchAboutUsHistory());
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi xóa phiên bản'
      });
    }
  };

  if (isLoadingAboutUs) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (aboutUsError) {
    return (
      <div className="p-6 text-center text-red-600">
        Có lỗi xảy ra khi tải lịch sử About Us: {aboutUsError.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Quản lý About Us</h2>
        <button
          onClick={() => {
            setIsCreating(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
        >
          <Plus size={20} />
          Thêm phiên bản mới
        </button>
      </div>

      <div className="space-y-4">
        {aboutUsVersions?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Chưa có phiên bản About Us nào. Hãy thêm phiên bản mới!
          </div>
        ) : (
          aboutUsVersions?.map((version) => (
            <div 
              key={version.id} 
              className={`bg-white p-4 rounded-lg shadow-sm ${
                isLatestVersion(version) ? 'border-2 border-green-500' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <button
                    onClick={() => setExpandedId(expandedId === version.id ? null : version.id)}
                    className="w-full flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-left">
                          Phiên bản {version.version} - {version.title}
                        </h3>
                        {isLatestVersion(version) && (
                          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                            Đang sử dụng
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Cập nhật lần cuối: {format(new Date(version.updated_at), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        {' '}bởi {version.last_updated_by_name}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedId === version.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedId === version.id && (
                    <div className="mt-4 space-y-2 text-gray-600">
                      <p><strong>Sứ mệnh:</strong> {version.mission}</p>
                      <p><strong>Tầm nhìn:</strong> {version.vision}</p>
                      <p><strong>Giá trị cốt lõi:</strong> {version.core_values}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleViewVersion(version)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Xem chi tiết"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEditClick(version)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Chỉnh sửa"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(version)}
                    className={`p-2 rounded-full ${
                      canDelete() 
                        ? 'text-red-600 hover:bg-red-50' 
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    title={canDelete() ? 'Xóa' : 'Không thể xóa phiên bản duy nhất'}
                    disabled={!canDelete()}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isViewing && selectedVersion && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => {
              setIsViewing(false);
              setSelectedVersion(null);
            }}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
                <h2 className="text-xl font-semibold">
                  Chi tiết About Us - Phiên bản {selectedVersion.version}
                </h2>
                <button
                  onClick={() => {
                    setIsViewing(false);
                    setSelectedVersion(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Tiêu đề</h3>
                  <p className="text-gray-600">{selectedVersion.title}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Nội dung</h3>
                  <p className="text-gray-600">{selectedVersion.content}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Sứ mệnh</h3>
                  <p className="text-gray-600">{selectedVersion.mission}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Tầm nhìn</h3>
                  <p className="text-gray-600">{selectedVersion.vision}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Giá trị cốt lõi</h3>
                  <p className="text-gray-600">{selectedVersion.core_values}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Mô tả về đội ngũ</h3>
                  <p className="text-gray-600">{selectedVersion.team_description}</p>
                </div>

                {selectedVersion.banner_image && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Ảnh banner</h3>
                    <img 
                      src={selectedVersion.banner_image} 
                      alt="Banner"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  <p>Cập nhật lần cuối: {format(new Date(selectedVersion.updated_at), 'dd/MM/yyyy HH:mm', { locale: vi })}</p>
                  <p>Người cập nhật: {selectedVersion.last_updated_by_name}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isCreating && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setIsCreating(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
                <h2 className="text-xl font-semibold">Thêm phiên bản About Us mới</h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.content ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sứ mệnh <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="mission"
                    value={formData.mission}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.mission ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.mission && <p className="mt-1 text-sm text-red-500">{errors.mission}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tầm nhìn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="vision"
                    value={formData.vision}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.vision ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.vision && <p className="mt-1 text-sm text-red-500">{errors.vision}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá trị cốt lõi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="core_values"
                    value={formData.core_values}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.core_values ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.core_values && <p className="mt-1 text-sm text-red-500">{errors.core_values}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả về đội ngũ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="team_description"
                    value={formData.team_description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.team_description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.team_description && <p className="mt-1 text-sm text-red-500">{errors.team_description}</p>}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={isSubmittingAboutUs}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingAboutUs}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmittingAboutUs ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang lưu...</span>
                      </>
                    ) : (
                      'Lưu'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {isEditing && editingVersion && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setIsEditing(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
                <h2 className="text-xl font-semibold">Thêm phiên bản About Us mới</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.content ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sứ mệnh <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="mission"
                    value={formData.mission}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.mission ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.mission && <p className="mt-1 text-sm text-red-500">{errors.mission}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tầm nhìn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="vision"
                    value={formData.vision}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.vision ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.vision && <p className="mt-1 text-sm text-red-500">{errors.vision}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá trị cốt lõi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="core_values"
                    value={formData.core_values}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.core_values ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.core_values && <p className="mt-1 text-sm text-red-500">{errors.core_values}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả về đội ngũ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="team_description"
                    value={formData.team_description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.team_description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.team_description && <p className="mt-1 text-sm text-red-500">{errors.team_description}</p>}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={isSubmittingAboutUs}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingAboutUs}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmittingAboutUs ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang lưu...</span>
                      </>
                    ) : (
                      'Lưu'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {isDeleting && deletingVersion && canDelete() && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => {
              setIsDeleting(false);
              setDeletingVersion(null);
            }}
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
                <h3 className="mb-4 text-xl font-medium text-center text-gray-900">
                  Xác nhận xóa
                </h3>
                <p className="text-center text-gray-500">
                  Bạn có chắc chắn muốn xóa phiên bản {deletingVersion.version}? 
                  {isLatestVersion(deletingVersion) && (
                    <span className="block mt-2 font-medium text-red-600">
                      Lưu ý: Đây là phiên bản đang được sử dụng!
                    </span>
                  )}
                  Hành động này không thể hoàn tác.
                </p>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeleting(false);
                      setDeletingVersion(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={isSubmittingAboutUs}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isSubmittingAboutUs}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    {isSubmittingAboutUs ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang xóa...</span>
                      </>
                    ) : (
                      'Xóa'
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

export default AboutUsManagement;
