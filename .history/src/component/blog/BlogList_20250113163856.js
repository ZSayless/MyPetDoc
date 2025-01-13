import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Tips for New Pet Owners",
    description: "Essential guidelines and tips for first-time pet owners to ensure their furry friends stay...",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e",
    author: "Dr. Nguyen Van A",
    date: "2024-03-15",
    readTime: "5 min read",
    likes: 24,
    comments: 8,
    tags: ["Pet Care", "Health Tips"],
  },
  // ... other blog posts
];

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All Posts");
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);

  // Xử lý search và filter
  useEffect(() => {
    let results = BLOG_POSTS;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by tag
    if (selectedTag !== "All Posts") {
      results = results.filter(post => 
        post.tags.includes(selectedTag)
      );
    }
    
    setFilteredPosts(results);
  }, [searchTerm, selectedTag]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <Link
            to="/write-blog"
            className="px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
          >
            Write a Post
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Filter Tags */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {["All Posts", "Health Tips", "Pet Care", "Nutrition", "Training", "Behavior", "Grooming"].map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedTag === tag
                    ? "bg-[#98E9E9] text-gray-700 font-medium"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                {/* Tags */}
                <div className="flex gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      {post.author[0]}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{post.readTime}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
