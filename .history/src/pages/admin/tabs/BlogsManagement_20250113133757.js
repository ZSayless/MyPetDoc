import { useState, useEffect } from "react";
import { Trash2, Edit, MoreVertical, FileText } from "lucide-react";
import SearchBar from "../../../components/common/SearchBar";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    let results = blogs;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      results = results.filter((blog) => blog.category === categoryFilter);
    }

    // Filter by status
    if (statusFilter) {
      results = results.filter((blog) => blog.status === statusFilter);
    }

    setFilteredBlogs(results);
  }, [searchTerm, categoryFilter, statusFilter, blogs]);

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      try {
        // TODO: Call API to delete blog
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
        alert("Xóa bài viết thành công!");
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa bài viết");
      }
    }
  };

  const handleUpdateStatus = async (blogId, newStatus) => {
    try {
      // TODO: Call API to update blog status
      setBlogs(
        blogs.map((blog) =>
          blog.id === blogId ? { ...blog, status: newStatus } : blog
        )
      );
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật trạng thái");
    }
  };

  return (
    <div>
      {/* Actions Bar */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Blogs Management</h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <SearchBar
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
            <select 
              className="min-w-[140px] px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="pet-care">Pet Care</option>
              <option value="health">Health</option>
            </select>
            <select 
              className="min-w-[140px] px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <button className="whitespace-nowrap px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-full hover:bg-[#7CD5D5] transition-colors">
            <FileText size={20} className="inline-block mr-2" />
            Create New Blog
          </button>
        </div>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {filteredBlogs.map((blog) => (
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
