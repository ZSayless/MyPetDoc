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
      status: "draft",
    },
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

  // Giữ nguyên toàn bộ code cũ
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
  const handleSubmit = async (status) => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in the title and content completely.");
      return;
    }

    try {
      const blogData = {
        title,
        content,
        status,
        ...(status === "published" && {
          publishDate: new Date().toISOString(),
        }),
      };

      // TODO: Call API to save blog
      console.log("Blog saved:", blogData);

      alert(
        status === "draft"
          ? "Draft saved successfully!"
          : "Blog published successfully!"
      );
      navigate("/my-blogs");
    } catch (error) {
      alert("Error occurred while saving the blog");
    }
  };

  // Giữ nguyên toàn bộ UI
  return (
    <div className="min-h-screen bg-gray-50">
      {showLeaveModal && <LeaveModal />}

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Left side: Back button and Title */}
            <div className="flex items-center gap-4 flex-1 mr-4">
              <button
                onClick={() => handleNavigate("/bloglist")}
                className="text-gray-600 hover:text-gray-900"
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

            {/* Right side: Action buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {id ? (
                <>
                  <button
                    onClick={() => handleSubmit("draft")}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={() => handleSubmit("published")}
                    className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
                  >
                    Publish
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleSubmit("published")}
                  className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
                >
                  Publish
                </button>
              )}
            </div>
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
