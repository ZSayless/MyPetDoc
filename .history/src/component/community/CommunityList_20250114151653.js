import { useState } from "react";
import { Search } from "lucide-react";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";
import CommentModal from "./CommentModal";
import ShareModal from "./ShareModal";
import EditPostModal from "./EditPostModal";
import { useAuth } from "../../context/AuthContext";

function CommunityList() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Dữ liệu mẫu
  const posts = [
    {
      id: 1,
      author: {
        id: 1,
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      },
      content: "My lovely cat just had her first vaccination today! She was so brave 🐱",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
      createdAt: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false
    },
    {
      id: 2,
      author: {
        id: 2,
        name: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      },
      content: "Look at my new puppy! His name is Max and he loves playing fetch 🐕",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
      createdAt: "4 hours ago",
      likes: 42,
      comments: 12,
      shares: 5,
      isLiked: true
    },
    {
      id: 3,
      author: {
        id: 3,
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      },
      content: "Had a great checkup at the vet today. Everything is perfect with my golden retriever! 🏥🐕",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
      createdAt: "6 hours ago",
      likes: 18,
      comments: 4,
      shares: 2,
      isLiked: false
    }
  ];

  const handleLike = async (postId) => {
    // TODO: Implement like functionality with API
    console.log("Like post:", postId);
  };

  const handleComment = (post) => {
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  const handleShare = (post) => {
    setSelectedPost(post);
    setIsShareModalOpen(true);
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (postId) => {
    // TODO: Implement delete functionality with API
    console.log("Delete post:", postId);
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-600">No posts found</div>
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={selectedPost}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        post={selectedPost}
      />
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={selectedPost}
      />
    </div>
  );
}

export default CommunityList; 