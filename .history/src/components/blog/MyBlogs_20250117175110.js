import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit2, Trash2, Heart, MessageCircle, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const MyBlogs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, published, draft

  // Mock data với nhiều bài viết hơn và thêm trạng thái
  const mockBlogs = [
    {
      id: 1,
      title: "Taking Care of Your Pet During Summer",
      excerpt:
        "Learn how to keep your pets safe and healthy during hot summer days with these essential tips and tricks for pet owners...",
      publishDate: "2024-03-15",
      status: "published",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      likes: 24,
      comments: 8,
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Essential Vaccinations for Puppies",
      excerpt:
        "A comprehensive guide to understanding the vaccination schedule and importance of early prevention for your puppy's health...",
      publishDate: "2024-03-10",
      status: "draft",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      likes: 0,
      comments: 0,
      readTime: "8 min read",
    },
    // Thêm các blog khác...
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === "all") return true;
    return blog.status === filter;
  });

  const handleEdit = (blogId) => {
    navigate(`/edit-blog/${blogId}`);
  };

  const handleDelete = (blogId) => {
    setBlogs(blogs.filter((blog) => blog.id !== blogId));
  };

  const handleView = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-6 h-6 border-4 border-[#98E9E9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {t("myBlogs.title")}
            </h1>
            <Link
              to="/write-blog"
              className="bg-[#98E9E9] text-gray-700 px-6 py-2.5 rounded-lg hover:bg-[#7CD5D5] transition-colors font-medium"
            >
              Write New Blog
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg ${
                filter === "all" ? "bg-blue-100 text-blue-600" : "text-gray-600"
              }`}
              onClick={() => setFilter("all")}
            >
              {t("myBlogs.filter.all")}
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filter === "published"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setFilter("published")}
            >
              {t("myBlogs.filter.published")}
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filter === "draft"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setFilter("draft")}
            >
              {t("myBlogs.filter.draft")}
            </button>
          </div>

          {/* Blog List */}
          {blogs.length > 0 ? (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">
                          {blog.title}
                        </h2>
                        <p className="text-gray-600">{blog.excerpt}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {t(`myBlogs.status.${blog.status}`)}
                      </span>
                    </div>

                    {/* Blog Stats */}
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <span>
                        {blog.views} {t("myBlogs.stats.views")}
                      </span>
                      <span>
                        {blog.likes} {t("myBlogs.stats.likes")}
                      </span>
                      <span>
                        {blog.comments} {t("myBlogs.stats.comments")}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(blog.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {t("myBlogs.actions.edit")}
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(t("myBlogs.actions.deleteConfirm"))
                          ) {
                            handleDelete(blog.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        {t("myBlogs.actions.delete")}
                      </button>
                      <button
                        onClick={() => handleView(blog.id)}
                        className="text-gray-600 hover:text-gray-700"
                      >
                        {t("myBlogs.actions.view")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">{t("myBlogs.empty")}</p>
              <button
                onClick={() => navigate("/write-blog")}
                className="text-blue-600 hover:text-blue-700"
              >
                {t("myBlogs.writeFirst")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
