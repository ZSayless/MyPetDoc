import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import CommentModal from "./CommentModal";
import EditPostModal from "./EditPostModal";

function PostDetail() {
  const { postId } = useParams();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Mock data - replace with API call
  const post = {
    id: postId,
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    content: "My lovely cat just had her first vaccination today! She was so brave 🐱",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    createdAt: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm">
          {/* Post Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{post.author.name}</h3>
                <p className="text-sm text-gray-500">{post.createdAt}</p>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              
              {showOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setShowOptions(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Edit Post
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implement delete
                      setShowOptions(false);
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    Delete Post
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4">
            <p className="text-gray-700 mb-4">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="rounded-lg w-full object-cover"
              />
            )}
          </div>

          {/* Post Actions */}
          <div className="flex items-center gap-6 p-4 border-t">
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]">
              <Heart className="w-5 h-5" />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={() => setIsCommentModalOpen(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]">
              <Share2 className="w-5 h-5" />
              <span>{post.shares}</span>
            </button>
          </div>
        </div>
      </div>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={post}
      />

      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={post}
      />
    </div>
  );
}

export default PostDetail; 