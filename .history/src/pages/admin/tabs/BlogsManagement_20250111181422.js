import { useState } from "react";
import { Trash2, Edit, MoreVertical, FileText, Eye, Check, X } from "lucide-react";

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

  const handleStatusChange = (blogId, newStatus) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId ? {...blog, status: newStatus} : blog
    ));
  };

  return (
    <div>
      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">All Categories</option>
            <option value="pet-care">Pet Care</option>
            <option value="health">Health</option>
            <option value="nutrition">Nutrition</option>
          </select>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] transition-colors">
          <FileText size={20} />
          Create New Blog
        </button>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blog
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publish Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                      <div className="text-sm text-gray-500">by {blog.author}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {blog.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    blog.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : blog.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye size={16} className="mr-1" />
                    {blog.views}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.publishDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => setShowActions(showActions === blog.id ? null : blog.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical size={20} />
                    </button>
                    
                    {showActions === blog.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
                        <button
                          onClick={() => {/* Handle edit */}}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit size={16} className="inline mr-2" />
                          Edit Blog
                        </button>
                        {blog.status !== 'published' ? (
                          <button
                            onClick={() => handleStatusChange(blog.id, 'published')}
                            className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-50"
                          >
                            <Check size={16} className="inline mr-2" />
                            Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(blog.id, 'draft')}
                            className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-gray-50"
                          >
                            <X size={16} className="inline mr-2" />
                            Unpublish
                          </button>
                        )}
                        <button
                          onClick={() => {/* Handle delete */}}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          <Trash2 size={16} className="inline mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing 1 to 10 of 50 results
        </div>
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