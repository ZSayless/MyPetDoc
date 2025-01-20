import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

function EditAvatarModal({ isOpen, onClose, currentAvatar, onSubmit }) {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setPreview(null);
      setSelectedFile(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      try {
        await onSubmit(selectedFile);
        onClose();
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(t("setting.modal.editAvatar.fileSizeError"));
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert(t("setting.modal.editAvatar.fileTypeError"));
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold mb-2">
              {t("setting.modal.editAvatar.title")}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            {t("setting.modal.editAvatar.description")}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  {currentAvatar?.startsWith("data:image") ? (
                    <img
                      src={preview || currentAvatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-600 flex items-center justify-center text-white text-3xl">
                      {currentAvatar}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                >
                  <span className="text-blue-500 font-medium cursor-pointer">
                    {t("setting.modal.editAvatar.uploadTitle")}
                  </span>{" "}
                  {t("setting.modal.editAvatar.dragDropText")}
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                {t("setting.modal.editAvatar.cancel")}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#98E9E9] text-gray-700 rounded-xl hover:bg-[#7CD5D5]"
              >
                {t("setting.modal.editAvatar.save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAvatarModal;
