import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
  ];

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in the title and content completely.");
      return;
    }

    try {
      // TODO: Call API to save blog
      alert("Xuất bản bài viết thành công!");
      navigate("/bloglist");
    } catch (error) {
      alert("Có lỗi xảy ra khi xuất bản bài viết");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center gap-4 flex-1">
              <Link
                to="/bloglist"
                className="text-gray-600 hover:text-gray-900 -ml-2"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
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
            onClick={() => {
              // Handle preview on mobile
              // You could show a modal or navigate to a preview page
            }}
            className="lg:hidden fixed bottom-4 right-4 px-4 py-2 bg-white shadow-lg rounded-lg text-gray-700 border"
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
