import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import BlogCard from "./BlogCard";

const CATEGORIES = [
  "All",
  "Health",
  "Nutrition",
  "Training",
  "Grooming",
  "Behavior",
];

function BlogList() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const posts = [
    {
      id: 1,
      title: "Tips for New Pet Owners",
      author: "Dr. Nguyen Van A",
      avatar: "/avatar1.jpg",
      date: "2024-03-15",
      excerpt:
        "Essential guidelines and tips for first-time pet owners to ensure their furry friends stay healthy and happy...",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e",
      readTime: "5 min read",
      category: "Pet Care",
      tags: ["Pet Care", "Health Tips"],
      likes: 24,
      comments: 8,
    },
    // Thêm các bài viết khác
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      post.category === selectedCategory ||
      post.tags.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A3C8E] mb-4">
            {t("blog.list.title")}
          </h1>
          <p className="text-gray-600 text-lg">
            {t("blog.list.subtitle")}
          </p>
        </div>

        {/* Search and Categories */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder={t("blog.list.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#1A3C8E] focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Categories */}
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("blog.list.categories")}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-48 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#1A3C8E] focus:border-transparent"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" ? t("blog.list.allPosts") : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              {t("blog.list.noResults")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogList;
