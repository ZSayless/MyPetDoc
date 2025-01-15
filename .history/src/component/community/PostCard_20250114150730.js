import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function PostCard({ post, onLike, onComment, onShare, onDelete, onEdit }) {
  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const isAuthor = user?.id === post.authorId;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
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

        {isAuthor && (
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
                    onEdit(post);
                    setShowOptions(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Edit Post
                </button>
                <button
                  onClick={() => {
                    onDelete(post.id);
                    setShowOptions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <Link to={`/community/post/${post.id}`}>
        <p className="text-gray-700 mb-4">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="rounded-lg w-full object-cover mb-4"
          />
        )}
      </Link>

      {/* Post Actions */}
      <div className="flex items-center gap-6 pt-4 border-t">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-2 ${
            post.isLiked ? "text-red-500" : "text-gray-600 hover:text-[#1A3C8E]"
          }`}
        >
          <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
          <span>{post.likes}</span>
        </button>
        <button
          onClick={() => onComment(post)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments}</span>
        </button>
        <button
          onClick={() => onShare(post)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]"
        >
          <Share2 className="w-5 h-5" />
          <span>{post.shares}</span>
        </button>
      </div>
    </div>
  );
}

export default PostCard; 