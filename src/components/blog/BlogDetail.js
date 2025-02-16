import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { X, MoreHorizontal, Flag, Trash2, Heart, MessageCircle, ArrowLeft } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import classNames from 'classnames';
import { useToast } from "../../context/ToastContext";
import { blogPostService } from "../../services/blogPostService";
import CommentModal from "./CommentModal";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { t } = useTranslation();
  const menuRefs = useRef({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await blogPostService.getPostBySlug(slug);
        if (response.success) {
          setPost(response.data);
          setLikesCount(response.data.likes_count || 0);

          // Check like status if user is authenticated
          if (isAuthenticated) {
            const likeCheckResponse = await blogPostService.checkLiked(response.data.id);
            if (likeCheckResponse.success) {
              setIsLiked(likeCheckResponse.data.hasLiked);
            }
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

    fetchPost();
  }, [slug, isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickedOutside = Object.values(menuRefs.current).every(
        (ref) => ref && !ref.contains(event.target)
      );
      if (isClickedOutside) {
        setSelectedComment(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleLike = async () => {
    if (!isAuthenticated) {
      addToast({
        type: "error",
        message: "Vui lòng đăng nhập để thực hiện chức năng này"
      });
      return;
    }

    try {
      const response = await blogPostService.toggleLike(post.id);
      if (response.success) {
        setIsLiked(response.data.hasLiked);
        setLikesCount(response.data.likesCount);
        setPost(prev => ({
          ...prev,
          likes_count: response.data.likesCount
        }));
        
        addToast({
          type: "success",
          message: response.message
        });
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      addToast({
        type: "error",
        message: "Có lỗi xảy ra khi thực hiện chức năng like"
      });
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert(t("blog.comments.loginRequired"));
      return;
    }

    const comment = {
      id: Date.now(),
      content: newComment,
      author: user,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleReplySubmit = (e, parentId) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert(t("blog.comments.loginRequired"));
      return;
    }

    const reply = {
      id: Date.now(),
      content: e.target.reply.value,
      author: user,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply],
          };
        }
        return comment;
      })
    );

    setReplyingTo(null);
  };

  const handleReportComment = (commentId) => {
    setSelectedComment(null);
    alert(t("blog.comments.reportSuccess"));
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm(t("blog.comments.confirmDelete"))) {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    }
  };

  useEffect(() => {
    if (!selectedComment) {
      setShowReportModal(false);
    }
  }, [selectedComment]);

  // Format date
  const formattedDate = post?.created_at ? 
    formatDistance(new Date(post.created_at), new Date(), {
      addSuffix: true,
      locale: vi
    }) : '';

  // Convert tags string to array
  const tagsList = post?.tags ? post.tags.split(',').map(tag => tag.trim()) : [];


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Blog not found</div>;

  const isAuthor = user?.id === post.author_id;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate("/bloglist")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E] mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại Blog</span>
        </button>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
          {/* Post Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <img
                src={post.author_avatar}
                alt={post.author_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{post.author_name}</h3>
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
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            {post.featured_image && (
              <LazyLoadImage
                src={post.featured_image}
                alt={post.title}
                effect="blur"
                className="w-full rounded-lg mb-6"
              />
            )}
            <div 
              className="prose max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="flex items-center gap-6 p-6 border-t">
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
              <span>{likesCount}</span>
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

      {/* Comment Modal */}
      <CommentModal 
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={post}
      />
    </div>
  );
};

export default BlogDetail;