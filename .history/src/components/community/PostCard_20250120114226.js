import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function PostCard({ post, onLike, onComment, onDelete, onEdit }) {
  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);

  // Log để debug
  console.log('Current user:', user);
  console.log('Post author:', post.author);

  // Kiểm tra quyền quản lý bài viết
  const canManagePost = () => {
    if (!user) return false;
    
    // Kiểm tra xem user hiện tại có phải là tác giả của bài viết
    const isAuthor = user.id === post.author.id;
    const isAdmin = user.role === "admin";
    
    console.log('Can manage post check:', {
      userId: user.id,
      authorId: post.author.id,
      userRole: user.role,
      isAuthor,
      isAdmin
    });
    
    return isAuthor || isAdmin;
  };

  // Kiểm tra quyền sửa bài viết (chỉ tác giả mới được sửa)
  const canEditPost = () => {
    if (!user) return false;
    const isAuthor = user.id === post.author.id;
    console.log('Can edit post check:', {
      userId: user.id,
      authorId: post.author.id,
      isAuthor
    });
    return isAuthor;
  };

  // Kiểm tra quyền xóa bài viết (admin hoặc tác giả)
  const canDeletePost = () => {
    if (!user) return false;
    const isAuthor = user.id === post.author.id;
    const isAdmin = user.role === "admin";
    console.log('Can delete post check:', {
      userId: user.id,
      authorId: post.author.id,
      userRole: user.role,
      isAuthor,
      isAdmin
    });
    return isAdmin || isAuthor;
  };

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

        {/* Chỉ hiển thị menu nếu user có quyền quản lý */}
        {canManagePost() && (
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                {/* Chỉ hiển thị nút Edit nếu là tác giả */}
                {canEditPost() && (
                  <button
                    onClick={() => {
                      onEdit(post);
                      setShowOptions(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Edit Post
                  </button>
                )}
                
                {/* Chỉ hiển thị nút Delete nếu là admin hoặc tác giả */}
                {canDeletePost() && (
                  <button
                    onClick={() => {
                      onDelete(post.id);
                      setShowOptions(false);
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    Delete Post
                  </button>
                )}
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
      </div>
    </div>
  );
}

export default PostCard;
