import React, { useState, useEffect } from "react";
import { MapPin, Phone, X, Star, Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Login from "../login/Login";
import { useAuth } from "../../context/AuthContext";
import WriteReviewModal from "./WriteReviewModal";
import Reviews from "./Reviews";

const MOCK_HOSPITAL = {
  id: 1,
  name: "Pet Care Hospital & Wellness Center",
  specialization: "Full Service Veterinary Hospital",
  phone: "+84 123 456 789",
  address: "123 Nguyen Van Linh, District 7, Ho Chi Minh City",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669658423711!2d106.66488007465357!3d10.75992005944615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s&zoom=16",
  rating: 4.9,
  workingHours: [
    { days: "Monday - Friday", time: "8:00 AM - 8:00 PM" },
    { days: "Saturday - Sunday", time: "9:00 AM - 6:00 PM" },
  ],
  services: [
    "General Checkup",
    "Vaccination",
    "Surgery",
    "Pet Grooming",
    "Emergency Care",
    "Dental Care",
    "Laboratory Services",
    "Pet Boarding",
  ],
  gallery: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&h=1380",
      title: "Reception Area",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2068&h=1380",
      title: "Treatment Room",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=2070&h=1380",
      title: "Pet Grooming",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&h=1380",
      title: "Laboratory",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&h=1380",
      title: "Pet Boarding Area",
    },
  ],
};

const MOCK_REVIEWS = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "A",
    },
    rating: 5,
    verified: true,
    content:
      "Exceptional care for my dog! The staff was incredibly professional and caring. The facilities are modern and clean. I particularly appreciated how they took time to explain everything in detail.",
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: 2,
    user: {
      name: "Maria Garcia",
      avatar: "M",
    },
    rating: 5,
    verified: true,
    content:
      "Best veterinary experience ever! Dr. Garcia was amazing with my anxious cat. The entire team made us feel comfortable and well-cared for. Highly recommend their services!",
    createdAt: "2024-03-12T15:30:00Z",
  },
  {
    id: 3,
    user: {
      name: "James Wilson",
      avatar: "J",
    },
    rating: 4,
    verified: true,
    content:
      "Outstanding service from start to finish. The online booking was easy, wait times were minimal, and the treatment was excellent. My pet's health improved significantly after the visit.",
    createdAt: "2024-03-10T09:15:00Z",
  },
];

const MOCK_PHOTO_COMMENTS = {
  1: [
    {
      id: 1,
      user: "Alice Johnson",
      text: "Beautiful reception area, very welcoming!",
      createdAt: "2024-03-15",
      likes: 5,
    },
    {
      id: 2,
      user: "Bob Smith",
      text: "The staff here is amazing, always so friendly",
      createdAt: "2024-03-14",
      likes: 3,
    },
  ],
  2: [
    {
      id: 3,
      user: "Carol White",
      text: "State-of-the-art treatment room, very impressed!",
      createdAt: "2024-03-13",
      likes: 7,
    },
  ],
};

const HospitalDetail = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(MOCK_HOSPITAL);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [loading, setLoading] = useState(false);
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

  // Khởi tạo dữ liệu gallery khi có hospital data
  useEffect(() => {
    if (hospital?.gallery) {
      setGalleryPhotos(
        hospital.gallery.map((photo) => ({
          ...photo,
          likes: 0,
          comments: MOCK_PHOTO_COMMENTS[photo.id] || [],
        }))
      );
    }
  }, [hospital]);

  // Handle view all reviews
  const handleViewAllReviews = () => {
    // Mock loading more reviews
    const moreReviews = [
      {
        id: 4,
        user: {
          name: "Emily Chen",
          avatar: "E",
        },
        rating: 5,
        verified: true,
        content:
          "I've been bringing my pets here for years. The level of care and attention is consistently excellent. The staff remembers my pets and their specific needs.",
        createdAt: "2024-03-08T14:20:00Z",
      },
      {
        id: 5,
        user: {
          name: "David Brown",
          avatar: "D",
        },
        rating: 5,
        verified: true,
        content:
          "Very impressed with the emergency services. When my dog needed urgent care late at night, they were quick to respond and provided excellent treatment.",
        createdAt: "2024-03-05T22:45:00Z",
      },
    ];

    setReviews([...reviews, ...moreReviews]);
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
      window.open(hospital.mapUrl.replace("/embed?", "/dir?"), "_blank");
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

  const handleLikePhoto = (photoId) => {
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      return;
    }

    if (userLikes.has(photoId)) {
      setUserLikes((prev) => {
        const newLikes = new Set(prev);
        newLikes.delete(photoId);
        return newLikes;
      });
      setGalleryPhotos((prev) =>
        prev.map((photo) =>
          photo.id === photoId ? { ...photo, likes: photo.likes - 1 } : photo
        )
      );
    } else {
      setUserLikes((prev) => new Set([...prev, photoId]));
      setGalleryPhotos((prev) =>
        prev.map((photo) =>
          photo.id === photoId ? { ...photo, likes: photo.likes + 1 } : photo
        )
      );
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
              <p className="text-sm md:text-base text-gray-600 mt-1">
                {hospital.specialization}
              </p>
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
                Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {hospital.services?.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm md:text-base">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="h-[300px] lg:h-auto">
            <iframe
              src={hospital.mapUrl}
              width="100%"
              height="100%"
              className="rounded-lg"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-bold">Photo Gallery</h2>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white text-sm md:text-base rounded-lg hover:bg-blue-700"
            >
              Upload Photo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <div
                  className="aspect-video relative group cursor-pointer"
                  onClick={() => handlePhotoClick(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white">View Details</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{photo.title}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReport("photo", photo.id);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikePhoto(photo.id);
                        }}
                        className={`flex items-center gap-1 ${
                          userLikes.has(photo.id)
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={16}
                          fill={
                            userLikes.has(photo.id) ? "currentColor" : "none"
                          }
                        />
                        <span>{photo.likes}</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {photo.comments.length} comments
                  </p>
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
          onViewAll={handleViewAllReviews}
          onWriteReview={() => setShowWriteReview(true)}
        />
      </div>

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
                    onClick={() => handleLikePhoto(selectedPhoto.id)}
                    className={`flex items-center gap-1 ${
                      userLikes.has(selectedPhoto.id)
                        ? "text-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      size={16}
                      fill={
                        userLikes.has(selectedPhoto.id)
                          ? "currentColor"
                          : "none"
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
      />
    </div>
  );
};

export default HospitalDetail;
