import React, { useState, useEffect, useCallback } from "react";
import { X, Send, Reply, Flag, MoreVertical } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { communityService } from "../../services/communityService";

// Tách ReportModal thành component riêng
const ReportModal = React.memo(({ onClose, onReport, loading }) => {
  const [localReportReason, setLocalReportReason] = useState("");
  const { t } = useTranslation();

  const handleSubmit = useCallback(() => {
    onReport(localReportReason);
    setLocalReportReason("");
  }, [localReportReason, onReport]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">
          {t("Report Comment")}
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={localReportReason}
            onChange={(e) => setLocalReportReason(e.target.value)}
            placeholder={t("Enter report reason")}
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
          />
          <button
            onClick={handleSubmit}
            className="p-2 text-[#1A3C8E] hover:bg-gray-100 rounded-full disabled:opacity-50"
            disabled={!localReportReason.trim() || loading}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            {t("Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
});

function CommentModal({ isOpen, onClose, post }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [showOptionsFor, setShowOptionsFor] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  // Fetch comments khi mở modal
  useEffect(() => {
    if (isOpen && post) {
      fetchComments();
    }
  }, [isOpen, post]);

  const fetchComments = async () => {
    try {
      const response = await communityService.getComments(post.id);
      if (response.success) {
        // Không cần chuyển đổi Buffer nữa vì đã được xử lý ở service
        setComments(response.data.comments);
        setPagination(response.data.pagination);
        console.log("Comments loaded:", response.data.comments); // Debug
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setLoading(true);
      const response = await communityService.createComment(
        post.id,
        replyTo ? replyTo.id : null,
        comment.trim()
      );

      if (response.success) {
        // Nếu là reply, thêm vào replies của comment gốc
        if (replyTo) {
          console.log("Replying to comment:", replyTo.id); // Debug
          setComments(prevComments =>
            prevComments.map(c => {
              if (c.id === replyTo.id) {
                return {
                  ...c,
                  replies: [...(c.replies || []), response.data],
                  replies_count: (c.replies_count || 0) + 1
                };
              }
              return c;
            })
          );
        } else {
          setComments(prevComments => [response.data, ...prevComments]);
        }
        
        setComment("");
        setReplyTo(null);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = (comment) => {
    setReplyTo(comment);
    // Focus vào input
    document.getElementById('comment-input').focus();
  };

  const cancelReply = () => {
    setReplyTo(null);
    setComment("");
  };

  // Thêm hàm load more nếu cần
  const loadMoreComments = async () => {
    if (!pagination || pagination.page >= pagination.totalPages) return;
    
    try {
      const nextPage = pagination.page + 1;
      const response = await communityService.getComments(post.id, nextPage);
      
      if (response.success) {
        setComments(prev => [...prev, ...response.data.comments]);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error loading more comments:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm(t("Delete comment"))) {
      return;
    }

    try {
      const response = await communityService.deleteComment(commentId);
      if (response.success) {
        // Cập nhật UI sau khi xóa comment
        setComments(prevComments => 
          prevComments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                is_deleted: true,
                content: "[Comment deleted]"
              };
            }
            // Nếu là reply của comment bị xóa
            if (comment.replies) {
              return {
                ...comment,
                replies: comment.replies.map(reply => 
                  reply.id === commentId ? {
                    ...reply,
                    is_deleted: true,
                    content: "[Reply deleted]"
                  } : reply
                )
              };
            }
            return comment;
          })
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleReportClick = (commentId) => {
    setSelectedCommentId(commentId);
    setShowReportModal(true);
    setShowOptionsFor(null); // Đóng menu options
  };

  const handleReport = useCallback(async (reason) => {
    if (!reason.trim()) {
      alert(t("Enter report reason"));
      return;
    }

    try {
      const response = await communityService.reportComment(selectedCommentId, reason);
      if (response.success) {
        setComments(prevComments =>
          prevComments.map(comment => {
            if (comment.id === selectedCommentId) {
              return { ...comment, is_reported: true };
            }
            if (comment.replies) {
              return {
                ...comment,
                replies: comment.replies.map(reply =>
                  reply.id === selectedCommentId ? 
                    { ...reply, is_reported: true } : 
                    reply
                )
              };
            }
            return comment;
          })
        );

        setShowReportModal(false);
        setSelectedCommentId(null);
        alert(t("Reported successfully"));
      }
    } catch (error) {
      console.error("Error reporting comment:", error);
      alert(t("Report error"));
    }
  }, [selectedCommentId, t]);

  // Comment Options Component
  const CommentOptions = ({ comment, isReply = false }) => {
    const isAuthor = user?.id === comment.user_id;
    const isAdmin = user?.role === "ADMIN";
    const canDelete = isAuthor || isAdmin;

    return (
      <div className="relative">
        <button
          onClick={() => setShowOptionsFor(showOptionsFor === comment.id ? null : comment.id)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </button>

        {showOptionsFor === comment.id && (
          <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
            {!comment.is_reported && !isAuthor && (
              <button
                onClick={() => handleReportClick(comment.id)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <Flag className="w-4 h-4" />
                {t("Report")}
              </button>
            )}
            {canDelete && (
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                {t("Delete")}
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-lg mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">
              {t("Comments")}
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Comments List */}
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {comments && comments.length > 0 ? (
              <>
                {comments.map((comment) => (
                  <div key={comment.id} className="mb-4">
                    {/* Comment chính */}
                    <div className="flex items-start gap-3">
                      <img
                        src={comment.user_avatar || "https://via.placeholder.com/150"}
                        alt={comment.user_name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <p className="font-semibold text-sm">{comment.user_name}</p>
                  
                            {user && <CommentOptions comment={comment} />}
                          </div>
                          <p className="text-gray-700">
                            {comment.is_deleted ? "[Comment deleted]" : comment.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mt-1 ml-2">
                          <span className="text-xs text-gray-500">
                            {new Date(comment.created_at).toLocaleString()}
                          </span>
                          {user && !comment.is_deleted && (
                            <button
                              onClick={() => handleReply(comment)}
                              className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                              <Reply className="w-3 h-3" />
                              Reply ({comment.replies_count})
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-11 mt-2 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-3">
                            <img
                              src={reply.user_avatar || "https://via.placeholder.com/150"}
                              alt={reply.user_name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-2">
                                <div className="flex justify-between items-start">
                                  <p className="font-semibold text-sm">{reply.user_name}</p>
                                  {/* Menu tùy chọn cho replies */}
                                  {user && <CommentOptions comment={reply} isReply={true} />}
                                </div>
                                <p className="text-gray-700 text-sm">
                                  {reply.is_deleted ? "[Reply deleted]" : reply.content}
                                </p>
                              </div>
                              <span className="text-xs text-gray-500 ml-2">
                                {new Date(reply.created_at).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Load More Button */}
                {pagination && pagination.page < pagination.totalPages && (
                  <button
                    onClick={loadMoreComments}
                    className="w-full py-2 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Load more comments
                  </button>
                )}
              </>
            ) : (
              <div className="text-center text-gray-500 py-8">
                {t("Chưa có bình luận nào")}
              </div>
            )}
          </div>

          {/* Comment Input */}
          {user ? (
            <form onSubmit={handleSubmit} className="p-4 border-t">
              {replyTo && (
                <div className="mb-2 flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span className="text-sm">
                    Replying to <span className="font-semibold">{replyTo.user_name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={cancelReply}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  id="comment-input"
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
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

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal 
          onClose={() => {
            setShowReportModal(false);
            setSelectedCommentId(null);
          }}
          onReport={handleReport}
          loading={loading}
        />
      )}
    </>
  );
}

export default CommentModal;
