import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

function Profile() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { profileData } = useProfile();
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleRemoveFavorite = (hospitalId) => {
    const newFavorites = favorites.filter(h => h.id !== hospitalId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const SocialMediaLinks = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Social Media</h2>
      <div className="space-y-4">
        {profileData.social.linkedin && (
          <a
            href={profileData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-blue-600"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
        )}

        {profileData.social.facebook && (
          <a
            href={profileData.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-blue-600"
          >
            <Facebook size={20} />
            <span>Facebook</span>
          </a>
        )}
      </div>
    </div>
  );

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
              {profileData.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="text-gray-600 mt-2 max-w-2xl">{profileData.bio}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
                <div className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  {profileData.email}
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  {profileData.phone}
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  {profileData.location}
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  {t("profile.joined")} {profileData.joinDate}
                </div>
              </div>
            </div>
            <Link
              to="/setting"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t("profile.editProfile")}
            </Link>
            {profileData.role === "veterinarian" && (
              <Link
                to="/add-hospital"
                className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] transition-colors"
              >
                {t("profile.registerHospital")}
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 border-t border-b py-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {profileData.stats.reviews}
              </div>
              <div className="text-gray-600">{t("profile.reviews")}</div>
            </div>
            <div className="text-center border-l border-r">
              <div className="text-2xl font-bold text-gray-900">
                {profileData.stats.favorites}
              </div>
              <div className="text-gray-600">{t("profile.favorites")}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {profileData.stats.blogs}
              </div>
              <div className="text-gray-600">{t("profile.blogs")}</div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Left Column */}
            <div>
              {/* Social Media Links */}
              <SocialMediaLinks />

              {/* Recent Reviews */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {t("profile.recentReviews")}
                </h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-4 last:border-0"
                    >
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
                      <p className="text-sm text-gray-600 mt-2">
                        {review.comment}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {review.date}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/profile/reviews"
                  className="text-blue-600 hover:text-blue-800 text-sm mt-4 block"
                >
                  {t("profile.viewAllReviews")}
                </Link>
              </div>
            </div>

            {/* Right Column - Favorite Hospitals */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">
                {t("profile.favoriteHospitals")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((hospital) => (
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
                      <h3 className="font-medium">{hospital.name}</h3>
                      <div className="flex items-center mt-1">
                        <Star className="text-yellow-400" size={16} />
                        <span className="ml-1 text-sm">{hospital.rating}</span>
                        <span className="mx-1 text-gray-500">·</span>
                        <span className="text-sm text-gray-500">
                          {hospital.reviews} reviews
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {hospital.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/profile/favorites"
                className="text-blue-600 hover:text-blue-800 text-sm mt-4 block"
              >
                {t("profile.viewAllFavorites")}
              </Link>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-6">
            <div className="flex gap-4">
              {profileData?.socialLinks &&
                Object.entries(profileData.socialLinks)
                  .filter(([_, link]) => link && link.trim() !== "") // Chỉ lấy những social có link
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
