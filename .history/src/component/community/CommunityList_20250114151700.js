import { useState } from "react";
import { Search, Plus } from "lucide-react";
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
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
      title: "Cute Cat",
      description: "My lovely cat just had her first vaccination today!"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
      title: "Playful Puppy",
      description: "Max loves playing fetch in the park"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
      title: "Golden Retriever",
      description: "Perfect health checkup at the vet today"
    },
    // Thêm nhiều posts khác...
  ];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A3C8E] mb-2">
            Share your favorite pet moments with our community!
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-6">
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

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Post Card */}
          {user && (
            <div 
              onClick={() => setIsCreateModalOpen(true)}
              className="aspect-square bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#98E9E9] transition-colors"
            >
              <Plus className="w-12 h-12 text-gray-400" />
              <p className="mt-2 text-gray-600">Create New Post</p>
            </div>
          )}

          {/* Post Cards */}
          {filteredPosts.map((post) => (
            <div key={post.id} className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p>{post.description}</p>
                </div>
              </div>
            </div>
          ))}
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