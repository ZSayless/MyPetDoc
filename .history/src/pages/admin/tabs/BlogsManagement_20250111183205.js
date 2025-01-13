import { useState } from "react";
import { Trash2, Edit, MoreVertical, FileText } from "lucide-react";

function BlogsManagement() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Pet Care Tips for Summer",
      author: "Dr. Sarah Wilson",
      category: "Pet Care",
      status: "published",
      views: 1234,
      publishDate: "2024-03-15",
    },
    {
      id: 2,
      title: "Common Pet Health Issues",
      author: "Dr. John Doe",
      category: "Health",
      status: "draft",
      views: 0,
      publishDate: "-",
    },
  ]);

  const [showActions, setShowActions] = useState(null);

  return (
    <div>
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <select className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg">
            <option value="">All Categories</option>
            <option value="pet-care">Pet Care</option>
            <option value="health">Health</option>
          </select>
          <select className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] transition-colors">
          <FileText size={20} />
          Create New Blog
        </button>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                <p className="text-sm text-gray-500">by {blog.author}</p>
              </div>
              <button
                onClick={() =>
                  setShowActions(showActions === blog.id ? null : blog.id)
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {blog.category}
              </span>
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  blog.status === "published"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {blog.status}
              </span>
              <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                {blog.views} views
              </span>
            </div>

            {showActions === blog.id && (
              <div className="flex gap-2 border-t mt-3 pt-3">
                <button className="flex-1 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Edit
                </button>
                <button className="flex-1 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-lg">
                  {blog.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button className="flex-1 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-sm text-gray-500">
          Showing 1 to 10 of 50 results
        </span>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogsManagement;
