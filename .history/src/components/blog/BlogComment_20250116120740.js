import { useState } from 'react';
import { UserCircle, MoreVertical, Flag, Trash2 } from 'lucide-react';
import ReportCommentModal from './ReportCommentModal';

function BlogComment({ comment, onDelete, isAdmin }) {
  const [showOptions, setShowOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex space-x-3 p-4 bg-white rounded-lg shadow-sm">
      {/* User Avatar */}
      <div className="flex-shrink-0">
        {comment.userAvatar ? (
          <img
            src={comment.userAvatar}
            alt={comment.userName}
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <UserCircle className="h-10 w-10 text-gray-400" />
        )}
      </div>

      {/* Comment Content */}
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">{comment.userName}</h4>
            <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
          </div>

          {/* Comment Options */}
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            {showOptions && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                {isAdmin ? (
                  <button
                    onClick={() => {
                      onDelete(comment.id);
                      setShowOptions(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Comment
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowReportModal(true);
                      setShowOptions(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Report Comment
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Comment Text */}
        <p className="mt-2 text-gray-600">{comment.content}</p>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportCommentModal
          onClose={() => setShowReportModal(false)}
          commentId={comment.id}
        />
      )}
    </div>
  );
}

export default BlogComment; 