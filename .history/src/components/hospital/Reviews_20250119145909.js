import { useState } from "react";
import { Star } from "lucide-react";

const Reviews = ({ reviews, onViewAll, onWriteReview, t }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-2xl font-bold">
          {t("hospitalDetail.customerReviews")}
        </h2>
        <button
          onClick={onWriteReview}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {t("hospitalDetail.writeReview")}
        </button>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  {review.user.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{review.user.name}</h3>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {t("hospitalDetail.verified")}
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
                </div>
              </div>
              <time className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </time>
            </div>
            <p className="mt-4 text-gray-600">{review.content}</p>
            {/* Hiển thị ảnh trong review nếu có */}
            {review.images && review.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {review.images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button
          onClick={onViewAll}
          className="mt-6 w-full py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {t("hospitalDetail.viewAllReviews")}
        </button>
      )}
    </div>
  );
};

export default Reviews;
