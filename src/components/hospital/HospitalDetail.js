import React, { useState, useEffect } from "react";
import { MapPin, Phone, X, Heart, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import Login from "../login/Login";
import { useAuth } from "../../context/AuthContext";
import WriteReviewModal from "./WriteReviewModal";
import Reviews from "./Reviews";
import { getHospitalDetail, toggleLikeHospitalImage, checkImageLikeStatus } from "../../services/hospitalService";
import { useTranslation } from "react-i18next";
import { HOSPITAL_SERVICES } from "../../constants/services";
import { useToast } from "../../context/ToastContext";
import ReviewListModal from "./ReviewListModal";

const HospitalDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [hospital, setHospital] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [userLikes, setUserLikes] = useState(new Set());
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("photo"); // 'photo' or 'comment'
  const [reportTarget, setReportTarget] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, login, user, logout } = useAuth();
  const [loginSuccessCallback, setLoginSuccessCallback] = useState(null);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [imageLikes, setImageLikes] = useState({});
  const { addToast } = useToast();
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Fetch hospital data
  useEffect(() => {
    const fetchHospitalDetail = async () => {
      try {
        setLoading(true);
        const response = await getHospitalDetail(slug);

        if (response.status === "success" && response.data) {
          const data = response.data;
          
          // Format dữ liệu
          const formattedHospital = {
            id: data.id,
            name: data.name,
            specialties: data.specialties, // Lưu trực tiếp chuỗi specialties
            address: data.address,
            phone: data.phone,
            email: data.email,
            website: data.link_website,
            mapUrl: data.map_location,
            description: data.description,
            workingHours: [{
              days: "Monday - Sunday",
              time: data.operating_hours,
            }],
            // Bỏ phần filter không cần thiết
            services: data.specialties 
              ? data.specialties.split(",").map(s => s.trim())
              : [],
            gallery: data.images.map(image => ({
              id: image.id,
              url: image.url,
              title: `Hospital Image ${image.id}`,
              likes: image.likesCount || 0, 
              createdAt: image.createdAt,
              comments: [],
            })),
            rating: data.stats.average_rating || 5,
            reviewCount: data.stats.total_reviews || 0,
            staffDescription: data.staff_description,
            staffCredentials: data.staff_credentials,
            department: data.department,
          };

          setHospital(formattedHospital);
          setGalleryPhotos(formattedHospital.gallery);
          setReviews(data.recent_reviews || []);
        }
      } catch (error) {
        console.error("Error fetching hospital:", error);
        setError(error.message || "Failed to load hospital details");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchHospitalDetail();
    }
  }, [slug]);

  // Thêm useEffect để kiểm tra trạng thái like của từng ảnh
  useEffect(() => {
    const checkLikeStatuses = async () => {
      if (isAuthenticated && user && hospital?.id && galleryPhotos.length > 0) {
        try {
          const likeStatuses = {};
          for (const photo of galleryPhotos) {
            const response = await checkImageLikeStatus(hospital.id, photo.id);
            likeStatuses[photo.id] = response.data.hasLiked;
          }
          setImageLikes(likeStatuses);
        } catch (error) {
          console.error("Error checking like statuses:", error);
        }
      }
    };

    checkLikeStatuses();
  }, [isAuthenticated, user, hospital?.id, galleryPhotos]);

  // Handle view all reviews
  const handleViewAllReviews = () => {
    setShowAllReviews(true);
  };

  // Handle call button click
  const handleCall = () => {
    if (hospital?.phone) {
      window.location.href = `tel:${hospital.phone}`;
    }
  };

  // Handle get directions
  const handleGetDirections = () => {
    if (hospital?.mapUrl) {
      // Có thể cần điều chỉnh URL format tùy thuộc vào dạng dữ liệu map_location
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${hospital.mapUrl}`;
      window.open(mapUrl, "_blank");
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    // Kiểm tra đăng nhập trước
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      setShowUploadModal(false);
      // Lưu callback để upload sau khi đăng nhập
      setLoginSuccessCallback(() => () => {
        setShowUploadModal(true);
      });
      return;
    }

    const file = event.target.files[0];
    if (file) {
      // Mock upload - in real app, you'd upload to server
      const newImage = {
        id: hospital.gallery.length + 1,
        url: URL.createObjectURL(file),
        title: "New Upload",
      };
      setHospital((prev) => ({
        ...prev,
        gallery: [...prev.gallery, newImage],
      }));
      setShowUploadModal(false);
    }
  };

  const handleSubmitReview = async (formData) => {
    try {
      // TODO: Gọi API để submit review
      console.log("Submitting review:", formData);

      // Refresh reviews list
      // await fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
    }
  };

  const handleBookAppointment = async (date, time) => {
    try {
      // TODO: Call API to book appointment
      alert("Đặt lịch thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi đặt lịch");
    }
  };

  const handleToggleFavorite = () => {
    // Kiểm tra đăng nhập trước khi thực hiện
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      // Lưu callback để thực hiện sau khi đăng nhập
      setLoginSuccessCallback(() => () => {
        setIsFavorite(true);
      });
      return;
    }

    setIsFavorite(!isFavorite);
    // TODO: Call API to add/remove from favorites
  };

  const handleLikeImage = async (imageId) => {
    if (!isAuthenticated) {
      addToast({
        type: "error",
        message: t("Please login to like images")
      });
      setShowLoginModal(true);
      return;
    }

    try {
      const response = await toggleLikeHospitalImage(hospital.id, imageId);
      
      // Cập nhật UI dựa trên trạng thái like hiện tại
      const currentLikeStatus = imageLikes[imageId];
      
      setGalleryPhotos(prevPhotos =>
        prevPhotos.map(photo =>
          photo.id === imageId
            ? {
                ...photo,
                likes: currentLikeStatus ? photo.likes - 1 : photo.likes + 1
              }
            : photo
        )
      );
      
      // Cập nhật trạng thái like mới
      setImageLikes(prev => ({
        ...prev,
        [imageId]: !currentLikeStatus
      }));

      addToast({
        type: "success",
        message: !currentLikeStatus 
          ? t("Liked successfully") 
          : t("Unliked successfully")
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      addToast({
        type: "error",
        message: t("Error liking image")
      });
    }
  };

  const handlePhotoClick = (photo) => {
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      // Lưu callback để sau khi login sẽ mở ảnh này
      setLoginSuccessCallback(() => () => {
        setSelectedPhoto(photo);
        setShowComments(true);
      });
      return;
    }
    setSelectedPhoto(photo);
    setShowComments(true);
  };

  const handleAddComment = async (photoId, comment) => {
    // 1. Frontend validation
    if (!isAuthenticated || !user) {
      const currentPhoto = selectedPhoto;
      setShowComments(false);
      setSelectedPhoto(null);
      setShowLoginModal(true);
      setLoginSuccessCallback(() => () => {
        setSelectedPhoto(currentPhoto);
        setShowComments(true);
      });
      return;
    }

    try {
      // Mock comment data instead of calling API
      const newComment = {
        id: Date.now(),
        user: user.name,
        text: comment,
        createdAt: new Date().toISOString().split("T")[0],
        likes: 0,
      };

      // Update UI
      setGalleryPhotos((prev) =>
        prev.map((photo) =>
          photo.id === photoId
            ? { ...photo, comments: [...photo.comments, newComment] }
            : photo
        )
      );

      setSelectedPhoto((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment],
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };

  const handleReport = (type, targetId) => {
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      return;
    }
    setReportType(type);
    setReportTarget(targetId);
    setShowReportModal(true);
  };

  const handleSubmitReport = (reason) => {
    // TODO: Call API to submit report
    alert(`Reported ${reportType} successfully`);
    setShowReportModal(false);
  };

  const handleDeleteComment = (photoId, commentId) => {
    // Cập nhật galleryPhotos
    setGalleryPhotos((prev) =>
      prev.map((photo) =>
        photo.id === photoId
          ? {
              ...photo,
              comments: photo.comments.filter(
                (comment) => comment.id !== commentId
              ),
            }
          : photo
      )
    );

    // Cập nhật selectedPhoto
    setSelectedPhoto((prev) => ({
      ...prev,
      comments: prev.comments.filter((comment) => comment.id !== commentId),
    }));
  };

  const handleLoginSuccess = (userData) => {
    login(userData);
    setShowLoginModal(false);

    // Thực hiện callback nếu có
    if (loginSuccessCallback) {
      loginSuccessCallback();
      setLoginSuccessCallback(null);
    }
  };

  const handleCloseComments = () => {
    setShowComments(false);
    setSelectedPhoto(null);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
    setLoginSuccessCallback(null);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error: {error}
      </div>
    );
  if (!hospital)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Hospital not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Feature Section - Call Now & Get Directions */}
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {hospital.name}
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 md:flex md:gap-4">
              <button
                onClick={handleToggleFavorite}
                className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-6 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base
                  ${
                    isFavorite
                      ? "bg-red-50 text-red-500"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                <Heart
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
                <span className="text-center">
                  {isFavorite ? (
                    <>
                      Remove
                      <br className="md:hidden" />
                      Favorite
                    </>
                  ) : (
                    <>
                      Add
                      <br className="md:hidden" />
                      Favorite
                    </>
                  )}
                </span>
              </button>
              <button
                onClick={handleCall}
                className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-8 py-2 md:py-3 bg-[#67009B] text-white rounded-lg hover:bg-[#53007c] transition-colors text-sm md:text-base"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-center">
                  Call
                  <br className="md:hidden" />
                  Now
                </span>
              </button>
              <button
                onClick={handleGetDirections}
                className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-8 py-2 md:py-3 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] transition-colors text-sm md:text-base"
              >
                <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-center">
                  Get
                  <br className="md:hidden" />
                  Directions
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t("Thông tin bệnh viện")}
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>{hospital?.description}</p>
            </div>

            {/* Additional Information */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {hospital?.department && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t("Phòng khám")}
                  </h3>
                  <p className="text-gray-600">{hospital.department}</p>
                </div>
              )}
              
              {hospital?.specialties && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t("Chuyên khoa")}
                  </h3>
                  <p className="text-gray-600">{hospital.specialties}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Info & Services */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hospital Info */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                Hospital Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{hospital.rating}</span>
                  </div>
                  <span className="text-gray-500">
                    ({hospital.reviewCount} {t("reviews")})
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-sm md:text-base text-gray-600">
                      {hospital.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm md:text-base text-gray-600">
                      {hospital.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Working Hours</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base text-gray-600">
                    {hospital.workingHours?.map((hours, index) => (
                      <div key={index}>
                        <p className="font-medium">{hours.days}</p>
                        <p>{hours.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                {t("hospitalDetail.services.title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {hospital?.services?.map((service, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm md:text-base text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="h-[300px] lg:h-auto">
            {hospital.mapUrl && hospital.mapUrl.startsWith('http') ? (
              <iframe
                src={hospital.mapUrl}
                width="100%"
                height="100%"
                className="rounded-lg"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="hospital-location"
                sandbox="allow-scripts allow-same-origin allow-popups"
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">Bản đồ không khả dụng</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">{t("Gallery")}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  onClick={() => setSelectedPhoto(photo)}
                />
                
                {/* Overlay with like button and created time */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200 rounded-lg">
                  <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <span className="text-xs text-white bg-black/50 px-2 py-1 rounded-full">
                      {new Date(photo.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeImage(photo.id);
                      }}
                      className="flex items-center gap-1 bg-white/90 px-3 py-1.5 rounded-full text-sm hover:bg-white"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          imageLikes[photo.id] 
                            ? "fill-red-500 text-red-500" 
                            : "text-gray-600"
                        }`}
                      />
                      <span>{photo.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Reviews
          reviews={reviews}
          stats={hospital.stats}
          setReviews={setReviews}
          onViewAll={handleViewAllReviews}
          onWriteReview={() => setShowWriteReview(true)}
        />
      </div>

      {/* Review List Modal */}
      <ReviewListModal
        isOpen={showAllReviews}
        onClose={() => setShowAllReviews(false)}
        hospitalId={hospital?.id}
      />

      {/* Image Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload Photo</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer text-gray-600"
                >
                  <div className="text-sm">
                    Click to upload or drag and drop
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 10MB
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments Drawer */}
      {showComments && selectedPhoto && (
        <div className="fixed inset-0 z-[50]">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseComments}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold">Comments</h3>
                <button
                  onClick={handleCloseComments}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full aspect-video object-cover rounded-lg mb-4"
                />

                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">{selectedPhoto.title}</h4>
                  <button
                    onClick={() => handleLikeImage(selectedPhoto.id)}
                    className={`flex items-center gap-1 ${
                      imageLikes[selectedPhoto.id]
                        ? "text-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      size={16}
                      fill={
                        imageLikes[selectedPhoto.id] ? "currentColor" : "none"
                      }
                    />
                    <span>{selectedPhoto.likes}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedPhoto.comments.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">
                      No comments yet
                    </p>
                  ) : (
                    selectedPhoto.comments.map((comment) => (
                      <div key={comment.id} className="border-b pb-4">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            {comment.user[0]}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {comment.user}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {comment.createdAt}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                {comment.user === user?.name && (
                                  <button
                                    onClick={() =>
                                      handleDeleteComment(
                                        selectedPhoto.id,
                                        comment.id
                                      )
                                    }
                                    className="text-gray-400 hover:text-red-500"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                )}
                                <button
                                  onClick={() =>
                                    handleReport("comment", comment.id)
                                  }
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <p className="text-gray-600 mt-1">{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="p-4 border-t">
                {isAuthenticated && user ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Kiểm tra đăng nhập trước khi cho phép submit
                      if (!isAuthenticated || !user) {
                        setShowLoginModal(true);
                        return;
                      }
                      const comment = e.target.comment.value.trim();
                      if (comment) {
                        handleAddComment(selectedPhoto.id, comment);
                        e.target.reset();
                      }
                    }}
                  >
                    <textarea
                      name="comment"
                      placeholder="Write a comment..."
                      className="w-full px-3 py-2 border rounded-lg resize-none"
                      rows="3"
                    />
                    <button
                      type="submit"
                      className="w-full mt-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Post Comment
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-2">
                      Please login to comment
                    </p>
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Login to Comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/50" />
          <div className="fixed inset-0 flex items-center justify-center">
            <Login
              onClose={handleCloseLogin}
              onLoginSuccess={handleLoginSuccess}
              onRegisterClick={() => {
                setShowLoginModal(false);
                // Handle register click
              }}
            />
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowReportModal(false)}
          />
          <div className="relative bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Report {reportType === "photo" ? "Photo" : "Comment"}
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Please select a reason for reporting this {reportType}:
              </p>
              {[
                "Inappropriate content",
                "Spam",
                "Harassment",
                "False information",
                "Other",
              ].map((reason) => (
                <button
                  key={reason}
                  onClick={() => handleSubmitReport(reason)}
                  className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50"
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      <WriteReviewModal
        isOpen={showWriteReview}
        onClose={() => setShowWriteReview(false)}
        onSubmit={handleSubmitReview}
        hospitalId={hospital.id}
      />
    </div>
  );
};

export default HospitalDetail;
