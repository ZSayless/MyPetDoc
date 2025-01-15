import { useState } from "react";
import { Star } from "lucide-react";

function Reviews({ reviews, onViewAll, onWriteReview }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <button 
          onClick={onWriteReview}
          className="px-6 py-2.5 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] transition-colors text-sm font-medium"
        >
          Write a Review
        </button>
      </div>

      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-8">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                {review.user.avatar}
              </div>

              <div className="flex-1">
                {/* User Info */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900">{review.user.name}</h3>
                  <span className="text-sm text-gray-500">
                    Verified Customer
                  </span>
                </div>

                {/* Rating */}
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Content */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {review.content}
                </p>

                {/* Date */}
                <p className="text-gray-400 text-sm mt-2">
                  Posted on {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onViewAll}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          View All Reviews →
        </button>
      </div>
    </div>
  );
}

export default Reviews; 