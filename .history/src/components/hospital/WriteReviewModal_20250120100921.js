import { useState, useEffect, useCallback } from "react";
import { X, Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

function WriteReviewModal({ isOpen, onClose, onSubmit }) {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const canSubmitReview = useCallback(() => {
    return isAuthenticated && user && ["admin", "user"].includes(user.role);
  }, [isAuthenticated, user]);

  // Debug log
  useEffect(() => {
    console.log("Auth state in modal:", { isAuthenticated, user });
  }, [isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmitReview()) {
      alert(t("hospitalDetail.modal.writeReview.errors.loginRequired"));
      return;
    }

    if (rating === 0) {
      alert(t("hospitalDetail.modal.writeReview.errors.ratingRequired"));
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("content", review);
      images.forEach((image) => {
        formData.append("images", image);
      });

      // Create new review object
      const newReview = {
        id: Date.now(),
        user: {
          name: user.name,
          avatar: user.name.charAt(0),
        },
        rating,
        content: review,
        images: images.map((img) => URL.createObjectURL(img)),
        createdAt: new Date().toISOString(),
        verified: true,
      };

      await onSubmit(newReview);

      // Reset form
      setRating(0);
      setReview("");
      setImages([]);
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(t("hospitalDetail.modal.writeReview.errors.submitError"));
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert(t("hospitalDetail.modal.writeReview.errors.maxImages"));
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageClick = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
      }
    };
    input.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {t("hospitalDetail.modal.writeReview.title")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Rating Stars */}
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

          {/* Review Text */}
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

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("hospitalDetail.modal.writeReview.addPhotos")}
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="review-images"
              disabled={images.length >= 5}
            />
            <label
              htmlFor="review-images"
              className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500"
            >
              {t("hospitalDetail.modal.writeReview.uploadPhotos")}
            </label>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
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
              disabled={loading || rating === 0}
            >
              {loading
                ? t("hospitalDetail.modal.writeReview.submitting")
                : t("hospitalDetail.modal.writeReview.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteReviewModal;
