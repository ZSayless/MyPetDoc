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
  const [intendedPath, setIntendedPath] = useState(null);
  const navigate = useNavigate();

  // Theo dõi thay đổi của form
  useEffect(() => {
    if (title || content) {
      setIsDirty(true);
    }
  }, [title, content]);

  // Xử lý khi user muốn rời trang
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        const message = "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Modal xác nhận rời trang
  const LeaveConfirmModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Leave this page?</h3>
        <p className="text-gray-600 mb-6">
          You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setShowLeaveModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => {
              setShowLeaveModal(false);
              setIsDirty(false);
              if (intendedPath) {
                navigate(intendedPath);
              }
            }}
          >
            Leave Page
          </button>
        </div>
      </div>
    </div>
  );

  // Xử lý khi user click vào các link navigation
  const handleNavigation = (path) => {
    if (isDirty) {
      setIntendedPath(path);
      setShowLeaveModal(true);
    } else {
      navigate(path);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {showLeaveModal && <LeaveConfirmModal />}

      {/* Back Button */}
      <div className="container mx-auto px-4 mb-6">
        <button
          onClick={() => handleNavigation("/bloglist")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blogs
        </button>
      </div>

      {/* Rest of your component... */}
      <div className="container mx-auto px-4">
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 text-2xl font-bold border-none focus:outline-none bg-transparent"
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          className="bg-white rounded-lg"
          modules={modules}
        />
      </div>
    </div>
  );
};

export default WriteBlog;
