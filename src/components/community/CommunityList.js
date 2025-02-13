import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import CreatePostModal from "./CreatePostModal";
import CommentModal from "./CommentModal";
import PostCard from "./PostCard";
import { communityService } from "../../services/communityService";


// Mock storage service
const storageService = {
  getPosts: () => {
    const posts = localStorage.getItem("community_posts");
    return posts ? JSON.parse(posts) : null;
  },
  savePosts: (posts) => {
    localStorage.setItem("community_posts", JSON.stringify(posts));
  },
};

function CommunityList() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isAdmin = user?.role === "admin";
  const menuRefs = useRef({});

  // Helper functions
  const isAuthor = (post) => user?.id === post.author?.id;
  const canDelete = (post) => isAdmin || isAuthor(post);

  const fetchPosts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await communityService.getPosts(pageNumber);

      if (response.success) {
        const newPosts = response.data.posts;
        if (pageNumber === 1) {
          setPosts(newPosts);
        } else {
          setPosts(prev => [...prev, ...newPosts]);
        }
        
        setHasMore(pageNumber < response.data.pagination.totalPages);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(error.response?.data?.message || t("community.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const activeMenuRef = menuRefs.current[openMenuId];
      if (
        selectedPost &&
        activeMenuRef &&
        !activeMenuRef.contains(event.target)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const handleNewPost = async (postData) => {
    try {
      if (!user) {
        addToast({
          type: "error", 
          message: t("community.hero.loginRequired")
        });
        return false;
      }

      const response = await communityService.createPost(postData);
      
      if (response.success) {
        // Thêm bài đăng mới vào đầu danh sách
        setPosts(prevPosts => [response.data, ...prevPosts]);
        setIsCreateModalOpen(false);
        fetchPosts();
        addToast({
          type: "success",
          message: t("community.post.createSuccess")
        });
        return true;
      } else {
        addToast({
          type: "error",
          message: response.message || t("community.errors.createFailed")
        });
        return false;
      }
    } catch (error) {
      console.error("Error creating post:", error);
      addToast({
        type: "error",
        message: error.response?.data?.message || t("community.errors.createFailed")
      });
      return false;
    }
  };

  const handleLike = async (postId) => {
    if (!isAuthenticated) {
      addToast({
        type: "error",
        message: t("community.errors.loginRequired"),
      });
      return;
    }

    try {
      const post = posts.find((p) => p.id === postId);
      const checkLikeResponse = await communityService.checkLikedPost(postId);
      const hasLiked = checkLikeResponse.data.data.hasLiked;

      if (hasLiked) {
        await communityService.unlikePost(postId);
      } else {
        await communityService.likePost(postId);
      }

      // Fetch lại post để lấy số like chính xác
      const response = await communityService.getPostBySlug(post.slug);
      if (response.success) {
        // Cập nhật UI với số like mới từ server
        setPosts(prevPosts =>
          prevPosts.map(p => {
            if (p.id === postId) {
              return {
                ...p,
                likes_count: response.data.likes_count,
                isLiked: !hasLiked
              };
            }
            return p;
          })
        );
      }

    } catch (error) {
      console.error("Error liking/unliking post:", error);
      addToast({
        type: "error",
        message: error.response?.data?.message || t("community.errors.likeError")
      });
    }
  };

  // Chỉ fetch trạng thái like một lần sau khi lấy posts
  useEffect(() => {
    const fetchPostsLikeStatus = async () => {
      if (!isAuthenticated || posts.length === 0) return;

      try {
        const likeStatusPromises = posts.map(post => 
          communityService.checkLikedPost(post.id)
        );
        
        const likeStatuses = await Promise.all(likeStatusPromises);
        
        setPosts(prevPosts => 
          prevPosts.map((post, index) => ({
            ...post,
            isLiked: likeStatuses[index].data.data.hasLiked
          }))
        );
      } catch (error) {
        console.error("Error fetching posts like status:", error);
      }
    };

    fetchPostsLikeStatus();
  }, [posts.length, isAuthenticated]);

  const handleComment = (post) => {
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  const handleDelete = async (postId) => {
    if (window.confirm(t("community.post.deleteConfirm"))) {
      try {
        const response = await communityService.deletePost(postId);
        
        if (response.success) {
          // Cập nhật state để xóa bài đăng khỏi danh sách
          setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
          addToast({
            type: "success",
            message: response.message || "Post deleted successfully"
          });
        } else {
          addToast({
            type: "error",
            message: response.message || "Failed to delete post"
          });
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        addToast({
          type: "error",
          message: error.response?.data?.message || "Failed to delete post"
        });
      }
    }
  };


  const handleCommentAdded = (postId, newComment) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) => {
        if (post.id === postId) {
          const updatedPost = {
            ...post,
            comments: [...(post.comments || []), newComment],
            commentsCount: (post.commentsCount || 0) + 1,
          };
          // Cập nhật selectedPost nếu đang mở modal comment
          if (selectedPost?.id === post.id) {
            setSelectedPost(updatedPost);
          }
          return updatedPost;
        }
        return post;
      });
      return updatedPosts;
    });
  };

  const handleShareClick = () => {
    if (!user) {
      alert(t("community.hero.loginRequired"));
      return;
    }
    setIsCreateModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#98E9E9]/40 to-white py-20 text-center">
        <h1 className="text-4xl font-bold text-[#1A3C8E] mb-4">
          {t("community.hero.title")}
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          {t("community.hero.subtitle")}
        </p>
        <button
          onClick={handleShareClick}
          className="px-8 py-3 bg-[#1A3C8E] text-white rounded-full font-medium hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors"
        >
          {t("community.hero.shareButton")}
        </button>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPost={handleNewPost}
      />
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={selectedPost}
        onCommentAdded={handleCommentAdded}
      />
    </div>
  );
}

export default CommunityList;
