import { useState, useEffect, useCallback } from "react";
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

  const canSubmitReview = useCallback(() => {
    return isAuthenticated && user && ["ADMIN", "REGULAR_USER","HOSPITAL_ADMIN"].includes(user.role);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmitReview()) {
      alert(t("hospitalDetail.modal.writeReview.errors.loginRequired"));
      return;
    }

    if (rating <= 0 || rating > 5) {
      alert(t("hospitalDetail.modal.writeReview.errors.ratingRequired"));
      return;
    }

    if (!review) {
      alert(t("hospitalDetail.modal.writeReview.errors.reviewRequired"));
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

    if (file.size > 5 * 1024 * 1024) {
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
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
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

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6 text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("hospitalDetail.modal.writeReview.rating")}
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
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("hospitalDetail.modal.writeReview.review")}
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t(
                "hospitalDetail.modal.writeReview.reviewPlaceholder"
              )}
              required
            />
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
          </div>

          {image && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("hospitalDetail.modal.writeReview.imageDescription")}
              </label>
              <input
                type="text"
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("hospitalDetail.modal.writeReview.imageDescriptionPlaceholder")}
              />
            </div>
          )}

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
              type="submit"
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
        </form>
      </div>
    </div>
  );
}

export default WriteReviewModal;
