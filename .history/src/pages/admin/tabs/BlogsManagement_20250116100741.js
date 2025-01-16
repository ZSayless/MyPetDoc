import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { deleteBlog, updateBlogStatus } from "../../../redux/slices/adminSlice";

function BlogsManagement() {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleDelete = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(blogId));
    }
  };

  const handleView = (blog) => {
    // Mở blog trong tab mới
    window.open(`/blog/${blog.id}`, '_blank');
  };

  const handleEdit = (blog) => {
    // Chuyển đến trang edit blog
    window.open(`/edit-blog/${blog.id}`, '_blank');
  };

  const handlePublish = (blogId) => {
    dispatch(updateBlogStatus({ blogId, status: "published" }));
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
          />
        </div>
      </div>

      {/* Table for desktop */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="p-4">Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Status</th>
                <th className="p-4 hidden md:table-cell">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{blog.title}</div>
                  </td>
                  <td className="p-4">{blog.author}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      blog.status === 'published' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell">{blog.date}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleView(blog)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden space-y-4">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{blog.title}</h3>
                <p className="text-sm text-gray-500">By {blog.author}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                blog.status === 'published' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {blog.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {blog.date}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleView(blog)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleEdit(blog)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogsManagement;
