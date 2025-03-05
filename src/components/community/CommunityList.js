import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, MoreHorizontal, Search, Filter, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import CreatePostModal from "./CreatePostModal";
import PostCard from "./PostCard";
import { communityService } from "../../services/communityService";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isAdmin = user?.role === "admin";
  const menuRefs = useRef({});

  // Thêm states mới cho tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPetTypes, setSelectedPetTypes] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const PET_TYPES_SEARCH = [
    {value: "DOG", label: t("community.petTypes.dog")},
    {value: "CAT", label: t("community.petTypes.cat")},
    {value: "BIRD", label: t("community.petTypes.bird")},
    {value: "FISH", label: t("community.petTypes.fish")},
    {value: "REPTILE", label: t("community.petTypes.reptile")},
    {value: "RABBIT", label: t("community.petTypes.rabbit")},
    {value: "HAMSTER", label: t("community.petTypes.hamster")},
    {value: "OTHER", label: t("community.petTypes.other")},
  ];

  const AVAILABLE_TAGS = [
    { value: "healthTips", label: t("community.tags.healthTips") },
    { value: "petCare", label: t("community.tags.petCare") },
    { value: "nutrition", label: t("community.tags.nutrition") },
    { value: "behavior", label: t("community.tags.behavior") },
    { value: "training", label: t("community.tags.training") },
    { value: "grooming", label: t("community.tags.grooming") },
    { value: "vaccination", label: t("community.tags.vaccination") },
    { value: "diseasePrevention", label: t("community.tags.diseasePrevention") },
    { value: "firstAid", label: t("community.tags.firstAid") },
    { value: "mentalHealth", label: t("community.tags.mentalHealth") },
    { value: "exercise", label: t("community.tags.exercise") },
    { value: "breeding", label: t("community.tags.breeding") },
    { value: "seniorPetCare", label: t("community.tags.seniorPetCare") },
    { value: "puppyCare", label: t("community.tags.puppyCare") },
    { value: "emergencyCare", label: t("community.tags.emergencyCare") },
    { value: "cute", label: t("community.tags.cute") }
  ];

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
      
      // Thực hiện like/unlike trực tiếp
      if (post.isLiked) {
        await communityService.unlikePost(postId);
      } else {
        await communityService.likePost(postId);
      }

      // Cập nhật UI ngay lập tức
      setPosts(prevPosts =>
        prevPosts.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              likes_count: p.isLiked ? p.likes_count - 1 : p.likes_count + 1,
              isLiked: !p.isLiked
            };
          }
          return p;
        })
      );

    } catch (error) {
      console.error("Error liking/unliking post:", error);
      addToast({
        type: "error",
        message: error.response?.data?.message || t("community.errors.likeError")
      });
    }
  };

  const handleComment = (post) => {
    navigate(`/community/post/${post.slug}`);
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
            message: response.message || t("community.post.deleteSuccess")
          });
        } else {
          addToast({
            type: "error",
            message: response.message || t("community.post.deleteFailed")
          });
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        addToast({
          type: "error",
          message: error.response?.data?.message || t("community.post.deleteFailed")
        });
      }
    }
  };

  const handlePetTypeToggle = (type) => {
    setSelectedPetTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleTagToggle = (tagValue) => {
    setSelectedTags(prev => {
      if (prev.includes(tagValue)) {
        return prev.filter(t => t !== tagValue);
      } else {
        return [...prev, tagValue];
      }
    });
  };

  // Cập nhật hàm filter để bao gồm cả tags
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === "" ||
      post.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags && post.tags.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPetType = selectedPetTypes.length === 0 ||
      selectedPetTypes.includes(post.pet_type);

    const matchesTags = selectedTags.length === 0 ||
      (post.tags && selectedTags.some(tag => 
        post.tags.toLowerCase().includes(tag.toLowerCase())
      ));

    return matchesSearch && matchesPetType && matchesTags;
  });

  if (loading) return <div>{t("community.loading")}</div>;
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
          onClick={() => setIsCreateModalOpen(true)}
          className="px-8 py-3 bg-[#1A3C8E] text-white rounded-full font-medium hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors"
        >
          {t("community.hero.shareButton")}
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t("community.search.placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={() => setShowFilterModal(true)}
              className="md:hidden w-full px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center gap-2"
            >
              <Filter className="w-5 h-5" />
              <span>{t("community.search.button")}</span>
            </button>
          </div>

          {/* Desktop Pet Types Filter */}
          <div className="hidden md:flex flex-wrap gap-2 mt-6">
            <h3 className="w-full text-sm font-medium text-gray-700 mb-2">{t("community.petTypes.filter")}</h3>
            {PET_TYPES_SEARCH.map((type) => (
              <button
                key={type.value}
                onClick={() => handlePetTypeToggle(type.value)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedPetTypes.includes(type.value)
                    ? "bg-[#98E9E9] text-gray-900 font-medium"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Tags Filter Desktop */}
          <div className="hidden md:flex flex-wrap gap-2 mt-6">
            <h3 className="w-full text-sm font-medium text-gray-700 mb-2">{t("community.tags.filter")}</h3>
            {AVAILABLE_TAGS.map((tag) => (
              <button
                key={tag.value}
                onClick={() => handleTagToggle(tag.value)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedTags.includes(tag.value)
                    ? "bg-[#98E9E9] text-gray-900 font-medium"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
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

      {/* Filter Modal for Mobile */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end md:hidden">
          <div className="bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Mobile Pet Types */}
            <div className="p-4">
              <h4 className="font-medium mb-2">{t("community.petTypes.filter")}</h4>
              <div className="grid grid-cols-2 gap-2">
                {PET_TYPES_SEARCH.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handlePetTypeToggle(type.value)}
                    className={`px-4 py-2 rounded-full transition-all text-sm ${
                      selectedPetTypes.includes(type.value)
                        ? "bg-[#98E9E9] text-gray-900 font-medium"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Tags */}
            <div className="p-4 border-t">
              <h4 className="font-medium mb-2">{t("community.tags.filter")}</h4>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_TAGS.map((tag) => (
                  <button
                    key={tag.value}
                    onClick={() => handleTagToggle(tag.value)}
                    className={`px-4 py-2 rounded-full transition-all text-sm ${
                      selectedTags.includes(tag.value)
                        ? "bg-[#98E9E9] text-gray-900 font-medium"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t">
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-full py-3 bg-[#98E9E9] text-gray-900 font-medium rounded-full hover:bg-[#7CD5D5]"
              >
                {t("community.search.apply")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPost={handleNewPost}
      />
    </div>
  );
}

export default CommunityList;
