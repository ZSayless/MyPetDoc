import { useState, useEffect } from "react";
import { X, Image } from "lucide-react";
import { useTranslation } from "react-i18next";

function CreatePostModal({ isOpen, onClose, onPost }) {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const resetForm = () => {
    setContent("");
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
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      const postData = {
        content,
        image: image ? await convertToBase64(image) : null,
      };

      const success = await onPost(postData);
      if (success) {
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error("Error creating post:", error);
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
      <div className="bg-white rounded-xl w-full max-w-xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
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

        <form onSubmit={handleSubmit} className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("community.createPost.placeholder")}
            className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
            disabled={loading}
          />

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

          <div className="flex items-center justify-between mt-4">
            <label className="cursor-pointer text-gray-600 hover:text-[#1A3C8E]">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={loading}
              />
              <Image className="w-6 h-6" />
            </label>

            <button
              type="submit"
              className="px-6 py-2 bg-[#1A3C8E] text-white rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors disabled:opacity-50"
              disabled={loading || !content.trim() || !preview}
            >
              {loading
                ? t("community.createPost.posting")
                : t("community.createPost.post")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostModal;
