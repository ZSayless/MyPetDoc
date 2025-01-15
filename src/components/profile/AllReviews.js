import React from "react";
import { Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AllReviews() {
  const navigate = useNavigate();
  const reviews = [
    // Thêm nhiều reviews hơn vào đây
    {
      id: 1,
      hospitalName: "PetCare Hospital",
      rating: 4.5,
      comment:
        "Great service and friendly staff! The doctors were very professional and caring with my cat.",
      date: "2024-03-15",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    },
    // ... thêm reviews khác
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Profile
          </button>

          <h1 className="text-2xl font-bold mb-6">All Reviews</h1>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.image}
                    alt={review.hospitalName}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {review.hospitalName}
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
        </div>
      </div>
    </div>
  );
}

export default AllReviews;
