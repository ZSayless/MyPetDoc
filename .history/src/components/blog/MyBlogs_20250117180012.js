import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit2, Trash2, Heart, MessageCircle, Clock } from "lucide-react";

const MyBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, published, draft

  // Mock data với nhiều bài viết hơn và thêm trạng thái
  const mockBlogs = [
    {
      id: 1,
      title: "Chăm Sóc Thú Cưng Trong Mùa Hè",
      excerpt:
        "Tìm hiểu cách giữ an toàn và khỏe mạnh cho thú cưng trong những ngày hè nóng bức với những mẹo và lời khuyên thiết yếu cho người nuôi thú cưng...",
      publishDate: "15/03/2024",
      status: "published",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      likes: 24,
      comments: 8,
      readTime: "5 phút đọc",
    },
    {
      id: 2,
      title: "Tiêm Phòng Cần Thiết Cho Chó Con",
      excerpt:
        "Hướng dẫn toàn diện để hiểu lịch tiêm phòng và tầm quan trọng của việc phòng ngừa sớm đối với sức khỏe của chó con...",
      publishDate: "10/03/2024",
      status: "draft",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      likes: 0,
      comments: 0,
      readTime: "4 phút đọc",
    },
  ];

  useEffect(() => {
    // Giả lập API call
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
    setBlogs(blogs.filter(blog => blog.id !== blogId));
  };

  const handleView = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bài Viết Của Tôi</h1>
                <p className="text-gray-500 mt-1">Quản lý bài viết của bạn</p>
              </div>
              <Link
                to="/write-blog"
                className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] transition-colors"
              >
                Viết Bài Mới
              </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mt-6 border-b">
              <button
                onClick={() => setFilter("all")}
                className={`pb-3 px-2 font-medium transition-colors relative ${
                  filter === "all"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Tất Cả
                {filter === "all" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
              <button
                onClick={() => setFilter("published")}
                className={`pb-3 px-2 font-medium transition-colors relative ${
                  filter === "published"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Đã Đăng
                {filter === "published" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
              <button
                onClick={() => setFilter("draft")}
                className={`pb-3 px-2 font-medium transition-colors relative ${
                  filter === "draft"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Bản Nháp
                {filter === "draft" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
            </div>
          </div>

          {/* Blog List */}
          <div className="space-y-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 lg:w-1/4">
                    <div className="relative h-48 md:h-full">
                      {blog.status === "published" ? (
                        <Link to={`/blog/${blog.id}`}>
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                          />
                        </Link>
                      ) : (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {blog.status === "draft" && (
                        <div className="absolute top-2 left-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                          Bản Nháp
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6 md:w-2/3 lg:w-3/4">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blog.readTime}
                      </div>
                      <span>•</span>
                      <span>{blog.publishDate}</span>
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
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
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
                      <div className="flex items-center gap-3">
                        {blog.status === "draft" ? (
                          <>
                            <Link
                              to={`/edit-blog/${blog.id}`}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                            >
                              <Edit2 className="w-4 h-4" />
                              <span className="text-sm">Sửa</span>
                            </Link>
                            <button className="flex items-center gap-1 text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                              <span className="text-sm">Xóa</span>
                            </button>
                          </>
                        ) : (
                          <Link
                            to={`/blog/${blog.id}`}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                          >
                            <span className="text-sm">Xem Bài Viết</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
