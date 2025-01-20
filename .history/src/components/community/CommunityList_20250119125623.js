import { useState, useEffect } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

import CreatePostModal from "./CreatePostModal";
import CommentModal from "./CommentModal";
import EditPostModal from "./EditPostModal";
import { useAuth } from "../../context/AuthContext";
import { communityService } from "../../services/communityService";

function CommunityList() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = user?.role === "admin";

  // Helper functions
  const isAuthor = (post) => user?.id === post.author.id;
  const canEdit = (post) => isAuthor(post) && !isAdmin;
  const canDelete = (post) => isAdmin || isAuthor(post);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await communityService.getPosts();
        setPosts(data);
      } catch (err) {
        setError(t("community.errors.loadFailed"));
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleNewPost = async (postData) => {
    try {
      const newPost = await communityService.createPost({
        author: {
          id: user?.id,
          name: user?.name,
          avatar: user?.avatar || "https://via.placeholder.com/150",
        },
        ...postData
      });
      setPosts([newPost, ...posts]);
      setIsCreateModalOpen(false);
      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      alert(t("community.errors.createFailed"));
      return false;
    }
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleComment = (post) => {
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  const handleEdit = async (post) => {
    if (!canEdit(post)) {
      if (isAdmin) {
        alert(t("community.errors.adminCannotEdit"));
      } else {
        alert(t("community.errors.unauthorized"));
      }
      return;
    }
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (postId) => {
    if (window.confirm(t("community.post.deleteConfirm"))) {
      try {
        const post = posts.find(p => p.id === postId);
        if (!canDelete(post)) {
          alert(t("community.errors.unauthorized"));
          return;
        }
        await communityService.deletePost(postId);
        setPosts(posts.filter(p => p.id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
        alert(t("community.errors.deleteFailed"));
      }
    }
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setIsEditModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#98E9E9] to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A3C8E] mb-4">
              {t("community.hero.title")}
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              {t("community.hero.subtitle")}
            </p>
            {user ? (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-block px-8 py-3 bg-[#1A3C8E] text-white rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors"
              >
                {t("community.hero.shareButton")}
              </button>
            ) : (
              <p className="text-gray-600">
                {t("community.hero.loginRequired")}
              </p>
            )}
          </div>
        </div>
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
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                  {/* Post Header with Edit/Delete */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-white">
                        <p className="font-semibold text-sm">
                          {post.author.name}
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
                            setSelectedPost(post);
                          }}
                          className="p-1 text-white hover:bg-white/20 rounded-full"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>

                        {selectedPost?.id === post.id && (
                          <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg py-1 z-10">
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

                  {/* Post Content */}
                  <div className="text-white text-center">
                    <p>{post.description}</p>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-center gap-4 text-white">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1"
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
                        {post.comments} {t("community.post.comments")}
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
      />
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={selectedPost}
        onUpdate={handleUpdatePost}
      />
    </div>
  );
}

export default CommunityList;
