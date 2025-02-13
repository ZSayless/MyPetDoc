import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Mail, Trash2, X, Send, AlertTriangle } from "lucide-react";
import {
  deleteMessage,
  markMessageAsRead,
  fetchContactMessages,
  respondToMessage,
  deleteContactMessagePermanently
} from "../../../redux/slices/adminSlice";
import { formatDate } from "../../../utils/formatDate";
import { useToast } from "../../../context/ToastContext";

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'pending':
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Đã hoàn thành';
    case 'processing':
      return 'Đang xử lý';
    case 'cancelled':
      return 'Đã hủy';
    case 'pending':
    default:
      return 'Chờ xử lý';
  }
};

function ContactMessages() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const { contactMessages, loading, pagination } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("completed");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [isDeletingMessage, setIsDeletingMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchContactMessages({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handleView = async (message) => {
    setSelectedMessage(message);
    if (message.status === "pending") {
      dispatch(markMessageAsRead(message.id));
    }
  };

  const handleDelete = (message) => {
    setMessageToDelete(message);
  };

  const handleReply = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleRespond = async (e) => {
    e.preventDefault();
    if (!selectedMessage) return;

    setIsSubmitting(true);
    try {
      await dispatch(respondToMessage({
        messageId: selectedMessage.id,
        data: {
          response,
          status
        }
      })).unwrap();

      setResponse("");
      setStatus("completed");
      addToast({
        type: "success",
        message: "Trả lời tin nhắn thành công!"
      });
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "Có lỗi xảy ra khi trả lời tin nhắn"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePermanently = async () => {
    if (!messageToDelete) return;

    setIsDeletingMessage(true);
    try {
      await dispatch(deleteContactMessagePermanently(messageToDelete.id)).unwrap();
      addToast({
        type: "success",
        message: "Xóa tin nhắn thành công!"
      });
      setMessageToDelete(null);
      if (selectedMessage?.id === messageToDelete.id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "Có lỗi xảy ra khi xóa tin nhắn"
      });
    } finally {
      setIsDeletingMessage(false);
    }
  };

  const filteredMessages = contactMessages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm tin nhắn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-12 gap-6">
            {/* Messages List */}
            <div className="col-span-5 bg-white rounded-lg shadow-sm p-4">
              <div className="divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleView(message)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedMessage?.id === message.id ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{message.name}</h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600 truncate max-w-[70%]">
                        {message.message}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(message.status)}`}>
                        {getStatusText(message.status)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{message.email}</span>
                      {message.phone && (
                        <span className="ml-2">| {message.phone}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Detail */}
            <div className="col-span-7 bg-white rounded-lg shadow-sm p-4">
              {selectedMessage ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">
                        Tin nhắn từ {selectedMessage.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Email: {selectedMessage.email}
                        {selectedMessage.phone && ` | SĐT: ${selectedMessage.phone}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDelete(selectedMessage)}
                        className="text-red-600 hover:text-red-900"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="prose max-w-none">
                    <p>{selectedMessage.message}</p>
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Trả lời tin nhắn</h3>
                    <form onSubmit={handleRespond}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nội dung trả lời
                          </label>
                          <textarea
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            rows={4}
                            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Nhập nội dung trả lời..."
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trạng thái
                          </label>
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="completed">Đã hoàn thành</option>
                            <option value="processing">Đang xử lý</option>
                            <option value="cancelled">Đã hủy</option>
                          </select>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Đang gửi...</span>
                              </>
                            ) : (
                              <>
                                <Send size={16} />
                                <span>Gửi trả lời</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {selectedMessage.response && (
                    <div className="mt-6 border-t pt-6">
                      <h3 className="text-lg font-medium mb-2">Phản hồi trước đó</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="whitespace-pre-line">{selectedMessage.response}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          <span>Trạng thái: {selectedMessage.status}</span>
                          {selectedMessage.responded_at && (
                            <span className="ml-4">
                              Thời gian: {formatDate(selectedMessage.responded_at)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Chọn một tin nhắn để xem
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 0 && (
            <div className="flex items-center justify-between py-3">
              <div className="text-sm text-gray-500">
                Trang {pagination.page} / {pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {messageToDelete && (
            <>
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
                onClick={() => setMessageToDelete(null)}
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
                      Xóa vĩnh viễn tin nhắn
                    </h3>
                    <p className="text-sm text-center text-gray-500">
                      Bạn có chắc chắn muốn xóa vĩnh viễn tin nhắn từ "{messageToDelete.name}"? 
                      Hành động này không thể hoàn tác.
                    </p>
                    <div className="flex justify-center gap-3 mt-6">
                      <button
                        type="button"
                        disabled={isDeletingMessage}
                        onClick={() => setMessageToDelete(null)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        disabled={isDeletingMessage}
                        onClick={handleDeletePermanently}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 min-w-[100px]"
                      >
                        {isDeletingMessage ? (
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
        </>
      )}
    </div>
  );
}

export default ContactMessages;
