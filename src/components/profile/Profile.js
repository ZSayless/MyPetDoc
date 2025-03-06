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
import { communityService } from "../../services/communityService";

function Profile() {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [favoriteError, setFavoriteError] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [reviewError, setReviewError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [posts, setPosts] = useState([]);
  const [postsError, setPostsError] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
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
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser?.email) {
        const response = await getUserInfoByEmail(savedUser.email);
        if (response.status === "success") {
          const {
            full_name,
            email,
            phone_number,
            avatar,
            role,
            pets,
          } = response.data;

          setUserDetails({
            full_name,
            email,
            phone_number,
            avatar,
            role,
            pets: pets || [],
          });
        }
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

  const fetchMyPosts = async () => {
    try {
      const response = await communityService.getMyPosts();
      const postsData = Array.isArray(response.data.posts) 
        ? response.data.posts.filter((_, index) => index < 3)
        : [];
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPostsError(true);
    }
  };

  useEffect(() => {
    fetchSomeReviews();
    fetchSomeFavorites();
    fetchUserDetails();
    fetchMyPosts();
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

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      await communityService.deletePost(postToDelete.id);
      addToast("success", t("profile.posts.deleteSuccess"));
      setPosts(posts.filter(post => post.id !== postToDelete.id));
      setDeleteModalOpen(false);
      setPostToDelete(null);
    } catch (error) {
      console.error("Error deleting post:", error);
      addToast("error", t("profile.posts.deleteError"));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setPostToDelete(null);
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
              {userDetails?.role !== "HOSPITAL_ADMIN" && (
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
                          d="M4.5 12.5l6-6.5 6 6.5M12 18V9"
                        />
                      </svg>
                      {t("profile.pet.title")}
                    </h2>
                    <Link
                      to="/setting"
                      className="text-sm text-[#7CD5D5] hover:text-[#98E9E9] font-medium"
                    >
                      {t("profile.pet.viewAll")}
                    </Link>
                  </div>

                  {userDetails?.pets && userDetails.pets.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2">
                      {userDetails.pets.map((pet) => (
                        <div 
                          key={pet.id}
                          className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            {pet.photo ? (
                              <img
                                src={pet.photo}
                                alt={`${pet.type}`}
                                className="w-16 h-16 rounded-full object-cover border-2 border-[#7CD5D5]"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-[#7CD5D5] flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                  />
                                </svg>
                              </div>
                            )}
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {t(`profile.pet.types.${pet.type.toLowerCase()}`)}
                              </h3>
                              {pet.age && (
                                <p className="text-sm text-gray-500">
                                  {pet.age} {t("profile.pet.years")}
                                </p>
                              )}
                            </div>
                          </div>

                          {pet.notes && (
                            <div className="mt-3">
                              <p className="text-sm text-gray-600 bg-white p-3 rounded-lg">
                                {pet.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                      <p className="text-gray-500">{t("profile.pet.noPets")}</p>
                    </div>
                  )}
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

              {/* My Posts Section */}
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
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                    {t("profile.posts.title")}
                  </h2>
                  <Link
                    to="/bloglist"
                    className="text-sm text-[#7CD5D5] hover:text-[#98E9E9] font-medium"
                  >
                    {t("profile.posts.viewAll")}
                  </Link>
                </div>

                <div className="grid gap-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-gray-50 rounded-xl overflow-hidden hover:bg-gray-100 transition-colors"
                    >
                      <Link to={`/blog/${post.slug}`} className="block">
                        <div className="flex flex-col md:flex-row">
                          {/* Phần ảnh */}
                          <div className="md:w-48 h-48 md:h-auto relative">
                            {post.image_url ? (
                              <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <svg
                                  className="w-12 h-12 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                            {post.category && (
                              <span className="absolute top-2 left-2 bg-[#7CD5D5] text-white px-2 py-1 rounded-md text-xs">
                                {post.category}
                              </span>
                            )}
                          </div>

                          {/* Phần nội dung */}
                          <div className="p-4 flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex-1 pr-10">
                                <h3 className="font-medium text-gray-900 text-lg line-clamp-1">
                                  {post.caption}
                                </h3>
                                <span className="text-sm text-gray-500">
                                  {new Date(post.created_at).toLocaleDateString('vi-VN')}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleDeleteClick(post);
                                }}
                                className="shrink-0 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-red-500"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>

                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {post.description}
                            </p>

                            {/* Thông tin tương tác */}
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                </svg>
                                <span>{post.likes_count || 0} {t("profile.posts.likes")}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{post.comments_count || 0} {t("profile.posts.comments")}</span>
                              </div>
                              {post.views_count !== undefined && (
                                <div className="flex items-center gap-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>{post.views_count} {t("profile.posts.views")}</span>
                                </div>
                              )}
                            </div>

                            {/* Tags */}
                            {post.tags && typeof post.tags === 'string' && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {post.tags.split(',').map((tag, index) => (
                                  <span
                                    key={index}
                                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                                  >
                                    #{tag.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                  {posts.length === 0 && !postsError && (
                    <div className="text-center py-6 text-gray-500">
                      {t("profile.posts.noPosts")}
                    </div>
                  )}
                  {postsError && (
                    <div className="text-center py-6 text-red-500">
                      {t("profile.posts.error")}
                    </div>
                  )}
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

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity" 
              aria-hidden="true"
              onClick={handleDeleteCancel}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg 
                      className="h-6 w-6 text-red-600" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {t("profile.posts.deleteTitle")}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {t("profile.posts.deleteMessage")}
                      </p>
                      {postToDelete && (
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          "{postToDelete.caption}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteConfirm}
                >
                  {t("profile.posts.deleteConfirm")}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteCancel}
                >
                  {t("profile.posts.deleteCancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
