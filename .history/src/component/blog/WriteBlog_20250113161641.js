import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeft, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [nextPath, setNextPath] = useState(null);
  const navigate = useNavigate();

  // Theo dõi thay đổi của form
  useEffect(() => {
    if (title.trim() || content.trim()) {
      setIsDirty(true);
    }
  }, [title, content]);

  // Xử lý khi user muốn rời trang
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "Changes you made may not be saved.";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleNavigate = (path) => {
    if (isDirty) {
      setNextPath(path);
      setShowLeaveModal(true);
    } else {
      navigate(path);
    }
  };

  const LeaveModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">Leave without saving?</h3>
        <p className="text-gray-600 mb-6">
          You have unsaved changes. Are you sure you want to leave? Your changes
          will be lost.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setShowLeaveModal(false)}
          >
            Stay
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => {
              setShowLeaveModal(false);
              setIsDirty(false);
              navigate(nextPath);
            }}
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );

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
