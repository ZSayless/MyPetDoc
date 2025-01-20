import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MapPin, Phone, X, Star, Heart, Upload } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Login from "../profile/login/Login";
import { useAuth } from "../../context/AuthContext";
import WriteReviewModal from "./WriteReviewModal";
import Reviews from "./Reviews";
import { useToast } from "../../context/ToastContext";
import LoadingSpinner from "../common/LoadingSpinner";
import UploadPhotoModal from "./UploadPhotoModal";
import { useTranslation } from "react-i18next";

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
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2068&h=1380",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=2070&h=1380",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&h=1380",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&h=1380",
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
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("photo");
  const [reportTarget, setReportTarget] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [loginSuccessCallback, setLoginSuccessCallback] = useState(null);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const { showToast } = useToast();
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showFavoriteToast, setShowFavoriteToast] = useState(false);

  // Handle submit review
  const handleReviewSubmit = useCallback(
    async (newReview) => {
      try {
        setLoading(true);
        // Chuyển đổi images thành base64
        const convertedImages = await Promise.all(
          newReview.images.map(async (img) => {
            if (typeof img === "string") return img;

            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(img);
            });
          })
        );

        const reviewWithImages = {
          ...newReview,
          images: convertedImages,
          createdAt: new Date().toISOString(),
        };

        // Add new review to the list
        setReviews((prevReviews) => [reviewWithImages, ...prevReviews]);

        // Save to localStorage
        const savedReviews = JSON.parse(
          localStorage.getItem(`reviews_${id}`) || "[]"
        );
        const updatedReviews = [reviewWithImages, ...savedReviews];
        localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

        showToast("Review submitted successfully");
        setShowWriteReview(false);
      } catch (error) {
        console.error("Error submitting review:", error);
        showToast("Failed to submit review", "error");
      } finally {
        setLoading(false);
      }
    },
    [id, showToast]
  );

  // Check if user is logged in and has required permissions
  const canPerformActions = useCallback(() => {
    return isAuthenticated && user && ["admin", "user"].includes(user.role);
  }, [isAuthenticated, user]);

  // Debug log để kiểm tra
  useEffect(() => {
    console.log("Auth state:", { isAuthenticated, user });
  }, [isAuthenticated, user]);

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = JSON.parse(
      localStorage.getItem(`reviews_${id}`) || "[]"
    );
    if (savedReviews.length > 0) {
      setReviews(savedReviews);
    }
  }, [id]);

  // Memoize filtered gallery photos
  const sortedGalleryPhotos = useMemo(() => {
    return [...galleryPhotos].sort((a, b) => b.likes - a.likes);
  }, [galleryPhotos]);

  // Check if user can upload photos (only veterinarian role)
  const canUploadPhotos = useCallback(() => {
    return isAuthenticated && user && user.role === "veterinarian";
  }, [isAuthenticated, user]);

  // Khởi tạo dữ liệu gallery khi có hospital data
  useEffect(() => {
    if (hospital?.gallery) {
      setGalleryPhotos(
        hospital.gallery.map((photo) => ({
          ...photo,
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
  const handlePhotoUpload = async (formData) => {
    if (!canPerformActions()) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    try {
      // Mock upload - in real app, you'd upload to server
      const newImage = {
        id: Date.now(),
        url: URL.createObjectURL(formData.get("image")),
        title: formData.get("title"),
      };

      setGalleryPhotos((prev) => [...prev, newImage]);
      showToast("Photo uploaded successfully");
      setShowUploadModal(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
      showToast("Failed to upload photo", "error");
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

  const handleToggleFavorite = useCallback(() => {
    if (!canPerformActions()) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }
    
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    setShowFavoriteToast(true);
    setTimeout(() => setShowFavoriteToast(false), 3000);

    // Update localStorage
    const currentFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (newFavoriteState) {
      const updatedFavorites = [...currentFavorites, id];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = currentFavorites.filter((favId) => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  }, [canPerformActions, id, isFavorite]);

  // Check if hospital is favorite on load
  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setIsFavorite(savedFavorites.includes(id));
  }, [id]);

  const handlePhotoClick = useCallback((photo) => {
    setSelectedPhoto(photo);
  }, []);

  const handleAddComment = useCallback(
    (photoId, comment) => {
      if (!canPerformActions()) {
        setShowLoginModal(true);
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
    },
    [canPerformActions, user?.name]
  );

  const handleReport = useCallback(
    (type, targetId) => {
      if (!canPerformActions()) {
        setShowLoginModal(true);
        return;
      }
      setReportType(type);
      setReportTarget(targetId);
      setShowReportModal(true);
    },
    [canPerformActions]
  );

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
    // TODO: Handle login success
    console.log("Login successful:", userData);
    setShowLoginModal(false);

    // Thực hiện callback nếu có
    if (loginSuccessCallback) {
      loginSuccessCallback();
      setLoginSuccessCallback(null);
    }
  };

  const handleCloseComments = () => {
    setSelectedPhoto(null);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
    setLoginSuccessCallback(null);
  };

  // Photo modal
  const PhotoModal = ({ photo, onClose }) => {
    if (!photo) return null;

    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full mx-auto">
          <div className="p-4 border-b flex justify-between items-center">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4">
            <img
              src={photo.url}
              alt=""
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  if (loading) return <LoadingSpinner size="lg" />;
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
                className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                <span className="text-center text-[11px] leading-3 md:text-sm md:leading-normal whitespace-nowrap">
                  {isFavorite 
                    ? t("hospitalDetail.actions.removeFavorite") 
                    : t("hospitalDetail.actions.addFavorite")
                  }
                </span>
              </button>

              <button
                onClick={handleCall}
                className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-center text-[11px] leading-3 md:text-sm md:leading-normal whitespace-nowrap">
                  {t("hospitalDetail.actions.callNow")}
                </span>
              </button>

              <button
                onClick={handleGetDirections}
                className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200"
              >
                <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-center text-[11px] leading-3 md:text-sm md:leading-normal whitespace-nowrap">
                  {t("hospitalDetail.actions.getDirections")}
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
                {t("hospitalDetail.info.title")}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">{t("hospitalDetail.info.address")}</h3>
                    <p className="text-sm md:text-base text-gray-600">
                      {hospital.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">{t("hospitalDetail.info.phone")}</h3>
                    <p className="text-sm md:text-base text-gray-600">
                      {hospital.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{t("hospitalDetail.info.workingHours")}</h3>
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
            <h2 className="text-lg md:text-2xl font-bold">{t("hospitalDetail.gallery.title")}</h2>
            {canUploadPhotos() && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white text-sm md:text-base rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Upload size={18} />
                {t("hospitalDetail.gallery.uploadButton")}
              </button>
            )}
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
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white">{t("hospitalDetail.gallery.viewDetails")}</span>
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
          onViewAll={handleViewAllReviews}
          onWriteReview={() => setShowWriteReview(true)}
        />
      </div>

      {/* Modals */}
      {showUploadModal && (
        <UploadPhotoModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSubmit={handlePhotoUpload}
          onError={() => {
            showToast(t("hospitalDetail.alerts.uploadError"), "error");
          }}
          onSuccess={() => {
            showToast(t("hospitalDetail.alerts.uploadSuccess"));
          }}
        />
      )}

      {showWriteReview && (
        <WriteReviewModal
          isOpen={showWriteReview}
          onClose={() => setShowWriteReview(false)}
          onSubmit={handleReviewSubmit}
          onError={() => {
            showToast(t("hospitalDetail.alerts.reviewError"), "error");
          }}
          onSuccess={() => {
            showToast(t("hospitalDetail.alerts.reviewSuccess"));
          }}
        />
      )}

      {/* Toast Messages */}
      {!isAuthenticated && showLoginPrompt && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {t("hospitalDetail.alerts.loginRequired")}
        </div>
      )}

      {showFavoriteToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {isFavorite 
            ? t("hospitalDetail.alerts.favoriteAdded") 
            : t("hospitalDetail.alerts.favoriteRemoved")
          }
        </div>
      )}

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => {
            setSelectedPhoto(null);
          }}
        />
      )}
    </div>
  );
};

export default HospitalDetail;
