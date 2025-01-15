import { useState } from "react";
import { Star } from "lucide-react";
import { format } from "date-fns";

function Reviews({ reviews, onViewAll }) {
  return (
    <div className="space-y-6">
      {/* Reviews List */}
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {review.user.avatar}
            </div>

            {/* Review Content */}
            <div className="flex-1">
              {/* Review Header */}
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium">{review.user.name}</h3>
                {review.verified && (
                  <span className="text-sm text-gray-500">
                    Verified Customer
                  </span>
                )}
              </div>

              {/* Rating Stars */}
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 mb-2">{review.content}</p>

              {/* Review Date */}
              <div className="text-sm text-gray-500">
                Posted on {format(new Date(review.createdAt), "M/d/yyyy")}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* View All Button */}
      <div className="text-center">
        <button
          onClick={onViewAll}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Reviews
        </button>
      </div>
    </div>
  );
}

export default Reviews; 