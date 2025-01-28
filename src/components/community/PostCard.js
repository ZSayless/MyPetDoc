import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { communityService } from "../../services/communityService";
import classNames from "classnames";

function PostCard({ post, onLike, onComment, onDelete}) {
  const { user, isAuthenticated } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const isAuthor = user?.id === post.user_id;
  const isAdmin = user?.role === "admin";
  const canDelete = isAuthor || isAdmin;

  const toggleOptions = useCallback(() => {
    setShowOptions(prev => !prev);
  }, []);

  const handleLike = useCallback(() => {
    onLike(post.id);
  }, [onLike, post.id]);

  const handleComment = useCallback(() => {
    onComment(post);
  }, [onComment, post]);

  const handleDelete = useCallback(() => {
    onDelete(post.id);
    setShowOptions(false);
  }, [onDelete, post.id]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={post.user_avatar || "https://via.placeholder.com/150"}
            alt={post.user_name || "Anonymous"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{post.user_name || "Anonymous"}</h3>
            <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
          </div>
        </div>

        {canDelete && (
          <div className="relative">
            <button
              onClick={toggleOptions}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <button
                  onClick={handleDelete}
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
      <Link to={`/community/post/${post.slug}`}>
        <p className="text-gray-700 mb-4">{post.caption}</p>
        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post"
            className="rounded-lg w-full object-cover mb-4"
          />
        )}
      </Link>

      {/* Post Actions */}
      <div className="flex items-center gap-6 pt-4 border-t">
        <button
          onClick={handleLike}
          className={classNames(
            "flex items-center gap-2",
            post.isLiked ? "text-red-500" : "text-gray-600 hover:text-[#1A3C8E]"
          )}
        >
          <Heart className={classNames("w-5 h-5", post.isLiked && "fill-current")} />
          <span>{post.likes_count}</span>
        </button>
        <button
          onClick={handleComment}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments_count}</span>
        </button>
      </div>
    </div>
  );
}

export default PostCard;
