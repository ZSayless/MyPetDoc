import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeft, X, Save, Send } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WriteBlog = () => {
  const { t } = useTranslation();
  const { id } = useParams();
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

  const LeaveModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">{t("blog.write.leaveModal.title")}</h3>
        <p className="text-gray-600 mb-6">
          {t("blog.write.leaveModal.message")}
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              setShowLeaveModal(false);
              window.history.pushState(null, "", window.location.pathname);
            }}
          >
            {t("blog.write.leaveModal.stay")}
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => {
              setShowLeaveModal(false);
              setIsDirty(false);
              navigate(nextPath);
            }}
          >
            {t("blog.write.leaveModal.leave")}
          </button>
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (status) => {
    if (!title.trim() || !content.trim()) {
      alert(t("blog.write.validation.required"));
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
          ? t("blog.write.success.draft")
          : t("blog.write.success.publish")
      );
      navigate("/my-blogs");
    } catch (error) {
      alert(t("blog.write.error.save"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showLeaveModal && <LeaveModal />}

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-4 flex-1 mr-4">
              <button
                onClick={() => handleNavigate("/bloglist")}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <input
                type="text"
                placeholder={t("blog.write.form.title.placeholder")}
                className="text-lg md:text-xl font-medium focus:outline-none placeholder:text-gray-400 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {id ? (
                <>
                  <button
                    onClick={() => handleSubmit("draft")}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {t("blog.write.buttons.saveDraft")}
                  </button>
                  <button
                    onClick={() => handleSubmit("published")}
                    className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {t("blog.write.buttons.publish")}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleSubmit("published")}
                  className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {t("blog.write.buttons.publish")}
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
              placeholder={t("blog.write.form.content.placeholder")}
              className="h-[calc(100vh-200px)] md:h-[calc(100vh-180px)] overflow-y-auto"
            />
          </div>

          {/* Preview Column */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm p-6">
            <div className="prose max-w-none">
              <h1 className="text-2xl font-bold mb-4">
                {title || t("blog.write.preview.defaultTitle")}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: content || t("blog.write.preview.defaultContent"),
                }}
              />
            </div>
          </div>

          {/* Preview Button - Mobile */}
          <button
            onClick={() => setShowPreview(true)}
            className="lg:hidden fixed bottom-4 right-4 px-4 py-2 bg-white shadow-lg rounded-lg text-gray-700 border"
          >
            {t("blog.write.buttons.preview")}
          </button>
        </div>
      </div>

      {/* Preview Modal - Mobile */}
      {showPreview && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden overflow-y-auto">
          <div className="sticky top-0 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="h-16 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {t("blog.write.preview.title")}
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-6">
            <div className="prose max-w-none">
              <h1 className="text-2xl font-bold mb-4">
                {title || t("blog.write.preview.defaultTitle")}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: content || t("blog.write.preview.defaultContent"),
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
