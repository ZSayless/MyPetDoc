import { useState } from 'react';
import { UserCircle, MoreVertical, Flag, Trash2, Heart } from 'lucide-react';
import ReportCommentModal from './ReportCommentModal';

function BlogComment({ comment, onDelete, isAdmin }) {
  const [showOptions, setShowOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleReply = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    // TODO: Handle reply submission
    setReplyText('');
    setShowReplyInput(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-3">
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

          {/* Comment Actions */}
          <div className="mt-2 flex items-center space-x-4 text-sm">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>Like</span>
            </button>
            <button 
              onClick={handleReply}
              className="text-gray-500 hover:text-gray-700"
            >
              Reply
            </button>
          </div>

          {/* Reply Input */}
          {showReplyInput && (
            <form onSubmit={handleSubmitReply} className="mt-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                rows="2"
              />
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowReplyInput(false)}
                  className="px-3 py-1.5 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
                >
                  Reply
                </button>
              </div>
            </form>
          )}

          {/* Replies */}
          {comment.replies?.map((reply) => (
            <div key={reply.id} className="mt-3 ml-6 flex space-x-3">
              <div className="flex-shrink-0">
                {reply.userAvatar ? (
                  <img
                    src={reply.userAvatar}
                    alt={reply.userName}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <UserCircle className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">{reply.userName}</div>
                <p className="text-gray-600">{reply.content}</p>
                <div className="mt-1 text-sm text-gray-500">
                  {formatDate(reply.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
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