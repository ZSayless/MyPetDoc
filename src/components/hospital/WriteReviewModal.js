import { useState, useEffect, useCallback, useRef } from "react";
import { X, Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { createReview, updateReview, getUserReviews } from "../../services/hospitalService";

function WriteReviewModal({ isOpen, onClose, onSubmit, hospitalId }) {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingReview, setExistingReview] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const canSubmitReview = useCallback(() => {
    return isAuthenticated && user && ["ADMIN", "GENERAL_USER","HOSPITAL_ADMIN"].includes(user.role);
  }, [isAuthenticated, user]);

  useEffect(() => {
    const checkExistingReview = async () => {
      if (isAuthenticated && hospitalId) {
        try {
          const response = await getUserReviews();
          const userReview = response.data.reviews.find(
            (review) => review.hospital_id === parseInt(hospitalId)
          );
          
          if (userReview) {
            setExistingReview(userReview);
            setRating(userReview.rating);
            setReview(userReview.comment);
            if (userReview.photo) {
              setImageDescription(userReview.photo.description);
            }
          }
        } catch (error) {
          console.error("Error checking existing review:", error);
        }
      }
    };

    if (isOpen) {
      checkExistingReview();
    }
  }, [isOpen, isAuthenticated, hospitalId]);

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      newErrors.rating = t("hospitalDetail.modal.writeReview.errors.ratingRequired");
      isValid = false;
    }

    // Validate review content
    if (!review.trim()) {
      newErrors.review = t("hospitalDetail.modal.writeReview.errors.reviewRequired");
      isValid = false;
    } else {
      // Kiểm tra độ dài
      if (review.length < 10) {
        newErrors.review = t("hospitalDetail.modal.writeReview.errors.reviewTooShort");
        isValid = false;
      }
      if (review.length > 1000) {
        newErrors.review = t("hospitalDetail.modal.writeReview.errors.reviewTooLong");
        isValid = false;
      }
      
      // Kiểm tra nội dung không phù hợp
      const inappropriateWords = ['xxx', 'yyy', 'zzz']; // Thêm từ khóa cần kiểm tra
      if (inappropriateWords.some(word => review.toLowerCase().includes(word))) {
        newErrors.review = t("hospitalDetail.modal.writeReview.errors.inappropriateContent");
        isValid = false;
      }
    }

    // Validate image
    if (image) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      
      if (image.size > maxSize) {
        newErrors.image = t("hospitalDetail.modal.writeReview.errors.imageSizeLimit");
        isValid = false;
      }
      
      if (!validTypes.includes(image.type)) {
        newErrors.image = t("hospitalDetail.modal.writeReview.errors.imageTypeInvalid");
        isValid = false;
      }
    }

    // Validate image description
    if (image && !imageDescription.trim()) {
      newErrors.imageDescription = t("hospitalDetail.modal.writeReview.errors.imageDescriptionRequired");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!canSubmitReview()) {
      alert(t("hospitalDetail.modal.writeReview.errors.loginRequired"));
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("hospital_id", hospitalId);
      formData.append("rating", rating);
      formData.append("comment", review);
      if (image) {
        formData.append("image", image);
        formData.append("image_description", imageDescription || "Review image");
      }

      let response;
      if (existingReview) {
        response = await updateReview(existingReview.id, formData);
      } else {
        response = await createReview(formData);
      }

      const newReview = {
        id: response.data.id || existingReview?.id || Date.now(),
        user: {
          name: user.name,
          avatar: user.avatar || user.name.charAt(0),
        },
        rating,
        content: review,
        images: image ? [URL.createObjectURL(image)] : 
                (existingReview?.photo ? [existingReview.photo.image_url] : []),
        createdAt: new Date().toISOString(),
        verified: true,
      };

      await onSubmit(newReview);

      setRating(0);
      setReview("");
      setImage(null);
      setImageDescription("");
      setExistingReview(null);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(t("hospitalDetail.modal.writeReview.errors.submitError"));
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert(t("hospitalDetail.modal.writeReview.errors.imageSizeLimit"));
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert(t("hospitalDetail.modal.writeReview.errors.imageTypeInvalid"));
      return;
    }

    setImage(file);
  };

  const removeImage = () => {
    setImage(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <h2 className="text-xl font-semibold">
            {existingReview 
              ? t("hospitalDetail.modal.writeReview.titleUpdate")
              : t("hospitalDetail.modal.writeReview.title")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          <div className="mb-6 text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("hospitalDetail.modal.writeReview.rating")}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-1 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("hospitalDetail.modal.writeReview.review")}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.review ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
              placeholder={t("hospitalDetail.modal.writeReview.reviewPlaceholder")}
            />
            {errors.review && (
              <p className="mt-1 text-sm text-red-500">{errors.review}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {t("hospitalDetail.modal.writeReview.reviewLength", {
                current: review.length,
                min: 10,
                max: 1000
              })}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("hospitalDetail.modal.writeReview.addPhoto")}
            </label>
            
            {image ? (
              <div className="relative inline-block">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                  id="review-image"
                />
                <label
                  htmlFor="review-image"
                  className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500"
                >
                  {t("hospitalDetail.modal.writeReview.uploadPhoto")}
                  <p className="text-sm text-gray-500 mt-1">
                    {t("hospitalDetail.modal.writeReview.imageLimit")}
                  </p>
                </label>
              </div>
            )}
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </div>

          {image && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("hospitalDetail.modal.writeReview.imageDescription")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
                  ${errors.imageDescription ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                placeholder={t("hospitalDetail.modal.writeReview.imageDescriptionPlaceholder")}
              />
              {errors.imageDescription && (
                <p className="mt-1 text-sm text-red-500">{errors.imageDescription}</p>
              )}
            </div>
          )}
        </form>

        <div className="p-4 border-t shrink-0">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              {t("hospitalDetail.modal.writeReview.cancel")}
            </button>
            <button
              type="button"
              onClick={() => formRef.current?.requestSubmit()}
              className="px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] disabled:opacity-50"
              disabled={loading || rating <= 0 || !review}
            >
              {loading
                ? t("hospitalDetail.modal.writeReview.submitting")
                : existingReview
                ? t("hospitalDetail.modal.writeReview.update")
                : t("hospitalDetail.modal.writeReview.submit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteReviewModal;
