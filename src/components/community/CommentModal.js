import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

function CommentModal({ isOpen, onClose, post, onCommentAdded }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);

  // Cập nhật comments khi post thay đổi
  useEffect(() => {
    if (post?.comments) {
      setCurrentComments(post.comments);
    }
  }, [post]);

  // Reset comment khi modal đóng
  useEffect(() => {
    if (!isOpen) {
      setComment("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setLoading(true);
      const newComment = {
        id: Date.now(),
        content: comment.trim(),
        author: {
          id: user?.id,
          name: user?.name,
          avatar: user?.avatar || "https://via.placeholder.com/150",
        },
        createdAt: t("community.post.justNow"),
      };

      // Cập nhật UI ngay lập tức
      setCurrentComments((prev) => [...prev, newComment]);

      // Gọi callback để cập nhật parent component
      onCommentAdded(post.id, newComment);

      // Reset form
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert(t("community.errors.commentFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {t("community.comments.title")}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comments List */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {currentComments.length > 0 ? (
            currentComments.map((comment) => (
              <div key={comment.id} className="mb-4">
                <div className="flex items-start gap-3">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="font-semibold text-sm">
                        {comment.author.name}
                      </p>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      {comment.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              {t("community.comments.noComments")}
            </div>
          )}
        </div>

        {/* Comment Input */}
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
