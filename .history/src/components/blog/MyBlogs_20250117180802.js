import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2, Heart, MessageCircle, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const MyBlogs = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Mock data với nhiều bài viết hơn và thêm trạng thái
  const mockBlogs = [
    {
      id: 1,
      title: "Taking Care of Your Pet During Summer",
      excerpt:
        "Learn how to keep your pets safe and healthy during hot summer days with these essential tips and tricks for pet owners...",
      publishDate: "2024-03-15",
      status: "published",
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
      likes: 0,
      comments: 0,
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Common Behavioral Issues in Cats",
      excerpt:
        "Understanding and addressing common behavioral problems in cats. Learn about causes and solutions for issues like scratching furniture, aggression, and litterbox problems...",
      publishDate: "2024-03-08",
      status: "published",
      likes: 15,
      comments: 5,
      readTime: "6 min read",
    }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-6 h-6 border-4 border-[#98E9E9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t("myBlogs.title")}
                </h1>
                <p className="text-gray-500 mt-1">{t("myBlogs.subtitle")}</p>
              </div>
              <Link
                to="/write-blog"
                className="bg-[#98E9E9] text-gray-700 px-6 py-2.5 rounded-lg hover:bg-[#7CD5D5] transition-colors font-medium"
              >
                {t("myBlogs.writeNew")}
              </Link>
            </div>

            <div className="border-b mt-6">
              <div className="flex gap-6">
                <button
                  onClick={() => setFilter("all")}
                  className={`pb-4 relative ${
                    filter === "all"
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("myBlogs.filter.all")}
                  {filter === "all" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
                <button
                  onClick={() => setFilter("published")}
                  className={`pb-4 relative ${
                    filter === "published"
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("myBlogs.filter.published")}
                  {filter === "published" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
                <button
                  onClick={() => setFilter("draft")}
                  className={`pb-4 relative ${
                    filter === "draft"
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("myBlogs.filter.draft")}
                  {filter === "draft" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Blog List với UI mới */}
            <div className="space-y-4 mt-6">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blog.readTime}
                      </div>
                      <span>•</span>
                      <span>{blog.publishDate}</span>
                      {blog.status === "draft" && (
                        <>
                          <span>•</span>
                          <span className="text-gray-900/80 font-medium">
                            {t("myBlogs.status.draft")}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {blog.status === "draft" ? (
                        <>
                          <Link
                            to={`/edit-blog/${blog.id}`}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span className="text-sm">
                              {t("myBlogs.actions.edit")}
                            </span>
                          </Link>
                          <button className="flex items-center gap-1 text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">
                              {t("myBlogs.actions.delete")}
                            </span>
                          </button>
                        </>
                      ) : (
                        <Link
                          to={`/blog/${blog.id}`}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                        >
                          <span className="text-sm">
                            {t("myBlogs.actions.view")}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-2">
                    {blog.status === "published" ? (
                      <Link
                        to={`/blog/${blog.id}`}
                        className="hover:text-blue-600"
                      >
                        {blog.title}
                      </Link>
                    ) : (
                      <span className="text-gray-900">{blog.title}</span>
                    )}
                  </h2>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {blog.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {blog.comments}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
