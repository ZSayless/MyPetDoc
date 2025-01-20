import { useState } from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const Reviews = ({ reviews, onViewAll, onWriteReview }) => {
  const { t } = useTranslation();

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
          <Star size={18} />
          {t("hospitalDetail.reviews.writeReview")}
        </button>
      </div>

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b pb-6 last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {review.user.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium">{review.user.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < review.rating ? "currentColor" : "none"}
                            className="text-yellow-400"
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="text-xs text-green-600">
                          {t("hospitalDetail.reviews.verified")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {review.date}
                </span>
              </div>
              <p className="mt-3 text-gray-600">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {t("hospitalDetail.reviews.noReviews")}
          </p>
        )}
      </div>

      {reviews.length > 3 && (
        <button
          onClick={onViewAll}
          className="w-full mt-6 py-2 text-blue-600 hover:text-blue-700"
        >
          {t("hospitalDetail.reviews.viewAll")}
        </button>
      )}
    </div>
  );
};

export default Reviews;
