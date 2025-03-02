import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, Mail, Building } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { getAllReviewsByAuth } from "../../services/reviewService";
import { getHospitalFavorites } from "../../services/favoriteService";
import { getUserInfoByEmail } from "../../services/userService";

function Profile() {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [favoriteError, setFavoriteError] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [reviewError, setReviewError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [userDetails, setUserDetails] = useState({});
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

  const fetchUserDetails = async () => {
    try {
      const response = await getUserInfoByEmail(user.email);
      if (response.status === "success") {
        const {
          full_name,
          email,
          phone_number,
          avatar,
          role,
          pet_type,
          pet_age,
          pet_photo,
          pet_notes,
        } = response.data;

        setUserDetails({
          full_name,
          email,
          phone_number,
          avatar,
          role,
          pet_type,
          pet_age,
          pet_photo,
          pet_notes,
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchSomeFavorites = async () => {
    try {
      const data = await getHospitalFavorites(user.id);
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
    fetchUserDetails();
  }, []);

  // Memoize user info để tránh re-render không cần thiết
  const userInfo = useMemo(
    () => ({
      name: user?.full_name || "User",
      email: user?.email || "",
      avatar: user?.avatar || user?.full_name?.charAt(0) || "U",
      role: user?.role || "GENERAL_USER",
    }),
    [user]
  );

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
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="relative">
        <div className="h-48 md:h-64 bg-gradient-to-r from-[#98E9E9] to-[#7CD5D5]"></div>

        {/* Profile Summary Card */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-24 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar Section */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-xl overflow-hidden ring-4 ring-white shadow-lg">
                    {renderAvatar()}
                  </div>
                  <Link
                    to="/setting"
                    className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </Link>
                </div>

                {/* User Info Section */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {userInfo.name}
                    </h1>
                    <div className="flex justify-center">
                      <span
                        className={`inline-block px-2 py-0.5 text-sm font-medium rounded-lg w-fit
                        ${userInfo.role === "HOSPITAL_ADMIN"
                            ? "bg-blue-50 text-blue-700"
                            : userInfo.role === "ADMIN"
                              ? "bg-purple-50 text-purple-700"
                              : "bg-green-50 text-green-700"
                          }`}
                      >
                        {userInfo.role === "HOSPITAL_ADMIN"
                          ? t("profile.role.veterinarian")
                          : userInfo.role === "ADMIN"
                            ? t("profile.role.admin")
                            : t("profile.role.petOwner")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        {userInfo.email}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                    <Link
                      to="/setting"
                      className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {t("profile.actions.editProfile")}
                    </Link>
                    {(userInfo.role === "HOSPITAL_ADMIN" ||
                      userInfo.role === "ADMIN") && (
                        <Link
                          to="/manage-hospital"
                          className="inline-flex items-center px-4 py-2 bg-[#98E9E9] rounded-lg text-sm font-medium text-gray-700 hover:bg-[#7CD5D5] transition-colors"
                        >
                          <Building className="h-5 w-5 mr-2" />
                          {t("profile.actions.manageHospital")}
                        </Link>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Pet Information Section */}
              {userInfo.role !== "HOSPITAL_ADMIN" && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#7CD5D5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514"
                        />
                      </svg>
                      {t("profile.petInfo.title")}
                    </h2>
                    <Link
                      to="/setting"
                      className="text-sm text-[#7CD5D5] hover:text-[#98E9E9] font-medium"
                    >
                      {t("profile.petInfo.edit")}
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      {/* Pet Type */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-[#7CD5D5]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              {t("profile.petInfo.type.label")}
                            </h3>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                              {userDetails?.pet_type ||
                                t("profile.petInfo.type.noData")}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Pet Age */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-[#7CD5D5]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              {t("profile.petInfo.age.label")}
                            </h3>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                              {userDetails?.pet_age || t("profile.petInfo.age.noData")}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Pet Notes */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-[#7CD5D5]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              {t("profile.petInfo.notes.label")}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-700 bg-white rounded-lg p-4">
                          {userDetails?.pet_notes || t("profile.petInfo.notes.noData")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Pet Photo */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-[#7CD5D5]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              {t("profile.petInfo.photo.label")}
                            </h3>
                          </div>
                        </div>
                        {userDetails?.pet_photo ? (
                          <img
                            src={userDetails.pet_photo}
                            alt="Pet"
                            className="w-full h-48 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 rounded-lg bg-white border-2 border-dashed border-gray-200 flex items-center justify-center">
                            <span className="text-sm text-gray-500">
                              {t("profile.petInfo.photo.noData")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Reviews Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Star className="h-6 w-6 text-[#7CD5D5]" />
                    {t("profile.reviews.title")}
                  </h2>
                  <Link
                    to="/profile/reviews"
                    className="text-sm text-[#7CD5D5] hover:text-[#98E9E9] font-medium"
                  >
                    {t("profile.reviews.viewAll")}
                  </Link>
                </div>

                <div className="space-y-6">
                  {reviews?.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">
                          {review.hospitalName}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="fill-current"
                              fill={i < review.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {review.rating}
                        </span>
                      </div>
                      <p className="mt-3 text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Favorite Hospitals */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Building className="h-6 w-6 text-[#7CD5D5]" />
                    {t("profile.favorites.title")}
                  </h2>
                  <Link
                    to="/profile/favorites"
                    className="text-sm text-[#7CD5D5] hover:text-[#98E9E9] font-medium"
                  >
                    {t("profile.favorites.viewAll")}
                  </Link>
                </div>

                <div className="space-y-4">
                  {favorites.map((hospital) => (
                    <div
                      key={hospital.id}
                      className="bg-gray-50 rounded-xl overflow-hidden"
                    >
                      <LazyLoadImage
                        src={hospital.thumbnail}
                        alt={hospital.name}
                        effect="blur"
                        className="w-full h-48 object-cover"
                        placeholderSrc="/placeholder-hospital.jpg"
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900">
                          {hospital.name}
                        </h3>
                        <div className="flex items-center mt-2">
                          <Star className="text-yellow-400 w-5 h-5" />
                          <span className="ml-1 text-sm text-gray-600">
                            {hospital.rating}
                          </span>
                          <span className="mx-1 text-gray-400">·</span>
                          <span className="text-sm text-gray-600">
                            {hospital.reviews} reviews
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {hospital.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
