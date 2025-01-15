import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const WriteBlog = () => {
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draft");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Mock data cho drafts (sau này sẽ thay bằng API)
  const mockDrafts = {
    1: {
      id: 1,
      title: "Essential Vaccinations for Puppies",
      content: "Draft content here...",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      status: "draft"
    }
  };

  // Load draft content nếu có
  useEffect(() => {
    if (draftId) {
      // Trong thực tế sẽ gọi API để lấy draft
      const draftContent = mockDrafts[draftId];
      if (draftContent) {
        setTitle(draftContent.title);
        setContent(draftContent.content);
        setPreviewImage(draftContent.image);
      }
    }
  }, [draftId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsImageModalOpen(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const blogData = {
        title,
        content,
        image: previewImage,
        status: "draft"
      };
      
      // API call để lưu draft
      // const response = await saveDraft(blogData);
      
      // Mock success
      console.log("Draft saved:", blogData);
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handlePublish = async () => {
    try {
      const blogData = {
        title,
        content,
        image: previewImage,
        status: "published",
        publishDate: new Date().toISOString()
      };
      
      // API call để publish
      // const response = await publishBlog(blogData);
      
      // Mock success
      console.log("Blog published:", blogData);
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {draftId ? "Edit Draft" : "Write New Blog"}
            </h1>
            <div className="flex gap-3">
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Save as Draft
              </button>
              <button
                onClick={handlePublish}
                className="px-4 py-2 text-gray-700 bg-[#98E9E9] rounded-lg hover:bg-[#7CD5D5]"
              >
                Publish
              </button>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <div
              className="w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
              onClick={() => setIsImageModalOpen(true)}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <div className="text-gray-400 mb-2">Click to add cover image</div>
                  <div className="text-sm text-gray-400">
                    Recommended size: 1200x600px
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full text-3xl font-bold mb-6 px-0 border-0 focus:ring-0 placeholder-gray-400"
          />

          {/* Content Editor */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            className="w-full min-h-[400px] px-0 border-0 focus:ring-0 resize-none placeholder-gray-400"
          />
        </div>
      </div>

      {/* Image Upload Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Cover Image</h2>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteBlog;
