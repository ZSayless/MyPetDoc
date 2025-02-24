import { useState, useEffect } from "react";
import { X, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getHospitalReviews } from "../../services/hospitalService";

const ReviewListModal = ({ isOpen, onClose, hospitalId }) => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchReviews = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getHospitalReviews(hospitalId, page);
      setReviews(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && hospitalId) {
      fetchReviews();
    }
  }, [isOpen, hospitalId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white w-full max-w-4xl mx-4 my-8 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{t("All Reviews")}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Reviews List */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.user_avatar}
                      alt={review.user_name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{review.user_name}</h3>
                        {!review.is_reported && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            {t("Verified")}
                          </span>
                        )}
                      </div>

                      {/* Rating Stars */}
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

                      {/* Review Content */}
                      <p className="mt-3 text-gray-600">{review.comment}</p>

                      {/* Review Image */}
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

                      {/* Hospital Reply */}
                      {review.reply && (
                        <div className="mt-4 pl-4 border-l-2 border-gray-200">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <img
                                src={review.replied_by_avatar}
                                alt={review.replied_by_name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <h4 className="font-medium text-sm">
                                  {review.replied_by_name}
                                </h4>
                                <time className="text-xs text-gray-500">
                                  {new Date(
                                    review.replied_at
                                  ).toLocaleDateString()}
                                </time>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {review.reply}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 p-4 border-t">
            <button
              onClick={() => fetchReviews(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>

            {[...Array(pagination.totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => fetchReviews(i + 1)}
                className={`w-8 h-8 rounded-lg ${
                  pagination.page === i + 1
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => fetchReviews(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewListModal;
