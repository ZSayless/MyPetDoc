import { useState, useEffect, useMemo } from "react";
import { Plus, Edit, Trash2, ChevronDown, X, AlertTriangle, Search } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaqs, createFaq, updateFaq, deleteFaq } from "../../../redux/slices/adminSlice";

function FAQManagement() {
  const dispatch = useDispatch();
  const { faqs, isLoadingFaqs, faqsError, isSubmittingFaq, isDeletingFaq } = useSelector((state) => state.admin);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const { addToast } = useToast();
  const [errors, setErrors] = useState({});
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });

  // Thêm hàm lọc FAQ
  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return faqs;

    const searchTermLower = searchTerm.toLowerCase().trim();
    return faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchTermLower) ||
        faq.answer.toLowerCase().includes(searchTermLower)
    );
  }, [faqs, searchTerm]);

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.question.trim()) {
      newErrors.question = 'Vui lòng nhập câu hỏi';
    } else if (formData.question.length < 10) {
      newErrors.question = 'Câu hỏi phải có ít nhất 10 ký tự';
    } else if (formData.question.length > 200) {
      newErrors.question = 'Câu hỏi không được vượt quá 200 ký tự';
    }

    if (!formData.answer.trim()) {
      newErrors.answer = 'Vui lòng nhập câu trả lời';
    } else if (formData.answer.length < 10) {
      newErrors.answer = 'Câu trả lời phải có ít nhất 10 ký tự';
    } else if (formData.answer.length > 1000) {
      newErrors.answer = 'Câu trả lời không được vượt quá 1000 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateFaq = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(createFaq(formData)).unwrap();
      
      addToast({
        type: 'success',
        message: 'Tạo FAQ thành công!'
      });

      // Reset form
      setFormData({ question: '', answer: '' });
      setIsEditing(false);
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi tạo FAQ'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddFaq = () => {
    setEditingFaq(null);
    setIsEditing(true);
  };

  const handleEditFaq = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer
    });
    setIsEditing(true);
  };

  const handleDeleteFaq = async (faqId) => {
    try {
      await dispatch(deleteFaq(faqId)).unwrap();
      addToast({
        type: "success",
        message: "Xóa FAQ thành công!",
      });
      setFaqToDelete(null);
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "Có lỗi xảy ra khi xóa FAQ!",
      });
    }
  };

  const handleUpdateFaq = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Kiểm tra xem có thay đổi gì không
    if (
      formData.question === editingFaq.question && 
      formData.answer === editingFaq.answer
    ) {
      addToast({
        type: 'info',
        message: 'Không có thông tin thay đổi để cập nhật'
      });
      return;
    }

    try {
      await dispatch(updateFaq({
        id: editingFaq.id,
        data: formData
      })).unwrap();
      
      addToast({
        type: 'success',
        message: 'Cập nhật FAQ thành công!'
      });

      // Reset form
      setFormData({ question: '', answer: '' });
      setIsEditing(false);
      setEditingFaq(null);
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi cập nhật FAQ'
      });
    }
  };

  // Cập nhật form submit handler để xử lý cả create và update
  const handleSubmit = (e) => {
    if (editingFaq) {
      handleUpdateFaq(e);
    } else {
      handleCreateFaq(e);
    }
  };

  if (isLoadingFaqs) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (faqsError) {
    return (
      <div className="p-6 text-center text-red-600">
        Có lỗi xảy ra khi tải danh sách FAQ: {faqsError.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Quản lý FAQ</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
        >
          <Plus size={20} />
          Thêm FAQ
        </button>
      </div>

      {/* Thêm thanh tìm kiếm */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm FAQ..."
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {isLoadingFaqs ? (
          <div className="p-6 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm 
              ? "Không tìm thấy FAQ nào phù hợp với từ khóa tìm kiếm."
              : "Chưa có FAQ nào. Hãy thêm FAQ mới!"}
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full flex justify-between items-center"
                  >
                    {/* Highlight từ khóa tìm kiếm trong câu hỏi */}
                    <h3 className="font-medium text-left">
                      {searchTerm ? (
                        highlightText(faq.question, searchTerm)
                      ) : (
                        faq.question
                      )}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedId === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedId === faq.id && (
                    <p className="text-gray-600 mt-2">
                      {/* Highlight từ khóa tìm kiếm trong câu trả lời */}
                      {searchTerm ? (
                        highlightText(faq.answer, searchTerm)
                      ) : (
                        faq.answer
                      )}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEditFaq(faq)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => setFaqToDelete(faq)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {isEditing && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setIsEditing(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">
                  {editingFaq ? 'Chỉnh sửa FAQ' : 'Thêm FAQ mới'}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Câu hỏi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="question"
                      value={formData.question}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.question 
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-blue-200'
                      }`}
                      placeholder="Nhập câu hỏi..."
                    />
                    {errors.question && (
                      <p className="mt-1 text-sm text-red-500">{errors.question}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Câu trả lời <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="answer"
                      value={formData.answer}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.answer 
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-blue-200'
                      }`}
                      placeholder="Nhập câu trả lời..."
                    />
                    {errors.answer && (
                      <p className="mt-1 text-sm text-red-500">{errors.answer}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingFaq(null);
                      setFormData({ question: '', answer: '' });
                      setErrors({});
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={isSubmittingFaq}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingFaq}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmittingFaq ? (
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

      {/* Delete Confirmation Modal */}
      {faqToDelete && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setFaqToDelete(null)}
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
                  Xóa FAQ
                </h3>
                <p className="text-sm text-center text-gray-500">
                  Bạn có chắc chắn muốn xóa FAQ này? 
                  Hành động này không thể hoàn tác.
                </p>
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    type="button"
                    disabled={isDeletingFaq}
                    onClick={() => setFaqToDelete(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    disabled={isDeletingFaq}
                    onClick={() => handleDeleteFaq(faqToDelete.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isDeletingFaq ? (
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

// Hàm highlight text tìm kiếm
function highlightText(text, searchTerm) {
  if (!searchTerm) return text;

  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  return (
    <span>
      {parts.map((part, index) => 
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} className="bg-yellow-200">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default FAQManagement;
