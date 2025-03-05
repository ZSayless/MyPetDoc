import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, MoreHorizontal, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { communityService } from "../../services/communityService";
import CommentModal from "./CommentModal";
import classNames from 'classnames';
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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

  const fetchPostDetail = async () => {
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

  useEffect(() => {
    fetchPostDetail();
  }, [slug, isAuthenticated]);

  const handleCommentUpdate = () => {
    fetchPostDetail();
  };

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

      setPost(prevPost => ({
        ...prevPost,
        likes_count: isLiked ? prevPost.likes_count - 1 : prevPost.likes_count + 1
      }));
      setIsLiked(!isLiked);

    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(t("community.deletePost.confirmation"))) {
      try {
        await communityService.deletePost(post.id);
        navigate("/community");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  // Thêm hàm để lấy label của pet type
  const getPetTypeLabel = (value) => {
    const petTypes = [
      {value: "DOG", label: t("community.petTypes.dog")},
      {value: "CAT", label: t("community.petTypes.cat")},
      {value: "BIRD", label: t("community.petTypes.bird")},
      {value: "FISH", label: t("community.petTypes.fish")},
      {value: "REPTILE", label: t("community.petTypes.reptile")},
      {value: "RABBIT", label: t("community.petTypes.rabbit")},
      {value: "HAMSTER", label: t("community.petTypes.hamster")},
      {value: "OTHER", label: t("community.petTypes.other")},
    ];
    return petTypes.find(type => type.value === value)?.label || value;
  };

  // Hàm để lấy label của tag
  const getTagLabel = (tagValue) => {
    const tag = AVAILABLE_TAGS.find(t => t.value === tagValue);
    return tag ? tag.label : tagValue;
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
        {t("community.postNotFound")}
      </div>
    );

  const isAuthor = user?.id === post.user_id;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate("/bloglist")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E] mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t("community.backToCommunity")}</span>
        </button>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : post ? (
            <>
              {/* Post Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={post.user_avatar || "https://via.placeholder.com/150"}
                      alt={post.user_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{post.user_name}</h3>
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
                
                <h1 className="text-2xl font-bold mb-4">{post.caption}</h1>
                
                {/* Pet Type and Tags */}
                <div className="px-6 mb-4">
                  {/* Pet Type Badge */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#98E9E9] text-[#1A3C8E]">
                      {getPetTypeLabel(post.pet_type)}
                    </span>
                  </div>

                  {/* Tags */}
                  {post.tags && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600"
                        >
                          #{getTagLabel(tag.trim())}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description if exists */}
                {post.description && (
                  <p className="text-gray-700 mb-6">{post.description}</p>
                )}
              </div>

              {/* Post Image */}
              {post.image_url && (
                <div className="border-b">
                  <img
                    src={post.image_url}
                    alt="Post"
                    className="w-full object-cover max-h-[600px]"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="p-6 flex items-center gap-6 border-b">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 ${
                    isLiked ? "text-red-500" : "text-gray-600 hover:text-[#1A3C8E]"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked && "fill-current"}`} />
                  <span className="font-medium">{post.likes_count}</span>
                </button>
                <button
                  onClick={() => setIsCommentModalOpen(true)}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="font-medium">{post.comments_count}</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="p-6">
                <button
                  onClick={() => setIsCommentModalOpen(true)}
                  className="w-full py-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {t("community.addComment")}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={post}
        onCommentUpdate={handleCommentUpdate}
      />
    </div>
  );
}

export default PostDetail;
