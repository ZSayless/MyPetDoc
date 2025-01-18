import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import CreatePostModal from "./CreatePostModal";
import { useAuth } from "../../context/AuthContext";
import { Heart, MessageCircle } from "lucide-react";

function Community() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();
  const [posts, setPosts] = useState([
    // Mock data cho posts
    {
      id: 1,
      author: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      },
      content: "My lovely cat just had her first vaccination today!",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
      createdAt: "2 hours ago",
      likes: 24,
      comments: 12,
    },
    // Thêm các post khác...
  ]);

  const handleShareClick = () => {
    if (!user) {
      alert("Please login to share your story");
      return;
    }
    setShowCreateModal(true);
  };

  const handleNewPost = (newPost) => {
    setPosts([
      {
        id: Date.now(),
        author: {
          name: user.name,
          avatar: user.avatar || "https://via.placeholder.com/40",
        },
        content: newPost.content,
        image: newPost.image,
        createdAt: "Just now",
        likes: 0,
        comments: 0,
      },
      ...posts,
    ]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#98E9E9]/40 to-white py-20 text-center">
        <h1 className="text-4xl font-bold text-[#1A3C8E] mb-4">
          Pet Lovers Community
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Share your pet stories and connect with other pet lovers
        </p>
        <button 
          onClick={handleShareClick}
          className="px-8 py-3 bg-[#1A3C8E] text-white rounded-full font-medium hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors"
        >
          Share Your Story
        </button>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
            <LazyLoadImage
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
              alt="Cat"
              effect="blur"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
            <LazyLoadImage
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e"
              alt="Dog"
              effect="blur"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
            <LazyLoadImage
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c"
              alt="Golden Retriever"
              effect="blur"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#1A3C8E] mb-8">Latest Stories</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Post Header */}
              <div className="p-4 flex items-center gap-3">
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

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-gray-700">{post.content}</p>
              </div>

              {/* Post Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full aspect-video object-cover"
                />
              )}

              {/* Post Actions */}
              <div className="px-4 py-3 border-t flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPost={handleNewPost}
      />
    </div>
  );
}

export default Community;
