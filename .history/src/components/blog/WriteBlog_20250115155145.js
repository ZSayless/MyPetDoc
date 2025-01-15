import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draft");
  const navigate = useNavigate();
  
  // State cho form
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image: "",
    excerpt: "",
    status: "draft"
  });

  // Mock data cho drafts (sau này sẽ thay bằng API)
  const mockDrafts = {
    1: {
      id: 1,
      title: "Essential Vaccinations for Puppies",
      content: "Draft content here...",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      excerpt: "A comprehensive guide to understanding the vaccination schedule...",
      status: "draft"
    }
    // Thêm các draft khác...
  };

  // Load draft content nếu có
  useEffect(() => {
    if (draftId) {
      // Trong thực tế sẽ gọi API để lấy draft
      const draftContent = mockDrafts[draftId];
      if (draftContent) {
        setBlogData(draftContent);
      }
    }
  }, [draftId]);

  // Hàm xử lý lưu draft
  const handleSaveDraft = async () => {
    try {
      // API call để lưu draft
      // const response = await saveDraft(blogData);
      
      // Mock success
      console.log("Draft saved:", blogData);
      // Redirect về trang My Blogs sau khi lưu
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  // Hàm xử lý publish blog
  const handlePublish = async () => {
    try {
      const dataToPublish = {
        ...blogData,
        status: "published",
        publishDate: new Date().toISOString()
      };
      // API call để publish
      // const response = await publishBlog(dataToPublish);
      
      // Mock success
      console.log("Blog published:", dataToPublish);
      // Redirect về trang My Blogs sau khi publish
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
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

            {/* Form fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={blogData.title}
                  onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#98E9E9] focus:border-transparent"
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={blogData.content}
                  onChange={(e) => setBlogData({...blogData, content: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#98E9E9] focus:border-transparent h-64"
                  placeholder="Write your blog content here..."
                />
              </div>

              {/* Thêm các field khác như image upload, excerpt, etc. */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
