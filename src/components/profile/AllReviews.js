import React, { useEffect, useState } from "react";
import { Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAllReviewsByAuth } from "../../services/reviewService";

function AllReviews() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [reviewError, setReviewError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({})

  const fetchAllReviews = async (page) => {
    try {
      const data = await getAllReviewsByAuth(page);
      const reviewsRes = Array.isArray(data.data.reviews) ? data.data.reviews : []
      setPagination(data.data.pagination)

      setReviews(reviewsRes);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setReviewError(true);
    }
  };

  const handleChangePage = (isIncrease = false) => {

    fetchAllReviews(isIncrease ? pagination.page + 1 : pagination.page - 1)
  }

  useEffect(() => {
    fetchAllReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            {t("profile.backToProfile")}
          </button>

          <h1 className="text-2xl font-bold mb-6">
            {t("profile.allReviews.title")}
          </h1>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start gap-4">
                  {
                    review.photo &&

                    <img
                      src={review.photo.image_url}
                      alt={review.photo.description}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  }
                  <div>
                    <h3 className="font-semibold text-lg">
                      {review.hospital_name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">
                        {review.rating}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={pagination.page === 1}
              onClick={() => handleChangePage()}
            >
              Trước
            </button>
            <button
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => handleChangePage(true)}
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllReviews;
