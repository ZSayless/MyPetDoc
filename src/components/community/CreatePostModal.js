import { useState, useEffect } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { communityService } from "../../services/communityService";

function CreatePostModal({ isOpen, onClose, onPost }) {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [petType, setPetType] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

  const resetForm = () => {
    setContent("");
    setDescription("");
    setPetType("");
    setTags("");
    setImage(null);
    setPreview("");
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("File size should be less than 3MB");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !petType || !tags.trim()) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('caption', content.trim());
      formData.append('description', description.trim());
      formData.append('pet_type', petType);
      formData.append('tags', tags.trim());
      if (image) {
        formData.append('image', image);
      }

      const success = await onPost(formData);
      
      if (success) {
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert(error.response?.data?.message || t("createPost.submitError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl w-full max-w-xl mx-4 flex flex-col max-h-[90vh]">
        {/* Header */}
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Caption */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caption *
              </label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a caption..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
                disabled={loading}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a detailed description..."
                className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
                disabled={loading}
              />
            </div>

            {/* Pet Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pet Type *
              </label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
                disabled={loading}
                required
              >
                <option value="">Select pet type</option>
                <option value="DOG">Dog</option>
                <option value="CAT">Cat</option>
                <option value="BIRD">Bird</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags *
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add tags (comma separated)"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
                disabled={loading}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Example: cute, pet, cat (Required)
              </p>
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="relative mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setPreview("");
                  }}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-between bg-white">
          <label className="cursor-pointer text-gray-600 hover:text-[#1A3C8E]">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={loading}
            />
            <ImageIcon className="w-6 h-6" />
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#1A3C8E] text-white rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors disabled:opacity-50"
            disabled={loading || !content.trim() || !petType || !tags.trim()}
          >
            {loading
              ? t("community.createPost.posting")
              : t("community.createPost.post")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
