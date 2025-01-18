import { useState, useEffect } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

import CreatePostModal from "./CreatePostModal";
import CommentModal from "./CommentModal";
import EditPostModal from "./EditPostModal";
import { useAuth } from "../../context/AuthContext";

function CommunityList() {
  const { user } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(true);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        id: 1,
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      },
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
      title: "Cute Cat",
      description: "My lovely cat just had her first vaccination today!",
      createdAt: "2 hours ago",
      likes: 24,
      comments: 8,
      isLiked: false,
    },
    {
      id: 2,
      author: {
        id: 2,
        name: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      },
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
      title: "Playful Puppy",
      description: "Max loves playing fetch in the park",
      createdAt: "4 hours ago",
      likes: 42,
      comments: 12,
      isLiked: true,
    },
    {
      id: 3,
      author: {
        id: 3,
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      },
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
      title: "Golden Retriever",
      description: "Perfect health checkup at the vet today",
      createdAt: "6 hours ago",
      likes: 18,
      comments: 4,
      isLiked: false,
    },
  ]);

  // Thêm hàm xử lý post mới
  const handleNewPost = async (postData) => {
    try {
      // Tạo post mới với dữ liệu từ form
      const newPost = {
        id: Date.now(),
        author: {
          id: user?.id,
          name: user?.name || "Anonymous",
          avatar:
            user?.avatar ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        },
        image: postData.image,
        description: postData.content,
        createdAt: "Just now",
        likes: 0,
        comments: 0,
        isLiked: false,
      };

      // Thêm post mới vào đầu danh sách
      setPosts([newPost, ...posts]);

      // Đóng modal
      setIsCreateModalOpen(false);

      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      return false;
    }
  };

  // Xử lý like post
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

  // Xử lý comment
  const handleComment = (post) => {
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  // Thêm hàm xử lý edit post
  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  // Thêm hàm xử lý delete post
  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  // Thêm hàm xử lý update post
  const handleUpdatePost = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#98E9E9] to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A3C8E] mb-4">
              Pet Lovers Community
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Share your pet stories and connect with other pet lovers
            </p>
            {user ? (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-block px-8 py-3 bg-[#1A3C8E] text-white rounded-full hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors"
              >
                Share Your Story
              </button>
            ) : (
              <p className="text-gray-600">
                Please login to share your stories
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
                    {user?.id === post.author.id && (
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
                            <button
                              onClick={() => handleEdit(post)}
                              className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            >
                              Edit Post
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
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
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => handleComment(post)}
                      className="flex items-center gap-1"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
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
