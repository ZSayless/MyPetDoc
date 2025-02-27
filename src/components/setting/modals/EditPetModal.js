import { LoaderIcon, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { updateInfo } from "../../../services/authService";

function EditPetModal({ isOpen, onClose, userDetails, onSuccess }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    pet_type: "",
    pet_age: "",
    pet_notes: ""
  });

  const PET_TYPES = [
    'DOG',
    'CAT', 
    'BIRD',
    'RABBIT',
    'FISH',
    'HAMSTER',
    'REPTILE',
    'OTHER'
  ];

  useEffect(() => {
    if (userDetails) {
      setFormData({
        pet_type: userDetails.pet_type || "",
        pet_age: userDetails.pet_age || "",
        pet_notes: userDetails.pet_notes || ""
      });
    }
  }, [userDetails]);

  useEffect(() => {
    if (!isOpen) {
      setPreview(null);
      setSelectedFile(null);
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const validateForm = () => {
    const newErrors = {};

    // Validate pet age
    if (formData.pet_age) {
      // Kiểm tra nếu có giá trị thì phải là số
      if (isNaN(formData.pet_age)) {
        newErrors.pet_age = t("setting.modal.editPet.errors.ageInvalid");
      } else {
        const age = Number(formData.pet_age);
        if (age < 0 || age > 100) {
          newErrors.pet_age = t("setting.modal.editPet.errors.ageRange");
        }
      }
    }

    // Validate pet notes
    if (formData.pet_notes && formData.pet_notes.length > 500) {
      newErrors.pet_notes = t("setting.modal.editPet.errors.notesTooLong");
    }

    // Validate file
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        newErrors.pet_photo = t("setting.modal.editPet.errors.fileSizeError");
      }
      if (!selectedFile.type.startsWith("image/")) {
        newErrors.pet_photo = t("setting.modal.editPet.errors.fileTypeError");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Xóa lỗi khi người dùng bắt đầu sửa
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      // Xóa lỗi khi người dùng chọn file mới
      if (errors.pet_photo) {
        setErrors(prev => ({
          ...prev,
          pet_photo: ""
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = new FormData();
    
    // Thêm các trường thông tin
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    // Thêm ảnh nếu có
    if (selectedFile) {
      submitData.append('pet_photo', selectedFile);
    }

    try {
      setIsLoading(true);
      await updateInfo(submitData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating pet info:", error);
      setErrors(prev => ({
        ...prev,
        submit: t("setting.modal.editPet.errors.updateError")
      }));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold mb-2">
              {t("setting.modal.editPet.title")}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            {t("setting.modal.editPet.description")}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Pet Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("setting.personal.pet.type")} <span className="text-red-500">*</span>
                </label>
                <select
                  name="pet_type"
                  value={formData.pet_type}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.pet_type ? "border-red-500" : "border-gray-200"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white`}
                >
                  <option value="">
                    {t("setting.modal.editPet.selectType")}
                  </option>
                  {PET_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {t(`setting.modal.editPet.petTypes.${type.toLowerCase()}`)}
                    </option>
                  ))}
                </select>
                {errors.pet_type && (
                  <p className="text-red-500 text-sm mt-1">{errors.pet_type}</p>
                )}
              </div>

              {/* Pet Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("setting.personal.pet.age")}
                </label>
                <input
                  type="text"
                  name="pet_age"
                  value={formData.pet_age}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.pet_age ? "border-red-500" : "border-gray-200"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400`}
                  placeholder={t("setting.modal.editPet.agePlaceholder")}
                />
                {errors.pet_age && (
                  <p className="text-red-500 text-sm mt-1">{errors.pet_age}</p>
                )}
              </div>

              {/* Pet Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("setting.personal.pet.photo")}
                </label>
                <div className={`border-2 border-dashed ${
                  errors.pet_photo ? "border-red-500" : "border-gray-200"
                } rounded-xl p-4`}>
                  {preview || userDetails?.pet_photo ? (
                    <div className="mb-4">
                      <img
                        src={preview || userDetails.pet_photo}
                        alt="Pet preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                    </div>
                  ) : null}
                  <input
                    type="file"
                    id="pet-photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="pet-photo"
                    className="cursor-pointer text-blue-500 hover:text-blue-600 block text-center"
                  >
                    {t("setting.modal.editPet.uploadPhoto")}
                  </label>
                </div>
                {errors.pet_photo && (
                  <p className="text-red-500 text-sm mt-1">{errors.pet_photo}</p>
                )}
              </div>

              {/* Pet Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("setting.personal.pet.notes")}
                </label>
                <textarea
                  name="pet_notes"
                  value={formData.pet_notes}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 border ${
                    errors.pet_notes ? "border-red-500" : "border-gray-200"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400`}
                  placeholder={t("setting.modal.editPet.notesPlaceholder")}
                />
                {errors.pet_notes && (
                  <p className="text-red-500 text-sm mt-1">{errors.pet_notes}</p>
                )}
              </div>

              {errors.submit && (
                <p className="text-red-500 text-sm mt-2">{errors.submit}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                {t("setting.modal.editPet.cancel")}
              </button>
              <button
                disabled={isLoading}
                type="submit"
                className="px-6 py-3 bg-[#98E9E9] text-gray-700 rounded-xl hover:bg-[#7CD5D5]"
              >
                {isLoading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  t("setting.modal.editPet.save")
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPetModal; 