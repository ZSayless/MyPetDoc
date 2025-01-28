import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, MoreHorizontal, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { communityService } from "../../services/communityService";
import CommentModal from "./CommentModal";
import classNames from 'classnames';

function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchPostAndLikeStatus = async () => {
      try {
        setLoading(true);
        const response = await communityService.getPostBySlug(slug);
        if (response.success) {
          setPost(response.data);

          if (isAuthenticated) {
            const likeResponse = await communityService.checkLikedPost(response.data.id);
            setIsLiked(likeResponse.data.data.hasLiked);
          }
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndLikeStatus();
  }, [slug, isAuthenticated]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      if (isLiked) {
        await communityService.unlikePost(post.id);
      } else {
        await communityService.likePost(post.id);
      }

      const response = await communityService.getPostBySlug(slug);
      if (response.data.success) {
        setPost(response.data.data);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await communityService.deletePost(post.id);
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

  const isAuthor = user?.id === post.user_id;

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
                src={post.user_avatar || "https://via.placeholder.com/150"}
                alt={post.user_name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{post.user_name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleString()}
                </p>
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
            <p className="text-gray-700 mb-4">{post.caption}</p>
            {post.description && (
              <p className="text-gray-600 mb-4">{post.description}</p>
            )}
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post"
                className="rounded-lg w-full object-cover"
              />
            )}
          </div>

          {/* Post Actions */}
          <div className="flex items-center gap-6 p-4 border-t">
            <button
              onClick={handleLike}
              className={classNames(
                "flex items-center gap-2",
                isLiked ? "text-red-500" : "text-gray-600 hover:text-[#1A3C8E]"
              )}
            >
              <Heart
                className={classNames("w-5 h-5", isLiked && "fill-current")}
              />
              <span>{post.likes_count}</span>
            </button>
            <button
              onClick={() => setIsCommentModalOpen(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments_count}</span>
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
    </div>
  );
}

export default PostDetail;
