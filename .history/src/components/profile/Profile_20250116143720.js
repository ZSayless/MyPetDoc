import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Star,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

// Mock data cho reviews và favorites
const mockReviews = [
  {
    id: 1,
    hospitalName: "PetCare Hospital",
    rating: 5,
    comment: "Excellent service and caring staff!",
    date: "2024-03-01",
  },
  {
    id: 2,
    hospitalName: "VetClinic Plus",
    rating: 4,
    comment: "Good experience overall, would recommend.",
    date: "2024-02-15",
  },
];

const mockFavorites = [
  {
    id: 1,
    name: "PetCare Hospital",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    location: "123 Pet Street, District 1",
    rating: 4.8,
    reviewCount: 245,
  },
  {
    id: 2,
    name: "VetClinic Plus",
    image: "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f",
    location: "456 Animal Road, District 2",
    rating: 4.6,
    reviewCount: 189,
  },
];

// Thêm hàm helper
const getAvatarInitial = (user) => {
  if (user.avatar) return user.avatar;
  if (user.role === 'admin') return 'A';
  return user.email[0].toUpperCase();
};

function Profile() {
  const { currentUser } = useAuth();
  const [reviews] = useState(mockReviews);
  const [favorites] = useState(mockFavorites);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login to view your profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header with Banner */}
      <div className="bg-gradient-to-r from-[#98E9E9] to-[#7CD5D5] h-60"></div>

      <div className="container mx-auto px-4 -mt-20">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* User Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center text-white text-4xl border-4 border-white shadow-lg">
              {getAvatarInitial(currentUser)}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {currentUser.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {currentUser.bio || "No bio added yet"}
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  {currentUser.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  {currentUser.phone || "+84 123 456 789"}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {currentUser.location || "Ho Chi Minh City"}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  Joined March 2024
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 flex gap-6">
                <Link to="/profile/reviews" className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {reviews.length}
                  </div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </Link>
                <Link to="/profile/favorites" className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {favorites.length}
                  </div>
                  <div className="text-sm text-gray-600">Favorites</div>
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-6">
            <div className="flex gap-4">
              {currentUser?.socialLinks &&
                Object.entries(currentUser.socialLinks)
                  .filter(([_, link]) => link && link.trim() !== "")
                  .map(([platform, link]) => {
                    const Icon = socialIcons[platform];
                    return (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Reviews</h2>
              <Link
                to="/profile/reviews"
                className="text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {reviews.slice(0, 2).map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{review.hospitalName}</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-current text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Hospitals */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Favorite Hospitals</h2>
              <Link
                to="/profile/favorites"
                className="text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.slice(0, 2).map((hospital) => (
                <div
                  key={hospital.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <LazyLoadImage
                    src={hospital.image}
                    alt={hospital.name}
                    effect="blur"
                    className="w-full h-48 object-cover"
                    placeholderSrc="/placeholder-hospital.jpg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{hospital.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {hospital.location}
                    </p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">
                        {hospital.rating}
                      </span>
                      <span className="mx-1 text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {hospital.reviewCount} reviews
                      </span>
                    </div>
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
