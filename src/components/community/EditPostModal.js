import { useState, useEffect } from "react";
import { X, Image } from "lucide-react";
import { useDispatch } from "react-redux";
import { communityService } from "../../services/communityService";

function EditPostModal({ isOpen, onClose, post }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setContent(post.description || "");
      setImageUrl(post.image || "");
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      // Tạm thời chỉ log ra console
      console.log("Updating post:", {
        content,
        image: image || imageUrl,
      });

      // Khi có API:
      // const formData = new FormData();
      // formData.append("content", content);
      // if (image) {
      //   formData.append("image", image);
      // }
      // if (imageUrl) {
      //   formData.append("imageUrl", imageUrl);
      // }
      // await communityService.updatePost(post.id, formData);

      onClose();
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!post) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl w-full max-w-xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Edit Post</h2>
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
            placeholder="Share your pet story..."
            className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
            disabled={loading}
          />

          {(image || imageUrl) && (
            <div className="relative mt-4">
              <img
                src={image ? URL.createObjectURL(image) : imageUrl}
                alt="Preview"
                className="w-full rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setImageUrl("");
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
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setImageUrl("");
                }}
                disabled={loading}
              />
              <Image className="w-6 h-6" />
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border rounded-full hover:bg-gray-100"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#1A3C8E] text-white rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors disabled:opacity-50"
                disabled={loading || !content.trim()}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPostModal;
