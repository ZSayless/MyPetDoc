import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Calendar, Mail, Phone } from "lucide-react";

function Profile() {
  const user = {
    name: "John Doe",
    avatar: "J",
    email: "john@example.com",
    phone: "+84 123 456 789",
    location: "Ho Chi Minh City",
    joinDate: "March 2024",
    bio: "Pet lover and advocate for animal welfare. Always looking for the best care for my furry friends.",
    stats: {
      reviews: 24,
      favorites: 12,
      blogs: 8
    }
  };

  const reviews = [
    {
      id: 1,
      hospitalName: "PetCare Hospital",
      rating: 4.5,
      comment: "Great service and friendly staff! The doctors were very professional and caring with my cat.",
      date: "2024-03-15",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7"
    },
    {
      id: 2,
      hospitalName: "VetCare Clinic",
      rating: 5,
      comment: "Excellent facilities and professional doctors. They have the latest equipment and very clean environment.",
      date: "2024-03-10",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#98E9E9] to-[#7CD5D5] h-60"></div>
      
      <div className="container mx-auto px-4 -mt-20">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* User Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center text-white text-4xl border-4 border-white shadow-lg">
              {user.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600 mt-2 max-w-2xl">{user.bio}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
                <div className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  {user.phone}
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  {user.location}
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  Joined {user.joinDate}
                </div>
              </div>
            </div>
            <Link
              to="/setting"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Edit Profile
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 border-t border-b py-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.reviews}</div>
              <div className="text-gray-600">Reviews</div>
            </div>
            <div className="text-center border-l border-r">
              <div className="text-2xl font-bold text-gray-900">{user.stats.favorites}</div>
              <div className="text-gray-600">Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.blogs}</div>
              <div className="text-gray-600">Blogs</div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map(review => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.image}
                      alt={review.hospitalName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{review.hospitalName}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < review.rating ? "currentColor" : "none"}
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{review.rating}</span>
                      </div>
                      <p className="text-gray-600 mt-2 text-sm line-clamp-2">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View All Reviews →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
