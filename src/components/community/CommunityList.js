import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import CreatePostModal from "./CreatePostModal";
import CommentModal from "./CommentModal";
import EditPostModal from "./EditPostModal";

// Mock service tạm thời
const communityService = {
  getPosts: () => {
    return Promise.resolve([
      {
        id: 1,
        content: "My lovely cat! 🐱",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
        author: {
          id: 1,
          name: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        likes: 12,
        comments: [],
        createdAt: "2 hours ago",
        isLiked: false,
      },
    ]);
  },

  createPost: (postData) => {
    // Tạo post mới với dữ liệu đã được xử lý
    return Promise.resolve({
      id: Date.now(),
      content: postData.content,
      image: postData.image, // Sử dụng base64 string trực tiếp
      author: postData.author,
      likes: 0,
      comments: [],
      createdAt: "Just now",
      isLiked: false,
    });
  },

  deletePost: (postId) => {
    return Promise.resolve(true);
  },
  updatePost: (postId, updatedData) => {
    return Promise.resolve({
      id: postId,
      ...updatedData,
      createdAt: "Just now (edited)",
    });
  },
  likePost: (postId) => Promise.resolve(true),
  unlikePost: (postId) => Promise.resolve(true),
};

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = user?.role === "admin";
  const menuRefs = useRef({});

  // Helper functions
  const isAuthor = (post) => user?.id === post.author?.id;
  const canEdit = (post) => isAuthor(post);
  const canDelete = (post) => isAdmin || isAuthor(post);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Lấy posts từ localStorage trước
        const savedPosts = storageService.getPosts();
        if (savedPosts && savedPosts.length > 0) {
          setPosts(savedPosts);
        } else {
          // Nếu không có trong localStorage thì lấy từ service
          const data = await communityService.getPosts();
          setPosts(data);
          // Lưu vào localStorage
          storageService.savePosts(data);
        }
      } catch (err) {
        setError(t("community.errors.loadFailed"));
      } finally {
        setLoading(false);
      }
    };
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
        alert(t("community.hero.loginRequired"));
        return false;
      }

      const newPost = await communityService.createPost({
        content: postData.content,
        image: postData.image, // Đã là base64 string từ CreatePostModal
        author: {
          id: user?.id || 1,
          name: user?.name || "Anonymous",
          avatar: user?.avatar || "https://via.placeholder.com/150",
        },
      });

      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      storageService.savePosts(updatedPosts);
      setIsCreateModalOpen(false);
      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      alert(t("community.errors.createFailed"));
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
      if (post.isLiked) {
        await communityService.unlikePost(postId);
      } else {
        await communityService.likePost(postId);
      }

      // Update UI
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      addToast({
        type: "error",
        message: t("community.errors.likeError"),
      });
    }
  };

  const handleComment = (post) => {
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  const handleEdit = (post) => {
    setOpenMenuId(null);
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (postId) => {
    if (window.confirm(t("community.post.deleteConfirm"))) {
      try {
        const post = posts.find((p) => p.id === postId);
        if (!canDelete(post)) {
          alert(t("community.errors.unauthorized"));
          return;
        }
        await communityService.deletePost(postId);
        const updatedPosts = posts.filter((p) => p.id !== postId);
        setPosts(updatedPosts);
        storageService.savePosts(updatedPosts);
        setOpenMenuId(null);
      } catch (error) {
        console.error("Error deleting post:", error);
        alert(t("community.errors.deleteFailed"));
      }
    }
  };

  const handleUpdatePost = async (updatedData) => {
    try {
      const updatedPost = await communityService.updatePost(selectedPost.id, {
        ...selectedPost,
        ...updatedData,
      });

      const updatedPosts = posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setPosts(updatedPosts);
      storageService.savePosts(updatedPosts);

      setIsEditModalOpen(false);
      setSelectedPost(null);
    } catch (error) {
      console.error("Error updating post:", error);
      alert(t("community.errors.updateFailed"));
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
              <div
                key={post.id}
                className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden relative group"
              >
                <img
                  src={post.image}
                  alt={post.content}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                  {/* Post Header with Edit/Delete */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          post.author?.avatar ||
                          "https://via.placeholder.com/150"
                        }
                        alt={post.author?.name || "Anonymous"}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-white">
                        <p className="font-semibold text-sm">
                          {post.author?.name || "Anonymous"}
                        </p>
                        <p className="text-xs opacity-75">{post.createdAt}</p>
                      </div>
                    </div>

                    {/* Show Edit/Delete buttons only for post author */}
                    {(canEdit(post) || canDelete(post)) && (
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(
                              openMenuId === post.id ? null : post.id
                            );
                          }}
                          className="p-1 text-white hover:bg-white/20 rounded-full"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>

                        {openMenuId === post.id && (
                          <div
                            ref={(el) => (menuRefs.current[post.id] = el)}
                            className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg py-1 z-10"
                          >
                            {canEdit(post) && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(post);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                              >
                                {t("community.menu.edit")}
                              </button>
                            )}
                            {canDelete(post) && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(post.id);
                                }}
                                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                              >
                                {t("community.menu.delete")}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Post Content - Centered */}
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-white text-center text-sm line-clamp-3 max-w-[80%]">
                      {post.content}
                    </p>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-center gap-4 text-white">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1 ${
                        !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!isAuthenticated}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          post.isLiked ? "fill-current text-red-500" : ""
                        }`}
                      />
                      <span>
                        {post.likes} {t("community.post.likes")}
                      </span>
                    </button>
                    <button
                      onClick={() => handleComment(post)}
                      className="flex items-center gap-1"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>
                        {post.comments?.length || post.commentsCount || 0}{" "}
                        {t("community.post.comments")}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
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
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
        onUpdate={handleUpdatePost}
      />
    </div>
  );
}

export default CommunityList;
