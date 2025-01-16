import React, { useState, useEffect } from "react";
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

function Profile() {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/users/${currentUser.id}/reviews`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/users/${currentUser.id}/favorites`);
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    if (currentUser) {
      fetchReviews();
      fetchFavorites();
    }
  }, [currentUser]);

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
              {currentUser.avatar || currentUser.name[0]}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {currentUser.name}
              </h1>
              <p className="text-gray-600 mt-1">{currentUser.bio}</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  {currentUser.email}
                </div>
                {currentUser.phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-2" />
                    {currentUser.phone}
                  </div>
                )}
                {currentUser.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    {currentUser.location}
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  Joined {currentUser.joinDate}
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

          {/* Reviews Section */}
          {/* ... Rest of the component ... */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
