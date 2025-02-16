import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTranslation } from "react-i18next";
import BlogCard from "./BlogCard";
import { blogPostService } from "../../services/blogPostService";

const BlogList = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSelectedCategories([t("blog.list.categories.allPosts")]);
  }, [i18n.language, t]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await blogPostService.getPosts();
        if (response.success) {
          setBlogs(response.data.posts);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = [
    t("blog.list.categories.allPosts"),
    t("blog.list.categories.healthTips"),
    t("blog.list.categories.petCare"),
    t("blog.list.categories.nutrition"),
    t("blog.list.categories.behavior"),
    t("blog.list.categories.training"),
    t("blog.list.categories.grooming"),
    t("blog.list.categories.vaccination"),
    t("blog.list.categories.diseasePrevention"),
    t("blog.list.categories.firstAid"),
    t("blog.list.categories.mentalHealth"),
    t("blog.list.categories.exercise"),
    t("blog.list.categories.breeding"),
    t("blog.list.categories.seniorPetCare"),
    t("blog.list.categories.puppyCare"),
    t("blog.list.categories.emergencyCare")
  ];

  const categoryMapping = {
    [t("blog.list.categories.healthTips")]: "Health Tips",
    [t("blog.list.categories.petCare")]: "Pet Care",
    [t("blog.list.categories.nutrition")]: "Nutrition",
    [t("blog.list.categories.behavior")]: "Behavior",
    [t("blog.list.categories.training")]: "Training",
    [t("blog.list.categories.grooming")]: "Grooming",
    [t("blog.list.categories.vaccination")]: "Vaccination",
    [t("blog.list.categories.diseasePrevention")]: "Disease Prevention",
    [t("blog.list.categories.firstAid")]: "First Aid",
    [t("blog.list.categories.mentalHealth")]: "Mental Health",
    [t("blog.list.categories.exercise")]: "Exercise",
    [t("blog.list.categories.breeding")]: "Breeding",
    [t("blog.list.categories.seniorPetCare")]: "Senior Pet Care",
    [t("blog.list.categories.puppyCare")]: "Puppy Care",
    [t("blog.list.categories.emergencyCare")]: "Emergency Care"
  };

  const handleCategoryToggle = (category) => {
    if (category === t("blog.list.categories.allPosts")) {
      setSelectedCategories([t("blog.list.categories.allPosts")]);
    } else {
      setSelectedCategories((prev) => {
        const newSelection = prev.filter(
          (cat) => cat !== t("blog.list.categories.allPosts")
        );

        if (prev.includes(category)) {
          const filtered = newSelection.filter((cat) => cat !== category);
          return filtered.length === 0
            ? [t("blog.list.categories.allPosts")]
            : filtered;
        } else {
          return [...newSelection, category];
        }
      });
    }
  };

  const filteredPosts = blogs.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.includes(t("blog.list.categories.allPosts")) ||
      selectedCategories.some((category) => {
        const actualCategory = categoryMapping[category] || category;
        return (
          post.category === actualCategory || 
          post.tags.includes(actualCategory)
        );
      });

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-[#98E9E9] to-white pb-16">
        <div className="container mx-auto px-4 pt-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("blog.list.title")}
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              {t("blog.list.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t("blog.list.search.placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button className="md:w-auto w-full px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              <span>{t("blog.list.search.button")}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategories.includes(category)
                    ? "bg-[#98E9E9] text-gray-900 font-medium"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} blog={post} />
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <p className="text-center text-gray-500 py-8">
          {t("blog.list.loading")}
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 py-8">
          {t("blog.list.error")}: {error}
        </p>
      )}

      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          {t("blog.list.noBlogsFound")}
        </p>
      )}
    </div>
  );
};

export default BlogList;