import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  Mail,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Building,
} from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { getAllReviewsByAuth } from "../../services/reviewService";
import { getHospitalFavorites } from "../../services/favoriteService";

const socialIcons = {
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

function Profile() {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [favoriteError, setFavoriteError] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [reviewError, setReviewError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const fetchSomeReviews = async () => {
    try {
      const data = await getAllReviewsByAuth();
      console.log(data.data.reviews);
      const reviewsRes = Array.isArray(data.data.reviews)
        ? data.data.reviews
        : [];
      const reviewData = reviewsRes.filter((_, index) => index < 2);

      setReviews(reviewData);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setReviewError(true);
    }
  };

  const fetchSomeFavorites = async () => {
    try {
      const data = await getHospitalFavorites();
      console.log(data.data.favorites);
      const favoritesRes = Array.isArray(data.data.favorites)
        ? data.data.favorites
        : [];
      const reviewData = favoritesRes.filter((_, index) => index < 2);

      setFavorites(reviewData);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setFavoriteError(true);
    }
  };

  useEffect(() => {
    fetchSomeReviews();
    fetchSomeFavorites();
  }, []);

  // Memoize joinedDate để tránh tính toán lại không cần thiết
  const joinedDate = useMemo(() => {
    if (!user?.createdAt) return "";
    return new Date(user.createdAt).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
    });
  }, [user?.createdAt]);

  // Memoize user info để tránh re-render không cần thiết
  const userInfo = useMemo(
    () => ({
      name: user?.full_name || "User",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.location || "",
      avatar: user?.avatar || user?.full_name?.charAt(0) || "U",
      role: user?.role || "GENERAL_USER",
      socialMedia: user?.socialMedia || {},
    }),
    [user]
  );

  // Handle social media update
  const handleSocialUpdate = async (platform, url) => {
    try {
      await updateUser({
        social: {
          ...user?.social,
          [platform]: url,
        },
      });
      showToast({
        type: "success",
        message: t("profile.socialUpdateSuccess"),
      });
    } catch (error) {
      showToast({
        type: "error",
        message: t("profile.socialUpdateError"),
      });
    }
  };

  const handleRemoveFavorite = (hospitalId) => {
    setFavorites(favorites.filter((hospital) => hospital.id !== hospitalId));
  };

  const renderAvatar = () => {
    if (user?.avatar && user.avatar.startsWith("https://")) {
      return (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      );
    }
    return (
      <div className="w-full h-full bg-green-600 flex items-center justify-center text-white text-4xl">
        {(user?.name || "User").charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Profile Header with Banner - Giảm chiều cao trên mobile */}
      <div className="bg-gradient-to-r from-[#98E9E9] to-[#7CD5D5] h-40 md:h-60"></div>

      <div className="container mx-auto px-4 -mt-20">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
          {/* Profile Header - Cải thiện layout trên mobile */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              {/* Avatar - Căn giữa trên mobile */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto md:mx-0">
                {renderAvatar()}
              </div>

              {/* User Info - Stack vertically trên mobile */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-xl md:text-2xl font-semibold mb-2">
                  {userInfo.name}
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">{user?.bio}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-gray-600">
                  <div className="flex items-center">
                    <Mail size={18} className="mr-2" />
                    {userInfo.email}
                  </div>
                </div>
                {/* Social Media Links - Căn giữa trên mobile */}
                <div className="flex gap-4 mt-4 justify-center md:justify-start">
                  {userInfo.socialMedia &&
                    Object.entries(userInfo.socialMedia)
                      .filter(([platform, link]) => link && link.trim() !== "")
                      .map(([platform, link]) => {
                        const Icon = socialIcons[platform];
                        if (!Icon) return null;
                        return (
                          <a
                            key={platform}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            <Icon className="w-5 h-5" />
                          </a>
                        );
                      })}
                </div>
              </div>

              {/* Action Buttons - Stack vertically trên mobile */}
              <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                <Link
                  to="/setting"
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
                >
                  {t("profile.editProfile")}
                </Link>
                {(userInfo.role === "HOSPITAL_ADMIN" ||
                  userInfo.role === "ADMIN") && (
                  <Link
                    to="/manage-hospital"
                    className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] transition-colors text-center"
                  >
                    {t("profile.manageHospital")}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Content Grid - Chuyển sang 1 cột trên mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mt-4 md:mt-8">
            {/* Left Column */}
            <div>
              {/* Recent Reviews */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">
                  {t("profile.recentReviews")}
                </h2>
                <div className="space-y-4">
                  {reviews?.map((review) => (
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
                              size={14}
                              className="md:w-4 md:h-4"
                              fill={i < review.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {review.rating}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
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
                  className="text-blue-600 hover:text-blue-800 text-sm mt-4 block text-center md:text-left"
                >
                  {t("profile.viewAllReviews")}
                </Link>
              </div>
            </div>

            {/* Right Column - Favorite Hospitals */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">
                  {t("profile.favoriteHospitals")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favorites.map((hospital) => (
                    <div
                      key={hospital.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                      <LazyLoadImage
                        src={hospital.thumbnail}
                        alt={hospital.name}
                        effect="blur"
                        className="w-full h-36 md:h-48 object-cover"
                        placeholderSrc="/placeholder-hospital.jpg"
                      />
                      <div className="p-3 md:p-4">
                        <h3 className="font-medium text-sm md:text-base">
                          {hospital.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Star className="text-yellow-400 w-4 h-4" />
                          <span className="ml-1 text-sm">
                            {hospital.rating}
                          </span>
                          <span className="mx-1 text-gray-500">·</span>
                          <span className="text-sm text-gray-500">
                            {hospital.reviews} reviews
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {hospital.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/profile/favorites"
                  className="text-blue-600 hover:text-blue-800 text-sm mt-4 block text-center md:text-left"
                >
                  {t("profile.viewAllFavorites")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/manage-hospital")}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Building className="w-5 h-5 mr-2" />
          {t("profile.manageHospital")}
        </button>
        
        {/* ... other buttons ... */}
      </div>
    </div>
  );
}

export default Profile;
