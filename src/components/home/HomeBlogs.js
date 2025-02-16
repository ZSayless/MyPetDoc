import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogPostService } from '../../services/blogPostService';
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

function HomeBlogs() {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogPostService.getPosts();
        if (response.success) {
          setBlogs(response.data.posts);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await blogPostService.getPosts();
        if (response.success && response.data.posts) {
          const blogsData = response.data.posts;
          setBlogs(blogsData);

          const formattedBlogs = blogsData.slice(0, 3).map((blog) => ({
            id: blog.id,
            title: blog.title,
            summary: blog.summary,
            image: blog.featured_image,
            author: blog.author_name,
            date: format(new Date(blog.created_at), "MMM dd, yyyy"),
            readTime: "5 min read",
            tags: blog.tags ? blog.tags.split(",") : [],
            slug: blog.slug,
          }));
          setRecentBlogs(formattedBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchRecentBlogs();
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t("home.blogs.title")}</h2>
            <p className="text-gray-600">{t("home.blogs.subtitle")}</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            {t("home.blogs.viewAll")} →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
}

export default HomeBlogs;
