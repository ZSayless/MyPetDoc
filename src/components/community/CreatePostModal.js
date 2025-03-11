import { useState, useEffect } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { communityService } from "../../services/communityService";
import { useToast } from "../../context/ToastContext";

function CreatePostModal({ isOpen, onClose, onPost }) {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPetType, setSelectedPetType] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [postingStatus, setPostingStatus] = useState('idle');

  const resetForm = () => {
    setCaption("");
    setDescription("");
    setSelectedPetType("");
    setSelectedTags([]);
    setImage(null);
    setPreviewUrl("");
    setErrors({});
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        addToast({
          type: "error",
          message: t("community.post.imageSizeError")
        });
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePetTypeSelect = (type) => {
    setSelectedPetType(type);
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        if (prev.length >= 10) {
          addToast({
            type: "warning",
            message: t("community.post.maxTagsReached")
          });
          return prev;
        }
        return [...prev, tag];
      }
    });
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate caption
    if (!caption.trim()) {
      errors.caption = t("community.post.captionRequired");
    } else if (caption.trim().length < 10) {
      errors.caption = t("community.post.captionMinLength", { min: 10 });
    } else if (caption.trim().length > 100) {
      errors.caption = t("community.post.captionMaxLength", { max: 100 });
    }

    // Validate description
    if (!description.trim()) {
      errors.description = t("community.post.descriptionRequired");
    } else if (description.trim().length < 10) {
      errors.description = t("community.post.descriptionMinLength", { min: 10 });
    } else if (description.trim().length > 1000) {
      errors.description = t("community.post.descriptionMaxLength", { max: 1000 });
    }

    // Validate pet type
    if (!selectedPetType) {
      errors.petType = t("community.post.petTypeRequired");
    }

    // Validate tags
    if (selectedTags.length === 0) {
      errors.tags = t("community.post.tagsRequired");
    } else if (selectedTags.length > 10) {
      errors.tags = t("community.post.maxTagsExceeded", { max: 10 });
    }

    // Validate image
    if (!image) {
      errors.image = t("community.post.imageRequired");
    } else {
      // Check image size (max 10MB)
      if (image.size > 10 * 1024 * 1024) {
        errors.image = t("community.post.imageSizeError", { max: "10MB" });
      }

      // Check image type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(image.type)) {
        errors.image = t("community.post.imageTypeError");
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      const firstError = Object.values(formErrors)[0];
      addToast({
        type: "error",
        message: firstError
      });
      return;
    }

    try {
      setLoading(true);
      setPostingStatus('uploading');
      const formData = new FormData();
      formData.append("caption", caption.trim());
      formData.append("description", description.trim());
      formData.append("pet_type", selectedPetType);
      formData.append("tags", selectedTags.join(','));
      if (image) {
        formData.append("image", image);
      }

      setPostingStatus('processing');
      const success = await onPost(formData);
      if (success) {
        setPostingStatus('success');
        addToast({
          type: "success",
          message: t("community.post.createSuccess")
        });
        setTimeout(() => {
          resetForm();
          onClose();
          setPostingStatus('idle');
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setPostingStatus('error');
      addToast({
        type: "error",
        message: error.response?.data?.message || t("community.post.createError")
      });
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật nút Submit để kiểm tra tất cả điều kiện
  const isFormValid = 
    caption.trim().length >= 10 &&
    caption.trim().length <= 200 &&
    description.trim().length >= 30 &&
    description.trim().length <= 1000 &&
    selectedPetType &&
    selectedTags.length > 0 &&
    selectedTags.length <= 10 &&
    image &&
    !loading;

  const PET_TYPES = [
    {value: "DOG", label: t("community.petTypes.dog")},
    {value: "CAT", label: t("community.petTypes.cat")},
    {value: "BIRD", label: t("community.petTypes.bird")},
    {value: "FISH", label: t("community.petTypes.fish")},
    {value: "REPTILE", label: t("community.petTypes.reptile")},
    {value: "RABBIT", label: t("community.petTypes.rabbit")},
    {value: "HAMSTER", label: t("community.petTypes.hamster")},
    {value: "OTHER", label: t("community.petTypes.other")},
  ];

  const AVAILABLE_TAGS = [
    { value: "healthTips", label: t("community.tags.healthTips") },
    { value: "petCare", label: t("community.tags.petCare") },
    { value: "nutrition", label: t("community.tags.nutrition") },
    { value: "behavior", label: t("community.tags.behavior") },
    { value: "training", label: t("community.tags.training") },
    { value: "grooming", label: t("community.tags.grooming") },
    { value: "vaccination", label: t("community.tags.vaccination") },
    { value: "diseasePrevention", label: t("community.tags.diseasePrevention") },
    { value: "firstAid", label: t("community.tags.firstAid") },
    { value: "mentalHealth", label: t("community.tags.mentalHealth") },
    { value: "exercise", label: t("community.tags.exercise") },
    { value: "breeding", label: t("community.tags.breeding") },
    { value: "seniorPetCare", label: t("community.tags.seniorPetCare") },
    { value: "puppyCare", label: t("community.tags.puppyCare") },
    { value: "emergencyCare", label: t("community.tags.emergencyCare") },
    { value: "cute", label: t("community.tags.cute") }
  ];

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl w-full max-w-xl mx-4 flex flex-col max-h-[90vh]">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {t("community.createPost.title")}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 py-3 bg-blue-50 text-blue-800 text-sm">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {t("community.createPost.approvalNotice")}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("community.createPost.subtitle")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={t("community.createPost.subtitlePlaceholder")}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9] ${
                  errors?.caption ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
                required
              />
              {errors?.caption && (
                <p className="mt-1 text-sm text-red-500">{errors.caption}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("community.createPost.description")} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("community.createPost.descriptionPlaceholder")}
                className={`w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#98E9E9] ${
                  errors?.description ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors?.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {description.length}/{t("community.createPost.descriptionMaxLength")} {t("community.createPost.characters")}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("community.createPost.petType")} <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {PET_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setSelectedPetType(type.value)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedPetType === type.value
                        ? "bg-[#98E9E9] text-[#1A3C8E] font-medium"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags <span className="text-red-500">*</span> ({selectedTags.length}/10)
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map((tag) => (
                  <button
                    key={tag.value}
                    type="button"
                    onClick={() => handleTagToggle(tag.value)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag.value)
                        ? "bg-[#98E9E9] text-[#1A3C8E] font-medium"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
              {errors?.tags && (
                <p className="mt-1 text-sm text-red-500">{errors.tags}</p>
              )}
            </div>

            {previewUrl ? (
              <div className="relative mt-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setPreviewUrl("");
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("community.createPost.image")} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="post-image-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading}
                  />
                  <label
                    htmlFor="post-image-input"
                    className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200 py-8"
                  >
                    <div className="flex flex-col items-center justify-center px-4">
                      <div className="mb-3">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      </div>
                      <p className="mb-2 text-blue-600 font-medium">
                        {t("community.createPost.uploadImage")}
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG ({t("community.createPost.maxSize")})
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}
            {errors?.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </form>
        </div>

        <div className="p-4 border-t flex items-center justify-between bg-white">
          <button
            type="button"
            onClick={handleSubmit}
            className={`px-6 py-2 bg-[#1A3C8E] text-white rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              loading ? 'cursor-wait' : ''
            }`}
            disabled={!isFormValid}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t("community.post.posting")}
              </div>
            ) : (
              t("community.post.submit")
            )}
          </button>
        </div>

        {postingStatus !== 'idle' && (
          <div className={`px-4 py-2 text-sm ${
            postingStatus === 'error' ? 'bg-red-50 text-red-700' :
            postingStatus === 'success' ? 'bg-green-50 text-green-700' :
            'bg-blue-50 text-blue-700'
          }`}>
            {postingStatus === 'uploading' && t("community.post.uploading")}
            {postingStatus === 'processing' && t("community.post.processing")}
            {postingStatus === 'success' && t("community.post.postSuccess")}
            {postingStatus === 'error' && t("community.post.postError")}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePostModal;
