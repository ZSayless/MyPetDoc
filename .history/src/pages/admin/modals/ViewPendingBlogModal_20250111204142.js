import { X } from "lucide-react";

function ViewPendingBlogModal({ blog, onClose, onApprove, onReject }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Review Blog Post</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Blog Details */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>By {blog.author}</span>
              <span>Category: {blog.category}</span>
              <span>Submitted: {blog.submittedAt}</span>
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 border-t pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => onReject(blog)}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
            >
              Reject
            </button>
            <button
              onClick={() => onApprove(blog)}
              className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPendingBlogModal; 