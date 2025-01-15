import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeft, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const WriteBlog = () => {
  const { id } = useParams(); // Lấy id từ URL nếu là edit draft
  const navigate = useNavigate();

  // Giữ nguyên state và UI cũ
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Mock data cho drafts
  const mockDrafts = {
    1: {
      id: 1,
      title: "Essential Vaccinations for Puppies",
      content: "Draft content here...",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      status: "draft"
    }
  };

  // Load draft content nếu đang edit
  useEffect(() => {
    if (id) {
      // Trong thực tế sẽ gọi API để lấy draft
      const draftContent = mockDrafts[id];
      if (draftContent) {
        setTitle(draftContent.title);
        setContent(draftContent.content);
        setPreviewImage(draftContent.image);
      }
    }
  }, [id]);

  // Giữ nguyên các hàm xử lý UI cũ
  const handleImageChange = (e) => {
    // ... code cũ
  };

  // Thêm xử lý cho nút Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const blogData = {
        title,
        content,
        image: previewImage,
        status: id ? "draft" : "published", // Nếu có id thì là draft, không thì là publish
        ...(id ? {} : { publishDate: new Date().toISOString() })
      };

      // API call để lưu blog
      // const response = await saveBlog(blogData);
      
      console.log("Blog saved:", blogData);
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  // Giữ nguyên phần return UI cũ
  return (
    <div className="min-h-screen bg-gray-50">
      {showLeaveModal && <LeaveModal />}

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => handleNavigate("/bloglist")}
                className="text-gray-600 hover:text-gray-900 -ml-2"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <input
                type="text"
                placeholder="Title"
                className="text-lg md:text-xl font-medium focus:outline-none placeholder:text-gray-400 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
              className="ml-4 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] text-sm md:text-base whitespace-nowrap"
            >
              PUBLISH
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Column */}
          <div className="bg-white rounded-lg shadow-sm">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Write your content here"
              className="h-[calc(100vh-200px)] md:h-[calc(100vh-180px)] overflow-y-auto"
            />
          </div>

          {/* Preview Column - Hide on mobile, show on desktop */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm p-6">
            <div className="prose max-w-none">
              <h1 className="text-2xl font-bold mb-4">
                {title || "Your Title"}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    content || "<p>The article content will appear here...</p>",
                }}
              />
            </div>
          </div>

          {/* Preview Button - Show only on mobile */}
          <button
            onClick={() => setShowPreview(true)}
            className="lg:hidden fixed bottom-4 right-4 px-4 py-2 bg-white shadow-lg rounded-lg text-gray-700 border"
          >
            Preview
          </button>
        </div>
      </div>

      {/* Preview Modal for Mobile */}
      {showPreview && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto lg:hidden">
          <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
            <h2 className="font-semibold">Preview</h2>
            <button
              onClick={() => setShowPreview(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4">
            <div className="prose max-w-none">
              <h1 className="text-2xl font-bold mb-4">
                {title || "Your Title"}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    content || "<p>The article content will appear here...</p>",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteBlog;
