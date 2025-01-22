import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getBlogPosts } from "../../services/blogPostService";
import { format } from "date-fns";

function HomeBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await getBlogPosts();
        if (response.success && response.data.posts) {
          const blogsData = response.data.posts;
          setBlogs(blogsData);
          
          const formattedBlogs = blogsData
            .slice(0, 3)
            .map((blog) => ({
              id: blog.id,
              title: blog.title,
              summary: blog.summary,
              image: blog.featured_image,
              author: blog.author_name,
              date: format(new Date(blog.created_at), "MMM dd, yyyy"),
              readTime: "5 min read",
              tags: blog.tags ? blog.tags.split(',') : [],
              slug: blog.slug,
            }));
          setRecentBlogs(formattedBlogs);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
      }
    };

    fetchRecentBlogs();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Recent Blog Posts
            </h2>
            <p className="text-gray-600">
              Stay updated with the latest pet care tips and advice
            </p>
          </div>
          <Link
            to="/bloglist"
            className="flex items-center text-[#1A3C8E] hover:text-[#98E9E9] transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/bloglist/${blog.slug}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow no-underline"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {blog.summary}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-gray-100 rounded-md text-xs text-gray-600"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{blog.author}</span>
                  <div className="flex items-center gap-2">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeBlogs;
