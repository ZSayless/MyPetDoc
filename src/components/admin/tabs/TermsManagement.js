import { useState, useEffect } from "react";
import { Plus, Edit, Eye, ChevronDown, X, Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchTermsList, createTerms, deleteTerms, updateTerms } from "../../../redux/slices/adminSlice";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

function TermsManagement() {
  const dispatch = useDispatch();
  const { 
    termsList, 
    termsPagination,
    isLoadingTerms, 
    termsError, 
    isSubmittingTerms 
  } = useSelector((state) => state.admin);
  const [expandedId, setExpandedId] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedTerms, setSelectedTerms] = useState(null);
  const { addToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    effective_date: format(new Date(), 'yyyy-MM-dd')
  });
  const [formErrors, setFormErrors] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingTerms, setDeletingTerms] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTerms, setEditingTerms] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [canDeleteTerms, setCanDeleteTerms] = useState(false);

  useEffect(() => {
    dispatch(fetchTermsList({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setCanDeleteTerms(termsPagination.total > 1);
  }, [termsPagination.total]);

  const handleViewTerms = (terms) => {
    setSelectedTerms(terms);
    setIsViewing(true);
  };

  const handleDeleteClick = (terms) => {
    if (!canDeleteTerms) {
      addToast({
        type: 'error',
        message: 'Không thể xóa điều khoản duy nhất'
      });
      return;
    }
    setDeletingTerms(terms);
    setIsDeleting(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTerms(deletingTerms.id)).unwrap();
      addToast({
        type: 'success',
        message: 'Xóa điều khoản thành công!'
      });
      setIsDeleting(false);
      setDeletingTerms(null);
      dispatch(fetchTermsList({ page: currentPage, limit: 10 }));
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi xóa điều khoản'
      });
    }
  };

  const handleEditClick = (terms) => {
    setEditingTerms(terms);
    setFormData({
      title: terms.title,
      content: terms.content,
      effective_date: format(new Date(terms.effective_date), 'yyyy-MM-dd')
    });
    setFormErrors({});
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
    setEditingTerms(null);
    setFormData({
      title: '',
      content: '',
      effective_date: format(new Date(), 'yyyy-MM-dd')
    });
    setFormErrors({});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(updateTerms({
        id: editingTerms.id,
        data: formData
      })).unwrap();
      
      addToast({
        type: 'success',
        message: 'Cập nhật điều khoản thành công!'
      });
      
      setIsEditing(false);
      setEditingTerms(null);
      setFormData({
        title: '',
        content: '',
        effective_date: format(new Date(), 'yyyy-MM-dd')
      });
      setFormErrors({});
      dispatch(fetchTermsList({ page: currentPage, limit: 10 }));
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi cập nhật điều khoản'
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Tiêu đề là bắt buộc';
    } else if (formData.title.length > 255) {
      errors.title = 'Tiêu đề không được vượt quá 255 ký tự';
    }

    if (!formData.content.trim()) {
      errors.content = 'Nội dung là bắt buộc';
    }

    if (!formData.effective_date) {
      errors.effective_date = 'Ngày hiệu lực là bắt buộc';
    } else {
      const selectedDate = new Date(formData.effective_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (isEditing) {
        const currentEffectiveDate = editingTerms ? new Date(editingTerms.effective_date) : null;
        if (selectedDate < today && (!currentEffectiveDate || selectedDate.getTime() !== currentEffectiveDate.getTime())) {
          errors.effective_date = 'Ngày hiệu lực phải từ ngày hiện tại trở đi';
        }
      } else {
        if (selectedDate < today) {
          errors.effective_date = 'Ngày hiệu lực phải từ ngày hiện tại trở đi';
        }
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(createTerms(formData)).unwrap();
      addToast({
        type: 'success',
        message: 'Thêm điều khoản mới thành công!'
      });
      setIsCreating(false);
      setFormData({
        title: '',
        content: '',
        effective_date: format(new Date(), 'yyyy-MM-dd')
      });
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi thêm điều khoản'
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoadingTerms) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (termsError) {
    return (
      <div className="p-4 text-center text-red-500">
        Có lỗi xảy ra khi tải danh sách điều khoản: {termsError.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Quản lý Điều khoản sử dụng</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
        >
          <Plus size={20} />
          Thêm điều khoản mới
        </button>
      </div>

      <div className="space-y-4">
        {termsList?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Chưa có điều khoản nào. Hãy thêm mới!
          </div>
        ) : (
          <>
            {termsList?.map((terms) => (
              <div 
                key={terms.id} 
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <button
                      onClick={() => setExpandedId(expandedId === terms.id ? null : terms.id)}
                      className="w-full flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium text-left">
                          {terms.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Cập nhật lần cuối: {format(new Date(terms.updated_at), 'dd/MM/yyyy HH:mm', { locale: vi })}
                          {' '}bởi {terms.last_updated_by_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Ngày hiệu lực: {format(new Date(terms.effective_date), 'dd/MM/yyyy', { locale: vi })}
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          expandedId === terms.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedId === terms.id && (
                      <div className="mt-4 space-y-2 text-gray-600">
                        <div className="whitespace-pre-wrap">{terms.content}</div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleViewTerms(terms)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="Xem chi tiết"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditClick(terms)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="Chỉnh sửa"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(terms)}
                      className={`p-2 rounded-full ${
                        canDeleteTerms 
                          ? 'text-red-600 hover:bg-red-50' 
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                      title={canDeleteTerms ? 'Xóa' : 'Không thể xóa điều khoản duy nhất'}
                      disabled={!canDeleteTerms}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {termsPagination.totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-400"
                  >
                    Trước
                  </button>
                  {[...Array(termsPagination.totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === termsPagination.totalPages}
                    className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-400"
                  >
                    Sau
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Hiển thị {termsList?.length} trên tổng số {termsPagination.total} điều khoản
      </div>

      {/* Modal xem chi tiết */}
      {isViewing && selectedTerms && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => {
              setIsViewing(false);
              setSelectedTerms(null);
            }}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">
                  Chi tiết Điều khoản
                </h2>
                <button
                  onClick={() => {
                    setIsViewing(false);
                    setSelectedTerms(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Tiêu đề</h3>
                  <p>{selectedTerms.title}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Nội dung</h3>
                  <div className="whitespace-pre-wrap">{selectedTerms.content}</div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Ngày hiệu lực</h3>
                  <p>{format(new Date(selectedTerms.effective_date), 'dd/MM/yyyy', { locale: vi })}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Thông tin cập nhật</h3>
                  <p>
                    Cập nhật lần cuối: {format(new Date(selectedTerms.updated_at), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    {' '}bởi {selectedTerms.last_updated_by_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Thêm modal tạo mới */}
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
                  Thêm điều khoản mới
                </h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      title: e.target.value
                    }))}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập tiêu đề điều khoản"
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      content: e.target.value
                    }))}
                    rows={10}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.content ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập nội dung điều khoản"
                  />
                  {formErrors.content && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.content}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày hiệu lực <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.effective_date}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      effective_date: e.target.value
                    }))}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.effective_date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.effective_date && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.effective_date}</p>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={isSubmittingTerms}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingTerms}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmittingTerms ? (
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

      {/* Thêm modal xác nhận xóa */}
      {isDeleting && deletingTerms && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => {
              setIsDeleting(false);
              setDeletingTerms(null);
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
                  Bạn có chắc chắn muốn xóa điều khoản "{deletingTerms.title}"? 
                  Hành động này không thể hoàn tác.
                </p>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeleting(false);
                      setDeletingTerms(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={isSubmittingTerms}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isSubmittingTerms}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    {isSubmittingTerms ? (
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

      {/* Thêm modal chỉnh sửa */}
      {isEditing && editingTerms && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={handleCloseEditModal}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">
                  Chỉnh sửa điều khoản
                </h2>
                <button
                  onClick={handleCloseEditModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      title: e.target.value
                    }))}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập tiêu đề điều khoản"
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      content: e.target.value
                    }))}
                    rows={10}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.content ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập nội dung điều khoản"
                  />
                  {formErrors.content && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.content}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày hiệu lực <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.effective_date}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      effective_date: e.target.value
                    }))}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className={`w-full p-2 border rounded-lg ${
                      formErrors.effective_date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.effective_date && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.effective_date}</p>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={isSubmittingTerms}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingTerms}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmittingTerms ? (
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
    </div>
  );
}

export default TermsManagement;
