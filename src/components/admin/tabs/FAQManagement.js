import { useState } from "react";
import { Plus, Edit, Trash2, ChevronDown } from "lucide-react";
import { useToast } from "../../../context/ToastContext";

function FAQManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "Làm thế nào để tìm bệnh viện gần nhất?",
      answer:
        "Bạn có thể sử dụng tính năng 'Tìm Bệnh Viện' và cho phép truy cập vị trí của bạn để tìm các bệnh viện gần nhất.",
    },
  ]);

  const handleAddFaq = () => {
    setEditingFaq(null);
    setIsEditing(true);
  };

  const handleEditFaq = (faq) => {
    setEditingFaq(faq);
    setIsEditing(true);
  };

  const handleDeleteFaq = async (faqId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa FAQ này?")) {
      try {
        setLoading(true);
        // API call sẽ được thêm vào đây
        setFaqs(faqs.filter((faq) => faq.id !== faqId));
        addToast({
          type: "success",
          message: "Xóa FAQ thành công!",
        });
      } catch (error) {
        addToast({
          type: "error",
          message: "Có lỗi xảy ra khi xóa FAQ!",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveFaq = async (formData) => {
    try {
      setLoading(true);
      // API call sẽ được thêm vào đây
      if (editingFaq) {
        setFaqs(
          faqs.map((faq) =>
            faq.id === editingFaq.id ? { ...faq, ...formData } : faq
          )
        );
        addToast({
          type: "success",
          message: "Cập nhật FAQ thành công!",
        });
      } else {
        const newFaq = {
          id: Date.now(),
          ...formData,
        };
        setFaqs([...faqs, newFaq]);
        addToast({
          type: "success",
          message: "Thêm FAQ thành công!",
        });
      }
      setIsEditing(false);
      setEditingFaq(null);
    } catch (error) {
      addToast({
        type: "error",
        message: "Có lỗi xảy ra khi lưu FAQ!",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">FAQ Management</h2>
        <button
          onClick={handleAddFaq}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] disabled:opacity-50"
        >
          <Plus size={20} />
          Add FAQ
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {faqs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Chưa có FAQ nào. Hãy thêm FAQ mới!
          </div>
        ) : (
          faqs.map((faq) => (
            <div key={faq.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === faq.id ? null : faq.id)
                    }
                    className="w-full flex justify-between items-center"
                  >
                    <h3 className="font-medium text-left">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedId === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedId === faq.id && (
                    <p className="text-gray-600 mt-2">{faq.answer}</p>
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
                    onClick={() => handleDeleteFaq(faq.id)}
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

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingFaq ? "Edit FAQ" : "Add New FAQ"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  question: e.target.question.value,
                  answer: e.target.answer.value,
                };
                handleSaveFaq(formData);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Question
                  </label>
                  <input
                    name="question"
                    type="text"
                    defaultValue={editingFaq?.question || ""}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Answer
                  </label>
                  <textarea
                    name="answer"
                    defaultValue={editingFaq?.answer || ""}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={4}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FAQManagement;
