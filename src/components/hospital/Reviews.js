import { useState, useCallback } from "react";
import { Star, Flag, MoreVertical, X, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { reportReview, deleteReviewPermanently, replyToReview, deleteReviewReply } from "../../services/hospitalService";
import { useToast } from "../../context/ToastContext";

const ReportModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [reason, setReason] = useState("");
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {t("hospitalDetail.reviews.report.title")}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("hospitalDetail.reviews.report.reason")}
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("hospitalDetail.reviews.report.reasonPlaceholder")}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            {t("Cancel")}
          </button>
          <button
            onClick={() => onSubmit(reason)}
            disabled={!reason.trim() || loading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? t("Submitting...") : t("Submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

const Reviews = ({ reviews, stats, onViewAll, onWriteReview, setReviews, hospitalId }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showOptionsFor, setShowOptionsFor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyLoading, setReplyLoading] = useState(false);
  const { addToast } = useToast();

  const MIN_REPLY_LENGTH = 10;
  const MAX_REPLY_LENGTH = 500;

  const handleReportClick = (review) => {
    setSelectedReview(review);
    setShowReportModal(true);
    setShowOptionsFor(null);
  };

  const handleReport = async (reason) => {
    if (!reason.trim()) return;

    try {
      setLoading(true);
      await reportReview(selectedReview.id, reason);
      
      // Update UI to show review has been reported
      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === selectedReview.id
            ? { ...review, is_reported: true }
            : review
        )
      );

      setShowReportModal(false);
      setSelectedReview(null);
      addToast({
        type: "success",
        message: t("hospitalDetail.reviews.report.success")
      });
    } catch (error) {
      console.error("Error reporting review:", error);
      addToast({
        type: "error",
        message: t("hospitalDetail.reviews.report.error")
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (review) => {
    if (!window.confirm(t("hospitalDetail.reviews.deleteConfirm"))) {
      return;
    }

    try {
      setLoading(true);
      await deleteReviewPermanently(review.id);
      
      // Update UI to show review has been deleted
      setReviews(prevReviews =>
        prevReviews.map(r =>
          r.id === review.id
            ? { ...r, is_deleted: !r.is_deleted }
            : r
        )
      );

      addToast({
        type: "success",
        message: t("hospitalDetail.reviews.deleteSuccess")
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting review:", error);
      addToast({
        type: "error",
        message: t("hospitalDetail.reviews.deleteError")
      });
    } finally {
      setLoading(false);
      setShowOptionsFor(null);
    }
  };

  const handleReply = async (reviewId) => {
    const trimmedReply = replyText.trim();
    
    // Validate length
    if (trimmedReply.length < MIN_REPLY_LENGTH) {
      addToast({
        type: "error",
        message: t("Reply must be at least {{min}} characters", { min: MIN_REPLY_LENGTH })
      });
      return;
    }
    
    if (trimmedReply.length > MAX_REPLY_LENGTH) {
      addToast({
        type: "error",
        message: t("Reply cannot exceed {{max}} characters", { max: MAX_REPLY_LENGTH })
      });
      return;
    }

    try {
      setReplyLoading(true);
      const response = await replyToReview(reviewId, trimmedReply);
      
      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === reviewId
            ? {
                ...review,
                reply: trimmedReply,
                replied_at: new Date().toISOString(),
                replied_by_name: user.name,
                replied_by_avatar: user.avatar
              }
            : review
        )
      );

      setReplyText("");
      setReplyingTo(null);
      addToast({
        type: "success",
        message: t("Reply posted successfully")
      });
    } catch (error) {
      console.error("Error posting reply:", error);
      addToast({
        type: "error",
        message: t("Error posting reply")
      });
    } finally {
      setReplyLoading(false);
    }
  };

  const handleDeleteReply = async (reviewId) => {
    if (!window.confirm(t("Are you sure you want to delete this reply?"))) {
      return;
    }

    try {
      setLoading(true);
      await deleteReviewReply(reviewId);
      
      // Update UI to delete reply
      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === reviewId
            ? { 
                ...review, 
                reply: null,
                replied_at: null,
                replied_by_name: null,
                replied_by_avatar: null
              }
            : review
        )
      );

      addToast({
        type: "success",
        message: t("Reply deleted successfully")
      });
    } catch (error) {
      console.error("Error deleting reply:", error);
      addToast({
        type: "error",
        message: t("Error deleting reply")
      });
    } finally {
      setLoading(false);
    }
  };

  const renderRatingStats = () => {
    const ratingLabels = {
      five_star: 5,
      four_star: 4,
      three_star: 3,
      two_star: 2,
      one_star: 1,
    };

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex items-center gap-6">
          {/* Summary of reviews */}
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{stats.average_rating}</div>
            <div className="flex items-center gap-1 text-yellow-400 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(stats.average_rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {stats.total_reviews} {t("hospitalDetail.reviews.totalReviews")}
            </div>
          </div>

          {/* Detail of reviews */}
          <div className="flex-1 space-y-2">
            {Object.entries(stats.rating_counts).reverse().map(([key, count]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-12 text-sm text-gray-600">{ratingLabels[key]}★</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{
                      width: `${(count / stats.total_reviews) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-12 text-sm text-gray-600 text-right">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // update function canManageReply  check permission with console.log to debug
  const canManageReply = useCallback((review) => {
    if (!user) return false;
    
    // Super admin can delete all
    if (user.role === 'ADMIN') return true;
    
    // Hospital admin can delete reply of hospital
    if (user.role === 'HOSPITAL_ADMIN') {
      // Convert to number to compare
      return Number(user.hospital_id) === Number(hospitalId);
    }

    return false;
  }, [user, hospitalId]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-2xl font-bold">
          {t("hospitalDetail.reviews.title")}
        </h2>
        <button
          onClick={onWriteReview}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {t("hospitalDetail.reviews.writeReview")}
        </button>
      </div>

      {/* Hiển thị thống kê đánh giá */}
      {stats && renderRatingStats()}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={review.user_avatar}
                    alt={review.user_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{review.user_name}</h3>
                    {!review.is_reported && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {t("hospitalDetail.reviews.verified")}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <time className="text-sm text-gray-500 mt-1 block">
                    {new Date(review.created_at).toLocaleDateString()}
                  </time>
                </div>
              </div>

              {user && !review.is_deleted && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowOptionsFor(showOptionsFor === review.id ? null : review.id);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>

                  {showOptionsFor === review.id && (
                    <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                      {(user.id === review.user_id || user.role === 'ADMIN') && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteReview(review);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t("Delete")}
                        </button>
                      )}
                      
                      {user.id !== review.user_id && !review.is_reported && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReportClick(review);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                        >
                          <Flag className="w-4 h-4" />
                          {t("Report")}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hiển thị trạng thái đã xóa */}
            {review.is_deleted ? (
              <div className="mt-4 text-gray-500 italic">
                {t("hospitalDetail.reviews.deletedMessage")}
              </div>
            ) : (
              <>
                <p className="mt-4 text-gray-600">{review.comment}</p>

                {/* Hiển thị ảnh đính kèm */}
                {review.photo && (
                  <div className="mt-4">
                    <img
                      src={review.photo.image_url}
                      alt={review.photo.description || "Review image"}
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                    />
                    {review.photo.description && (
                      <p className="mt-2 text-sm text-gray-500">
                        {review.photo.description}
                      </p>
                    )}
                  </div>
                )}

                {/* Reply section for hospital admin - Use canManageReply instead of canReplyToReview */}
                {canManageReply(review) && !review.reply && !review.is_deleted && (
                  <div className="mt-4">
                    {replyingTo === review.id ? (
                      <div className="space-y-2">
                        <div className="relative">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={t("Type your reply... ({{min}}-{{max}} characters)", {
                              min: MIN_REPLY_LENGTH,
                              max: MAX_REPLY_LENGTH
                            })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                            maxLength={MAX_REPLY_LENGTH}
                          />
                          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                            {replyText.length}/{MAX_REPLY_LENGTH}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            {t("Cancel")}
                          </button>
                          <button
                            onClick={() => handleReply(review.id)}
                            disabled={
                              !replyText.trim() || 
                              replyText.trim().length < MIN_REPLY_LENGTH ||
                              replyText.length > MAX_REPLY_LENGTH || 
                              replyLoading
                            }
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                          >
                            {replyLoading ? t("Posting...") : t("Post Reply")}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReplyingTo(review.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {t("Reply to this review")}
                      </button>
                    )}
                  </div>
                )}

                {/* Show reply from hospital with options */}
                {review.reply && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            {review.replied_by_avatar ? (
                              <img
                                src={review.replied_by_avatar}
                                alt={review.replied_by_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-medium text-sm">H</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">
                              {review.replied_by_name || "Hospital Response"}
                            </h4>
                            <time className="text-xs text-gray-500">
                              {new Date(review.replied_at).toLocaleDateString()}
                            </time>
                          </div>
                        </div>

                        {/* Options for reply - only show delete button for correct admin */}
                        {canManageReply(review) && (
                          <button
                            onClick={() => handleDeleteReply(review.id)}
                            className="p-1 hover:bg-gray-200 rounded-full text-gray-500 hover:text-red-500"
                            title={t("Delete reply")}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{review.reply}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add button See More */}
      {reviews.length > 0 && (
        <button
          onClick={onViewAll}
          className="mt-6 w-full py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {t("See More Reviews")}
        </button>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setSelectedReview(null);
        }}
        onSubmit={handleReport}
        loading={loading}
      />
    </div>
  );
};

export default Reviews;
