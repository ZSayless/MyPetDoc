import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - sau này sẽ thay bằng API call thực
  const mockBlogs = [
    {
      id: 1,
      title: "Taking Care of Your Pet During Summer",
      excerpt: "Learn how to keep your pets safe and healthy during hot summer days...",
      publishDate: "2024-03-15",
      status: "published",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      likes: 24,
      comments: 8
    },
    // Thêm các blog khác...
  ];

  useEffect(() => {
    // Giả lập API call
    setLoading(true);
    setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Blogs</h1>
          <Link
            to="/write-blog"
            className="bg-[#98E9E9] text-gray-700 px-4 py-2 rounded-lg hover:bg-[#7CD5D5]"
          >
            Write New Blog
          </Link>
        </div>

        <div className="grid gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-3/4">
                  <h2 className="text-xl font-semibold mb-2">
                    <Link to={`/blog/${blog.id}`} className="hover:text-blue-600">
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>Published: {blog.publishDate}</span>
                      <span>• {blog.likes} likes</span>
                      <span>• {blog.comments} comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/edit-blog/${blog.id}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </Link>
                      <button className="text-red-600 hover:text-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs; 