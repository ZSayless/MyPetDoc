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
        message: 'Cannot delete the only terms'
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
        message: 'Delete terms successfully!'
      });
      setIsDeleting(false);
      setDeletingTerms(null);
      dispatch(fetchTermsList({ page: currentPage, limit: 10 }));
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'An error occurred while deleting the terms'
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
        message: 'Update terms successfully!'
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
        message: error.message || 'An error occurred while updating the terms'
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length > 255) {
      errors.title = 'Title cannot exceed 255 characters';
    }

    if (!formData.content.trim()) {
      errors.content = 'Content is required';
    }

    if (!formData.effective_date) {
      errors.effective_date = 'Effective date is required';
    } else {
      const selectedDate = new Date(formData.effective_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (isEditing) {
        const currentEffectiveDate = editingTerms ? new Date(editingTerms.effective_date) : null;
        if (selectedDate < today && (!currentEffectiveDate || selectedDate.getTime() !== currentEffectiveDate.getTime())) {
          errors.effective_date = 'Effective date must be from today onwards';
        }
      } else {
        if (selectedDate < today) {
          errors.effective_date = 'Effective date must be from today onwards';
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
        message: 'Add new terms successfully!'
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
        message: error.message || 'An error occurred while adding the terms'
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
        An error occurred while loading the terms list: {termsError.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Terms Management</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
        >
          <Plus size={20} />
          Add new terms
        </button>
      </div>

      <div className="space-y-4">
        {termsList?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No terms found. Please add new terms!
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
                          Last updated: {format(new Date(terms.updated_at), 'dd/MM/yyyy HH:mm', { locale: vi })}
                          {' '}by {terms.last_updated_by_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Effective date: {format(new Date(terms.effective_date), 'dd/MM/yyyy', { locale: vi })}
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
                      title="View details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditClick(terms)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="Edit"
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
                      title={canDeleteTerms ? 'Delete' : 'Cannot delete the only terms'}
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
                    Previous
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
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Displaying {termsList?.length} out of {termsPagination.total} terms
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
                  Terms details
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
                  <h3 className="font-medium mb-2">Title</h3>
                  <p>{selectedTerms.title}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Content</h3>
                  <div className="whitespace-pre-wrap">{selectedTerms.content}</div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Effective date</h3>
                  <p>{format(new Date(selectedTerms.effective_date), 'dd/MM/yyyy', { locale: vi })}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Update information</h3>
                  <p>
                    Last updated: {format(new Date(selectedTerms.updated_at), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    {' '}by {selectedTerms.last_updated_by_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add new modal */}
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
                  Add new terms
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
                    Title <span className="text-red-500">*</span>
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
                    placeholder="Enter the title of the terms"
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
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
                    placeholder="Enter the content of the terms"
                  />
                  {formErrors.content && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.content}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Effective date <span className="text-red-500">*</span>
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
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingTerms}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmittingTerms ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Delete confirmation modal */}
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
                  Confirm delete
                </h3>
                <p className="text-center text-gray-500">
                  Are you sure you want to delete the terms "{deletingTerms.title}"? 
                  This action cannot be undone.
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
                    Cancel
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
                        <span>Deleting...</span>
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit modal */}
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
                  Edit terms
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
                    Title <span className="text-red-500">*</span>
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
                    placeholder="Enter the title of the terms"
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
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
                    placeholder="Enter the content of the terms"
                  />
                  {formErrors.content && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.content}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Effective date <span className="text-red-500">*</span>
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
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingTerms}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmittingTerms ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      'Save'
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
