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

// Mock data chỉ cho reviews và favorites
const mockReviews = [
  {
    id: 1,
    hospitalName: "PetCare Hospital",
    rating: 4.5,
    comment: "Great service and friendly staff! The doctors were very professional and caring.",
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

const mockFavorites = [
  {
    id: 1,
    name: "PetCare Hospital",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    address: "123 Nguyen Van Linh, District 7, HCMC",
    rating: 4.8,
    reviews: 128,
  },
  {
    id: 2,
    name: "VetCare Clinic",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
    address: "456 Le Van Viet, District 9, HCMC",
    rating: 4.6,
    reviews: 96,
  },
];

// Helper function for avatar
const getAvatarInitial = (user) => {
  if (user.avatar) return user.avatar;
  if (user.role === 'admin') return 'A';
  return user.email[0].toUpperCase();
};

function Profile() {
  const { user } = useAuth(); // Lấy thông tin user từ Auth Context
  const [reviews] = useState(mockReviews);
  const [favorites] = useState(mockFavorites);

  if (!user) {
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
              {getAvatarInitial(user)}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.name || "Admin User"}
              </h1>
              <p className="text-gray-600 mt-1">
                {user.bio || "System Administrator"}
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  {user.email}
                </div>
                {user.phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-2" />
                    {user.phone}
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {user.location || "Ho Chi Minh City"}
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
              {user?.socialLinks &&
                Object.entries(user.socialLinks)
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

          {/* Rest of the component remains the same */}
          {/* ... Reviews and Favorites sections ... */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
