import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function HomeBlogs() {
  const [recentBlogs, setRecentBlogs] = useState([]);

  // Mock data cho blog
  const mockBlogs = [
    {
      id: 1,
      title: "Essential Vaccinations for Your Pet",
      excerpt: "Learn about the core vaccines that every pet needs and when they should get them. Protect your furry friend from common diseases.",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
      author: "Dr. Sarah Johnson",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      tags: ["Health Tips", "Vaccination"]
    },
    {
      id: 2,
      title: "Understanding Pet Nutrition: A Complete Guide",
      excerpt: "What should you feed your pet? Discover the essential nutrients and diet tips for optimal pet health and wellness.",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      author: "Dr. Mike Wilson",
      date: "Mar 12, 2024",
      readTime: "6 min read",
      tags: ["Nutrition", "Pet Care"]
    },
    {
      id: 3,
      title: "10 Signs Your Pet Needs Emergency Care",
      excerpt: "Learn to recognize the warning signs that indicate your pet needs immediate medical attention. Better safe than sorry!",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
      author: "Dr. Emily Chen",
      date: "Mar 10, 2024",
      readTime: "4 min read",
      tags: ["Emergency", "Health Tips"]
    }
  ];

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await fetch("/api/blogs/recent");
        const data = await response.json();
        // Nếu có dữ liệu từ API thì dùng, không thì dùng mockdata
        setRecentBlogs(data?.length > 0 ? data : mockBlogs);
      } catch (error) {
        console.error("Error fetching recent blogs:", error);
        // Nếu fetch lỗi thì dùng mockdata
        setRecentBlogs(mockBlogs);
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeBlogs;
