import { useState } from "react";
import { X, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";

const UploadPhotoModal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !title) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);

      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{t("hospitalDetail.modal.uploadPhoto.title")}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">{t("hospitalDetail.modal.uploadPhoto.photoTitle")}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder={t("hospitalDetail.modal.uploadPhoto.titlePlaceholder")}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2">{t("hospitalDetail.modal.uploadPhoto.selectPhoto")}</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="photo-upload"
                required
              />
              <label
                htmlFor="photo-upload"
                className="block w-full aspect-video border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 flex items-center justify-center"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto mb-2" />
                    <span>{t("hospitalDetail.modal.uploadPhoto.uploadPhotos")}</span>
                  </div>
                )}
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                {t("hospitalDetail.modal.uploadPhoto.cancel")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading 
                  ? t("hospitalDetail.modal.uploadPhoto.uploading")
                  : t("hospitalDetail.modal.uploadPhoto.upload")
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPhotoModal;
