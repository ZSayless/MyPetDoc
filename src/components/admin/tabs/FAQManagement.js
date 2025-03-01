import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  X,
  AlertTriangle,
  Search,
} from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../../../redux/slices/adminSlice";

function FAQManagement() {
  const dispatch = useDispatch();
  const { faqs, isLoadingFaqs, faqsError, isSubmittingFaq, isDeletingFaq } =
    useSelector((state) => state.admin);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const { addToast } = useToast();
  const [errors, setErrors] = useState({});
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  // Add filter function for FAQs
  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return faqs;

    const searchTermLower = searchTerm.toLowerCase().trim();
    return faqs.filter(
      (faq) =>
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
      newErrors.question = "Please enter a question";
    } else if (formData.question.length < 10) {
      newErrors.question = "Question must be at least 10 characters";
    } else if (formData.question.length > 200) {
      newErrors.question = "Question cannot exceed 200 characters";
    }

    if (!formData.answer.trim()) {
      newErrors.answer = "Please enter an answer";
    } else if (formData.answer.length < 10) {
      newErrors.answer = "Answer must be at least 10 characters";
    } else if (formData.answer.length > 1000) {
      newErrors.answer = "Answer cannot exceed 1000 characters";
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
        type: "success",
        message: "Create FAQ successfully!",
      });

      // Reset form
      setFormData({ question: "", answer: "" });
      setIsEditing(false);
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "An error occurred while creating FAQ",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
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
      answer: faq.answer,
    });
    setIsEditing(true);
  };

  const handleDeleteFaq = async (faqId) => {
    try {
      await dispatch(deleteFaq(faqId)).unwrap();
      addToast({
        type: "success",
        message: "Delete FAQ successfully!",
      });
      setFaqToDelete(null);
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "An error occurred while deleting FAQ!",
      });
    }
  };

  const handleUpdateFaq = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if there is any change
    if (
      formData.question === editingFaq.question &&
      formData.answer === editingFaq.answer
    ) {
      addToast({
        type: "info",
        message: "No changes to update",
      });
      return;
    }

    try {
      await dispatch(
        updateFaq({
          id: editingFaq.id,
          data: formData,
        })
      ).unwrap();

      addToast({
        type: "success",
        message: "Update FAQ successfully!",
      });

      // Reset form
      setFormData({ question: "", answer: "" });
      setIsEditing(false);
      setEditingFaq(null);
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "An error occurred while updating FAQ",
      });
    }
  };

  // Update form submit handler to handle both create and update
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
        An error occurred while loading the FAQ list: {faqsError.message}
      </div>
    );
  }

  return (
    <div className="p-6 mt-12 md:mt-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Search bar */}
        <div className="relative flex-1 max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQ..."
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

        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] w-full sm:w-auto"
        >
          <Plus size={20} />
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {isLoadingFaqs ? (
          <div className="p-6 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm
              ? "No FAQ found matching the search term."
              : "No FAQ found. Add a new FAQ!"}
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === faq.id ? null : faq.id)
                    }
                    className="w-full flex justify-between items-center"
                  >
                    {/* Highlight search term in question */}
                    <h3 className="font-medium text-left">
                      {searchTerm
                        ? highlightText(faq.question, searchTerm)
                        : faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedId === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedId === faq.id && (
                    <p className="text-gray-600 mt-2">
                      {/* Highlight search term in answer */}
                      {searchTerm
                        ? highlightText(faq.answer, searchTerm)
                        : faq.answer}
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
                  {editingFaq ? "Edit FAQ" : "Add new FAQ"}
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
                      Question <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="question"
                      value={formData.question}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.question
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-blue-200"
                      }`}
                      placeholder="Enter question..."
                    />
                    {errors.question && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.question}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Answer <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="answer"
                      value={formData.answer}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.answer
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-blue-200"
                      }`}
                      placeholder="Enter answer..."
                    />
                    {errors.answer && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.answer}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingFaq(null);
                      setFormData({ question: "", answer: "" });
                      setErrors({});
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={isSubmittingFaq}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingFaq}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmittingFaq ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      "Save"
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
                  Delete FAQ
                </h3>
                <p className="text-sm text-center text-gray-500">
                  Are you sure you want to delete this FAQ? This action cannot
                  be undone.
                </p>
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    type="button"
                    disabled={isDeletingFaq}
                    onClick={() => setFaqToDelete(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Cancel
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
                        <span>Deleting...</span>
                      </>
                    ) : (
                      "Delete"
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

// Function to highlight search term
function highlightText(text, searchTerm) {
  if (!searchTerm) return text;

  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
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
