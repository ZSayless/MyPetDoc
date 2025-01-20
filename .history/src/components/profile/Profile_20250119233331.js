import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
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
import { useToast } from "../../context/ToastContext";

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
      name: user?.name || "User",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.location || "",
      avatar: user?.avatar || user?.name?.charAt(0) || "U",
      role: user?.role || "user",
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

  const reviews = [
    {
      id: 1,
      hospitalName: "PetCare Hospital",
      rating: 4.5,
      comment:
        "Great service and friendly staff! The doctors were very professional and caring with my cat.",
      date: "2024-03-15",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    },
    {
      id: 2,
      hospitalName: "VetCare Clinic",
      rating: 5,
      comment:
        "Excellent facilities and professional doctors. They have the latest equipment and very clean environment.",
      date: "2024-03-10",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
    },
  ];

  const favoriteHospitals = [
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

  const [favorites, setFavorites] = useState(favoriteHospitals);

  const handleRemoveFavorite = (hospitalId) => {
    setFavorites(favorites.filter((hospital) => hospital.id !== hospitalId));
  };

  const renderAvatar = () => {
    if (user?.avatar && user.avatar.startsWith("data:image")) {
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
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header with Banner */}
      <div className="bg-gradient-to-r from-[#98E9E9] to-[#7CD5D5] h-60"></div>

      <div className="container mx-auto px-4 -mt-20">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden">
                {renderAvatar()}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-semibold mb-2">{userInfo.name}</h1>
                <p className="text-gray-600 mt-2 max-w-2xl">{user?.bio}</p>
                <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
                  <div className="flex items-center">
                    <Mail size={18} className="mr-2" />
                    {userInfo.email}
                  </div>
                  <div className="flex items-center">
                    <Phone size={18} className="mr-2" />
                    {userInfo.phone}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    {userInfo.address}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2" />
                    {t("profile.joined")} {joinedDate}
                  </div>
                </div>
                {/* Social Media Links */}
                <div className="flex gap-4 mt-4">
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
              <Link
                to="/setting"
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t("profile.editProfile")}
              </Link>
              {(userInfo.role === "veterinarian" ||
                userInfo.role === "admin") && (
                <Link
                  to="/add-hospital"
                  className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] transition-colors"
                >
                  {t("profile.registerHospital")}
                </Link>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Left Column */}
            <div>
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
