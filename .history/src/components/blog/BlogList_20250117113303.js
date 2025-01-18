import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTranslation } from "react-i18next";

function BlogList() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([
    t("blog.list.categories.allPosts"),
  ]);

  const categories = [
    t("blog.list.categories.allPosts"),
    t("blog.list.categories.healthTips"),
    t("blog.list.categories.petCare"),
    t("blog.list.categories.nutrition"),
    t("blog.list.categories.training"),
    t("blog.list.categories.behavior"),
    t("blog.list.categories.grooming"),
  ];

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

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.includes(t("blog.list.categories.allPosts")) ||
      selectedCategories.some(
        (category) => post.category === category || post.tags.includes(category)
      );

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#98E9E9] to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("blog.list.title")}
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              {t("blog.list.subtitle")}
            </p>
            <Link
              to="/write-blog"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              {t("blog.list.shareStory")}
            </Link>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
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

          {/* Categories */}
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

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                to={`/blogdetail/${post.id}`}
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <LazyLoadImage
                    src={post.image}
                    alt={post.title}
                    effect="blur"
                    className="w-full h-48 object-cover rounded-t-lg"
                    placeholderSrc="/placeholder-image.jpg"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {post.readTime} {t("blog.list.card.readTime")}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#7CD5D5] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {post.author}
                        </div>
                        <div className="text-sm text-gray-500">{post.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        {post.likes} {t("blog.list.card.likes")}
                      </span>
                      <span>
                        {post.comments} {t("blog.list.card.comments")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogList;
