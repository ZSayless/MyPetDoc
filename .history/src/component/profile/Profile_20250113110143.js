import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function Profile() {
  // Mock data - sẽ được thay thế bằng dữ liệu thực từ API
  const user = {
    name: "John Doe",
    avatar: "J",
    joinDate: "March 2024",
  };

  const reviews = [
    {
      id: 1,
      hospitalName: "PetCare Hospital",
      rating: 4.5,
      comment: "Great service and friendly staff!",
      date: "2024-03-15",
    },
    {
      id: 2,
      hospitalName: "VetCare Clinic",
      rating: 5,
      comment: "Excellent facilities and professional doctors.",
      date: "2024-03-10",
    },
  ];

  const favoriteHospitals = [
    {
      id: 1,
      name: "PetCare Hospital",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      address: "123 Nguyen Van Linh, District 7, HCMC",
    },
    {
      id: 2,
      name: "VetCare Clinic",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      address: "456 Le Van Viet, District 9, HCMC",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl">
              {user.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user.name}!
              </h1>
              <p className="text-gray-600">Member since {user.joinDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Reviews Section */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">My Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-0">
                  <h3 className="font-medium">{review.hospitalName}</h3>
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
                    <span className="ml-2 text-sm text-gray-600">
                      {review.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Hospitals Section */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Favorite Hospitals</h2>
            <div className="space-y-4">
              {favoriteHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="flex space-x-4 border-b pb-4 last:border-0"
                >
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{hospital.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {hospital.address}
                    </p>
                    <Link
                      to={`/hospital/${hospital.id}`}
                      className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
