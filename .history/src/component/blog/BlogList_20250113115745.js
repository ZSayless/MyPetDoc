import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";

function BlogList() {
  const categories = [
    "All Posts",
    "Health Tips",
    "Pet Care",
    "Nutrition",
    "Training",
    "Behavior",
    "Grooming",
  ];

  const posts = [
    {
      id: 1,
      title: "Tips for New Pet Owners",
      author: "Dr. Nguyen Van A",
      date: "2024-03-15",
      excerpt:
        "Essential guidelines and tips for first-time pet owners to ensure their furry friends stay healthy and happy...",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      readTime: "5 min read",
      category: "Pet Care",
      likes: 24,
      comments: 8,
    },
    // ... other posts
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                <Link
                to="/write-blog"
                className="bg-[#98E9E9] text-gray-700 px-6 py-2.5 rounded-lg hover:bg-[#7CD5D5] transition-colors"
                >
                Write a Post
                </Link>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                to={`/blogdetail/${post.id}`}
                key={post.id}
                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        {post.author[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{post.author}</div>
                        <div className="text-xs text-gray-500">{post.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
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
