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
  const [errors, setErrors] = useState({});

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
      if (file.size > 3 * 1024 * 1024) {
        alert("File size should be less than 3MB");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate caption
    if (!content.trim()) {
      errors.content = 'Tiêu đề bài viết là bắt buộc';
    } else if (content.length < 5) {
      errors.content = 'Tiêu đề phải có ít nhất 5 ký tự';
    } else if (content.length > 200) {
      errors.content = 'Tiêu đề không được vượt quá 200 ký tự';
    }

    // Validate description
    if (description.length > 1000) {
      errors.description = 'Mô tả không được vượt quá 1000 ký tự';
    }

    // Validate pet type
    if (!petType) {
      errors.petType = 'Vui lòng chọn loại thú cưng';
    }
    // validate image
    if (!image) {
      errors.image = 'Ảnh là bắt buộc';
    }
    
    // Validate tags
    if (!tags.trim()) {
      errors.tags = 'Tags là bắt buộc';
    } else {
      const tagArray = tags.split(',').map(tag => tag.trim());
      if (tagArray.length > 5) {
        errors.tags = 'Không được thêm quá 5 tags';
      }
      if (tagArray.some(tag => tag.length > 20)) {
        errors.tags = 'Mỗi tag không được vượt quá 20 ký tự';
      }
    }

    // Validate image
    if (image) {
      if (image.size > 5 * 1024 * 1024) {
        errors.image = 'Kích thước ảnh không được vượt quá 5MB';
      }
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(image.type)) {
        errors.image = 'Chỉ chấp nhận file ảnh định dạng JPG, PNG hoặc GIF';
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      // Hiển thị lỗi đầu tiên
      const firstError = Object.values(validationErrors)[0];
      alert(firstError);
      return;
    }

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

        {/* Notice about moderation */}
        <div className="px-4 py-3 bg-blue-50 text-blue-800 text-sm">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Bài viết của bạn sẽ được hiển thị sau khi được quản trị viên phê duyệt
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Caption */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề *
              </label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập tiêu đề bài viết..."
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9] ${
                  errors?.content ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
                required
              />
              {errors?.content && (
                <p className="mt-1 text-sm text-red-500">{errors.content}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả chi tiết
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Thêm mô tả chi tiết..."
                className={`w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#98E9E9] ${
                  errors?.description ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors?.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {description.length}/1000 ký tự
              </p>
            </div>

            {/* Pet Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loại thú cưng *
              </label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9] ${
                  errors?.petType ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
                required
              >
                <option value="">Chọn loại thú cưng</option>
                <option value="DOG">Chó</option>
                <option value="CAT">Mèo</option>
                <option value="BIRD">Chim</option>
                <option value="OTHER">Khác</option>
              </select>
              {errors?.petType && (
                <p className="mt-1 text-sm text-red-500">{errors.petType}</p>
              )}
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
                placeholder="Thêm tags (phân cách bằng dấu phẩy)"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9] ${
                  errors?.tags ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
                required
              />
              {errors?.tags && (
                <p className="mt-1 text-sm text-red-500">{errors.tags}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Ví dụ: cute, pet, cat (Tối đa 5 tags)
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
            {errors?.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
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
            className={`px-6 py-2 bg-[#1A3C8E] text-white rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              loading ? 'cursor-wait' : ''
            }`}
            disabled={loading || !content.trim() || !petType || !tags.trim()}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang đăng...
              </div>
            ) : (
              'Đăng bài'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
