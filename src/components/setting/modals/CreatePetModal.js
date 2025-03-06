import { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "../../../context/ToastContext";
import { petService } from "../../../services/petService";

function CreatePetModal({ isOpen, onClose, onSuccess }) {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const PET_TYPES = [
    { value: "DOG", label: t("setting.personal.pet.types.dog") },
    { value: "CAT", label: t("setting.personal.pet.types.cat") },
    { value: "BIRD", label: t("setting.personal.pet.types.bird") },
    { value: "FISH", label: t("setting.personal.pet.types.fish") },
    { value: "REPTILE", label: t("setting.personal.pet.types.reptile") },
    { value: "RABBIT", label: t("setting.personal.pet.types.rabbit") },
    { value: "OTHER", label: t("setting.personal.pet.types.other") },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        addToast({
          type: "error",
          message: t("setting.personal.pet.fileSizeError")
        });
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!type) {
      errors.type = t("setting.personal.pet.noPetType");
    }

    if (age && (isNaN(age) || age < 0 || age > 100)) {
      errors.age = t("setting.personal.pet.invalidAge");
    }

    if (!image) {
      errors.image = t("setting.personal.pet.noPetPhoto");
    }

    if (notes && (notes.length > 300 || notes.length < 10)) {
      errors.notes = t("setting.personal.pet.invalidNotes");
    }

    // Hiển thị toast cho mỗi lỗi
    Object.values(errors).forEach(error => {
      addToast({
        type: "error",
        message: error
      });
    });

    return Object.keys(errors).length === 0; // Trả về true nếu không có lỗi, false nếu có lỗi
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) { // Kiểm tra kết quả của validateForm
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("pet_type", type);
      if (age) formData.append("pet_age", age);
      if (notes) formData.append("pet_notes", notes);
      if (image) formData.append("pet_photo", image);

      const response = await petService.createPet(formData);
      
      addToast({
        type: "success",
        message: t("setting.personal.pet.success")
      });

      if (onSuccess) {
        onSuccess(response.data);
      }
      onClose();
    } catch (error) {
      console.error("Error creating pet:", error);
      addToast({
        type: "error",
        message: error.response?.data?.message || t("setting.personal.pet.error")
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t("setting.personal.pet.addNew")}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pet Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("setting.personal.pet.type")} <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PET_TYPES.map((petType) => (
                    <button
                      key={petType.value}
                      type="button"
                      onClick={() => setType(petType.value)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        type === petType.value
                          ? "bg-[#98E9E9] text-[#1A3C8E] font-medium"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {petType.label}
                    </button>
                  ))}
                </div>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                )}
              </div>

              {/* Pet Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("setting.personal.pet.age")}
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring-[#98E9E9] sm:text-sm"
                  min="0"
                  max="100"
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                )}
              </div>

              {/* Pet Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("setting.personal.pet.notes")}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#98E9E9] focus:ring-[#98E9E9] sm:text-sm"
                  maxLength="500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {notes.length}/500 {t("setting.personal.pet.characters")}
                </p>
                {errors.notes && (
                  <p className="mt-1 text-sm text-red-500">{errors.notes}</p>
                )}
              </div>

              {/* Pet Photo */}
              {previewUrl ? (
                <div className="relative mt-4">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setPreviewUrl("");
                    }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("setting.personal.pet.photo")}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-[#1A3C8E] hover:text-[#98E9E9]">
                          <span>{t("setting.personal.pet.uploadPhoto")}</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        {t("setting.personal.pet.photoTypes")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !type}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#1A3C8E] text-base font-medium text-white hover:bg-[#98E9E9] hover:text-[#1A3C8E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#98E9E9] sm:ml-3 sm:w-auto sm:text-sm ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? t("setting.personal.pet.creating") : t("setting.personal.pet.submit")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {t("setting.personal.pet.cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePetModal; 