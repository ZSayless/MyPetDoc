import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { blogService } from "../../services/blogService";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import BlogCard from './BlogCard';
import { useAsync } from "../../hooks/useAsync";
import { useCache } from "../../hooks/useCache";

function HomeBlogs() {
  const { t } = useTranslation();
  const { data: blogs, loading, error } = useCache(
    'recent-blogs',
    () => blogService.getRecentBlogs(),
    {
      staleTime: 5 * 60 * 1000 // Cache trong 5 phút
    }
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("home.blogs.title")}
            </h2>
            <p className="text-gray-600">{t("home.blogs.subtitle")}</p>
          </div>
          <Link
            to="/bloglist"
            className="flex items-center text-[#1A3C8E] hover:text-[#98E9E9] transition-colors"
          >
            {t("home.blogs.viewAll")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeBlogs;
