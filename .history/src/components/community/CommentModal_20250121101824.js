import { useState, useEffect } from "react";
import { X, Send, MoreHorizontal, Flag } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { communityService } from "../../services/communityService";

function CommentModal({ isOpen, onClose, post, onCommentAdded }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(null); // ID của comment đang show menu

  // Reset comments khi modal đóng
  useEffect(() => {
    if (!isOpen) {
      setComments([]);
    }
  }, [isOpen]);

  // Load comments khi modal mở và có post được chọn
  useEffect(() => {
    if (isOpen && post) {
      setLoading(true);
      try {
        setComments(post.comments || []);
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [isOpen, post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setLoading(true);
      const newComment = await communityService.addComment(post.id, {
        content: comment.trim(),
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        },
      });
      setComments((prevComments) => [...prevComments, newComment]);
      onCommentAdded && onCommentAdded(post.id, newComment);
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
      alert(t("community.comments.reportSuccess"));

      // Khi có API:
      // await communityService.reportComment(commentId, { reason });

      setShowReportMenu(null);
    } catch (error) {
      console.error("Error reporting comment:", error);
    }
  };

  const isCommentAuthor = (comment) => user?.id === comment.author.id;
  const canDeleteComment = (comment) => isCommentAuthor(comment) || user?.role === "admin";

  const handleDeleteComment = async (commentId) => {
    if (window.confirm(t("community.comments.deleteConfirm"))) {
      try {
        setLoading(true);
        await communityService.deleteComment(post.id, commentId);
        setComments((prevComments) => 
          prevComments.filter((c) => c.id !== commentId)
        );
        // Thông báo cho component cha cập nhật số lượng comments
        onCommentAdded && onCommentAdded(post.id, { 
          deleted: true,
          commentId: commentId 
        });
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert(t("community.comments.deleteFailed"));
      } finally {
        setLoading(false);
      }
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
          <h2 className="text-xl font-semibold">{t("community.comments.title")}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="text-center py-4">{t("community.comments.loading")}</div>
          ) : comments.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              {t("community.comments.noComments")}
            </div>
          ) : (
            comments.map((comment) => (
              comment && comment.author ? (
                <div key={comment.id} className="flex gap-3">
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
                    {user && (canDeleteComment(comment) || user.id !== comment.author.id) && (
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
                            {canDeleteComment(comment) && (
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <X className="w-4 h-4" />
                                <span>{t("community.comments.delete")}</span>
                              </button>
                            )}
                            {user.id !== comment.author.id && (
                              <button
                                onClick={() => handleReport(comment.id)}
                                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Flag className="w-4 h-4" />
                                <span>{t("community.comments.report")}</span>
                              </button>
                            )}
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
                placeholder={t("community.comments.writeComment")}
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
            {t("community.comments.loginRequired")}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentModal;
