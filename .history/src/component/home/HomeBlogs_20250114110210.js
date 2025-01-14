import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function HomeBlogs() {
  const recentBlogs = [
    {
      id: 1,
      title: "Essential Vaccinations for Your Pet",
      excerpt: "Learn about the core vaccines that every pet needs and when they should get them.",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def",
      author: "Dr. Sarah Johnson",
      date: "Mar 15, 2024",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Pet Nutrition: A Complete Guide",
      excerpt: "Understanding the basics of pet nutrition and how to choose the right food for your pet.",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55",
      author: "Dr. Mike Wilson",
      date: "Mar 12, 2024",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Signs Your Pet Needs Emergency Care",
      excerpt: "Know the warning signs that indicate your pet needs immediate medical attention.",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
      author: "Dr. Emily Chen",
      date: "Mar 10, 2024",
      readTime: "4 min read"
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Recent Blog Posts</h2>
            <p className="text-gray-600">Stay updated with the latest pet care tips and advice</p>
          </div>
          <Link 
            to="/blog"
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
              to={`/blog/${blog.id}`}
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