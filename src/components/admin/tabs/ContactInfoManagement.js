import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Edit, Plus, X, Trash2 } from 'lucide-react';
import { fetchContactInfoHistory, fetchCurrentContactInfo, createContactInfo, updateContactInfo, deleteContactInfo } from '../../../redux/slices/adminSlice';
import { useToast } from '../../../context/ToastContext';

function ContactInfoManagement() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const { 
    contactInfoList, 
    currentContactInfo,
    contactInfoPagination,
    isLoadingContactInfo,
    isSubmittingContactInfo
  } = useSelector((state) => state.admin);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingInfo, setEditingInfo] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    support_hours: '',
    support_description: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchContactInfoHistory());
    dispatch(fetchCurrentContactInfo());
  }, [dispatch]);

  const validateForm = (data) => {
    const errors = {};
    
    // Email validation
    if (!data.email?.trim()) {
      errors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Email không hợp lệ';
    }

    // Phone validation
    if (!data.phone?.trim()) {
      errors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(data.phone)) {
      errors.phone = 'Số điện thoại phải có 10-11 số';
    }

    // Address validation
    if (!data.address?.trim()) {
      errors.address = 'Địa chỉ là bắt buộc';
    }
    else if (data.address.length <= 5) {
        errors.address = 'Địa chỉ không được quá ngắn hơn 5 ký tự';
    }
     else if (data.address.length > 255) {
      errors.address = 'Địa chỉ không được quá 255 ký tự';
    }

    // Support hours validation
    if (!data.support_hours?.trim()) {
      errors.support_hours = 'Giờ hỗ trợ là bắt buộc';
    }
    else if (data.support_hours.length <= 5) {
        errors.support_hours = 'Giờ hỗ trợ không được quá ngắn hơn 5 ký tự';
    }
     else if (data.support_hours.length > 100) {
      errors.support_hours = 'Giờ hỗ trợ không được quá 100 ký tự';
    }

    // Support description validation
    if (!data.support_description?.trim()) {
      errors.support_description = 'Mô tả là bắt buộc';
    }
    else if (data.support_description.length <= 5) {
        errors.support_description = 'Mô tả không được quá ngắn hơn 5 ký tự';
    }
    else if (data.support_description.length > 100 ) {
      errors.support_description = 'Mô tả không được quá 100 ký tự';
    }

    return errors;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      return;
    }

    try {
      await dispatch(createContactInfo(formData)).unwrap();
      addToast({
        type: 'success',
        message: 'Thêm thông tin liên hệ thành công!'
      });
      setIsCreating(false);
      setFormData({
        email: '',
        phone: '',
        address: '',
        support_hours: '',
        support_description: ''
      });
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi thêm thông tin liên hệ'
      });
    }
  };

  const handleEditClick = (info) => {
    setEditingInfo(info);
    setFormData({
      email: info.email,
      phone: info.phone,
      address: info.address,
      support_hours: info.support_hours,
      support_description: info.support_description
    });
    setFormErrors({});
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await dispatch(updateContactInfo({
        id: editingInfo.id,
        data: formData
      })).unwrap();
      
      addToast({
        type: 'success',
        message: 'Cập nhật thông tin liên hệ thành công!'
      });
      setIsEditing(false);
      setEditingInfo(null);
      dispatch(fetchContactInfoHistory());
      dispatch(fetchCurrentContactInfo());
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi cập nhật thông tin liên hệ'
      });
    }
  };

  const handleDeleteClick = (info) => {
    if (contactInfoList.length <= 1) {
      addToast({
        type: 'error',
        message: 'Không thể xóa thông tin liên hệ duy nhất'
      });
      return;
    }

    if (currentContactInfo?.id === info.id) {
      addToast({
        type: 'error',
        message: 'Không thể xóa thông tin liên hệ đang hoạt động'
      });
      return;
    }

    setIsDeletingId(info.id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteContactInfo(isDeletingId)).unwrap();
      addToast({
        type: 'success',
        message: 'Xóa thông tin liên hệ thành công!'
      });
      setShowDeleteConfirm(false);
      setIsDeletingId(null);
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi xóa thông tin liên hệ'
      });
    }
  };

  if (isLoadingContactInfo) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Quản lý Thông tin liên hệ</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
          onClick={() => setIsCreating(true)}
        >
          <Plus size={20} />
          Thêm thông tin mới
        </button>
      </div>

      <div className="space-y-4">
        {contactInfoList?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Chưa có thông tin liên hệ nào. Hãy thêm mới!
          </div>
        ) : (
          contactInfoList?.map((info) => (
            <div 
              key={info.id}
              className={`bg-white p-4 rounded-lg shadow-sm ${
                currentContactInfo?.id === info.id ? 'border-2 border-[#98E9E9]' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  {currentContactInfo?.id === info.id && (
                    <span className="inline-block px-2 py-1 text-xs font-medium text-teal-700 bg-teal-50 rounded-full mb-2">
                      Đang hoạt động
                    </span>
                  )}
                  <h3 className="font-medium">Email: {info.email}</h3>
                  <p className="text-gray-600">Số điện thoại: {info.phone}</p>
                  <p className="text-gray-600">Địa chỉ: {info.address}</p>
                  <p className="text-gray-600">Giờ hỗ trợ: {info.support_hours}</p>
                  <p className="text-gray-600">Mô tả: {info.support_description}</p>
                  <p className="text-sm text-gray-500">
                    Cập nhật lần cuối: {format(new Date(info.updated_at), 'dd/MM/yyyy HH:mm')} bởi {info.last_updated_by_name}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Chỉnh sửa"
                    onClick={() => handleEditClick(info)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className={`p-2 rounded-full ${
                      currentContactInfo?.id === info.id || contactInfoList.length <= 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                    title={
                      currentContactInfo?.id === info.id
                        ? 'Không thể xóa thông tin đang hoạt động'
                        : contactInfoList.length <= 1
                        ? 'Không thể xóa thông tin duy nhất'
                        : 'Xóa'
                    }
                    onClick={() => handleDeleteClick(info)}
                    disabled={currentContactInfo?.id === info.id || contactInfoList.length <= 1}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="text-center text-gray-500 mt-4">
        Hiển thị {contactInfoList?.length} trên tổng số {contactInfoPagination.total} thông tin liên hệ
      </div>

      {/* Modal tạo mới */}
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
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">
                  Thêm thông tin liên hệ mới
                </h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      email: e.target.value
                    })}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      phone: e.target.value
                    })}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: e.target.value
                    })}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ hỗ trợ
                  </label>
                  <input
                    type="text"
                    value={formData.support_hours}
                    onChange={(e) => setFormData({
                      ...formData,
                      support_hours: e.target.value
                    })}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.support_hours ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.support_hours && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.support_hours}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.support_description}
                    onChange={(e) => setFormData({
                      ...formData,
                      support_description: e.target.value
                    })}
                    rows={4}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.support_description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.support_description && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.support_description}</p>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={isSubmittingContactInfo}
                  >
                    {isSubmittingContactInfo ? (
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

      {/* Modal chỉnh sửa */}
      {isEditing && (
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
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">
                  Chỉnh sửa thông tin liên hệ
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      email: e.target.value
                    })}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      phone: e.target.value
                    })}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: e.target.value
                    })}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ hỗ trợ
                  </label>
                  <input
                    type="text"
                    value={formData.support_hours}
                    onChange={(e) => setFormData({
                      ...formData,
                      support_hours: e.target.value
                    })}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.support_hours ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.support_hours && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.support_hours}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.support_description}
                    onChange={(e) => setFormData({
                      ...formData,
                      support_description: e.target.value
                    })}
                    rows={4}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.support_description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.support_description && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.support_description}</p>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    disabled={isSubmittingContactInfo}
                  >
                    {isSubmittingContactInfo ? (
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

      {/* Modal xác nhận xóa */}
      {showDeleteConfirm && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => {
              setShowDeleteConfirm(false);
              setIsDeletingId(null);
            }}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Xác nhận xóa
                </h3>
                <p className="text-gray-500">
                  Bạn có chắc chắn muốn xóa thông tin liên hệ này? Hành động này không thể hoàn tác.
                </p>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setIsDeletingId(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    disabled={isSubmittingContactInfo}
                  >
                    {isSubmittingContactInfo ? (
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

export default ContactInfoManagement; 