import { useState, useEffect } from "react";
import { X, Send, MoreHorizontal, Flag } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function CommentModal({ isOpen, onClose, post }) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(null); // ID của comment đang show menu

  // Load comments khi modal mở và có post được chọn
  useEffect(() => {
    if (isOpen && post) {
      loadComments();
    }
  }, [isOpen, post]);

  // Hàm load comments
  const loadComments = async () => {
    try {
      setLoading(true);
      // Tạm thời dùng dữ liệu mẫu
      const sampleComments = [
        {
          id: 1,
          content: "Such a cute pet!",
          author: {
            id: 2,
            name: "Jane Smith",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
          },
          createdAt: "2 hours ago",
        },
        {
          id: 2,
          content: "Love this! 😍",
          author: {
            id: 3,
            name: "Mike Johnson",
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
          },
          createdAt: "1 hour ago",
        },
      ];

      setComments(sampleComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setLoading(true);
      // Tạm thời thêm comment vào state trực tiếp
      const newComment = {
        id: Date.now(),
        content: comment,
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar || "https://via.placeholder.com/150",
        },
        createdAt: "Just now",
      };

      setComments([newComment, ...comments]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async (commentId, reason = "inappropriate") => {
    try {
      // Tạm thời chỉ log ra console
      console.log("Reporting comment:", commentId, reason);
      alert("Comment has been reported!");

      // Khi có API:
      // await communityService.reportComment(commentId, { reason });

      setShowReportMenu(null);
    } catch (error) {
      console.error("Error reporting comment:", error);
    }
  };

  if (!post) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl w-full max-w-xl mx-4 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="text-center py-4">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No comments yet
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="bg-gray-100 rounded-2xl p-3">
                      <h4 className="font-semibold text-sm">
                        {comment.author.name}
                      </h4>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                    {user && user.id !== comment.author.id && (
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowReportMenu(
                              showReportMenu === comment.id ? null : comment.id
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-500" />
                        </button>

                        {showReportMenu === comment.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                            <button
                              onClick={() => handleReport(comment.id)}
                              className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2"
                            >
                              <Flag className="w-4 h-4" />
                              <span>Report Comment</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {comment.createdAt}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {user ? (
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
                disabled={loading}
              />
              <button
                type="submit"
                className="p-2 text-[#1A3C8E] hover:bg-gray-100 rounded-full disabled:opacity-50"
                disabled={loading || !comment.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 border-t text-center text-gray-600">
            Please login to comment
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentModal;
