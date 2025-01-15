import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeft, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const WriteBlog = () => {
  const { id } = useParams(); // Thêm để lấy id từ URL
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [nextPath, setNextPath] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Mock data cho drafts
  const mockDrafts = {
    1: {
      id: 1,
      title: "Essential Vaccinations for Puppies",
      content: "Draft content here...",
      status: "draft"
    }
  };

  // Load draft content nếu đang edit
  useEffect(() => {
    if (id) {
      const draftContent = mockDrafts[id];
      if (draftContent) {
        setTitle(draftContent.title);
        setContent(draftContent.content);
      }
    }
  }, [id]);

  // Giữ nguyên code cũ
  useEffect(() => {
    if (title.trim() || content.trim()) {
      setIsDirty(true);
    }
  }, [title, content]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (isDirty) {
        event.preventDefault();
        setNextPath("/bloglist");
        setShowLeaveModal(true);
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty]);

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
            onClick={() => {
              setShowLeaveModal(false);
              window.history.pushState(null, "", window.location.pathname);
            }}
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

  // Sửa lại handleSubmit để xử lý cả draft và publish
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in the title and content completely.");
      return;
    }

    try {
      const blogData = {
        title,
        content,
        status: id ? "draft" : "published",
        ...(id ? {} : { publishDate: new Date().toISOString() })
      };

      // TODO: Call API to save blog
      console.log("Blog saved:", blogData);
      
      alert(id ? "Draft updated successfully!" : "Blog published successfully!");
      navigate("/my-blogs");
    } catch (error) {
      alert("Error occurred while saving the blog");
    }
  };

  // Giữ nguyên phần return UI
  return (
    <div className="min-h-screen bg-gray-50">
      {showLeaveModal && <LeaveModal />}
      {/* Rest of the UI code remains exactly the same */}
    </div>
  );
};

export default WriteBlog;
