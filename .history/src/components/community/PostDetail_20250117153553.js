import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { communityService } from "../../services/communityService";
import CommentModal from "./CommentModal";
import EditPostModal from "./EditPostModal";

function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await communityService.getPostById(postId);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    try {
      if (post.isLiked) {
        await communityService.unlikePost(postId);
      } else {
        await communityService.likePost(postId);
      }
      // Refresh post data
      const response = await communityService.getPostById(postId);
      setPost(response.data);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await communityService.deletePost(postId);
        navigate("/community");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Post not found
      </div>
    );

  const isAuthor = user?.id === post.authorId;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate("/community")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E] mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Community</span>
        </button>

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
                        setIsEditModalOpen(true);
                        setShowOptions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Edit Post
                    </button>
                    <button
                      onClick={() => {
                        handleDelete();
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
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 ${
                post.isLiked
                  ? "text-red-500"
                  : "text-gray-600 hover:text-[#1A3C8E]"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`}
              />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={() => setIsCommentModalOpen(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
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
