import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogCard = ({ blog }) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`/bloglist/${blog.id}`}
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
          {blog.excerpt}
        </p>
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
  );
};

export default BlogCard; 