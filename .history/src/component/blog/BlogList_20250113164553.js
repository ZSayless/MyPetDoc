import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

function BlogList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const categories = [
    "All Posts",
    "Health Tips", 
    "Pet Care",
    "Nutrition",
    "Training",
    "Behavior",
    "Grooming"
  ];

  const posts = [
    {
      id: 1,
      title: "Tips for New Pet Owners",
      author: {
        name: "Dr. Nguyen Van A",
        image: "https://api.dicebear.com/7.x/initials/svg?seed=NA"
      },
      date: "2024-03-15",
      excerpt: "Essential guidelines and tips for first-time pet owners to ensure their furry friends stay...",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e",
      readTime: "5 min read",
      tags: ["Pet Care", "Health Tips"],
      likes: 24,
      comments: 8,
    },
    // Thêm posts khác...
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === "All Posts" || 
      post.tags.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <Link
            to="/write-blog"
            className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
          >
            Write a Post
          </Link>
        </div>

        {/* Search and Categories */}
        <div className="mb-8">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-[#98E9E9] text-gray-700"
                    : "bg-white border text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              to={`/blogdetail/${post.id}`}
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="inline-block px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="inline-block px-2 py-1 text-sm text-gray-500">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-semibold mb-2 hover:text-[#98E9E9] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{post.author.name}</p>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {post.likes} likes • {post.comments} comments
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

export default BlogList;
