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
      alert("Please login to submit a review");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating");
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
      alert("Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert("You can only upload up to 5 images");
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageClick = (index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
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
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{t("hospitalDetail.modal.writeReview.title")}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">{t("hospitalDetail.modal.writeReview.rating")}</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      star <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">{t("hospitalDetail.modal.writeReview.review")}</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows={4}
                placeholder={t("hospitalDetail.modal.writeReview.reviewPlaceholder")}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2">{t("hospitalDetail.modal.writeReview.addPhotos")}</label>
              <div className="grid grid-cols-5 gap-2">
                {/* Image preview slots */}
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    onClick={() => handleImageClick(index)}
                  >
                    {images[index] ? (
                      <img
                        src={URL.createObjectURL(images[index])}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">{t("hospitalDetail.modal.writeReview.uploadPhotos")}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

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
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={loading || rating === 0}
              >
                {loading ? t("hospitalDetail.modal.writeReview.submitting") : t("hospitalDetail.modal.writeReview.submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WriteReviewModal;
