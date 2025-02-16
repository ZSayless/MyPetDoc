import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import classNames from "classnames";
import CommentModal from "./CommentModal";
import { blogPostService } from "../../services/blogPostService";

const BlogCard = ({ blog, onLike }) => {
  const { t } = useTranslation();
  const {
    title,
    summary,
    thumbnail_image,
    slug,
    created_at,
    author_name,
    author_avatar,
    tags,
    likes_count,
    comments_count
  } = blog;

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [isLiked, setIsLiked] = useState(blog.isLiked || false);
  const [likesCount, setLikesCount] = useState(blog.likes_count || 0);
  const navigate = useNavigate();

  // Chuyển đổi tags từ string sang array
  const tagsList = typeof tags === 'string' ? tags.split(',') : tags;

  // Format date
  const formattedDate = formatDistance(new Date(created_at), new Date(), {
    addSuffix: true,
    locale: vi
  });

  // Only check like status once when component mounts and when blog.id or isAuthenticated changes
  useEffect(() => {
    let isMounted = true;

    const checkLikeStatus = async () => {
      if (!isAuthenticated || !blog.id) return;

      try {
        const response = await blogPostService.checkLiked(blog.id);
        if (response.success && isMounted) {
          setIsLiked(response.data.hasLiked);
        }
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    checkLikeStatus();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [blog.id, isAuthenticated]); // Only run when blog.id or isAuthenticated changes

  const handleLike = useCallback(() => {
    if (!isAuthenticated) {
      addToast({
        type: "error",
        message: "Please login to perform this action"
      });
      return;
    }
    onLike(blog.id);
  }, [blog.id, isAuthenticated, addToast, onLike]);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/blog/${slug}`}>
        <div className="relative aspect-[16/9]">
          <LazyLoadImage
            src={thumbnail_image}
            alt={title}
            effect="blur"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tagsList.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link to={`/blog/${slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {summary}
        </p>

        {/* Author Info & Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={author_avatar}
              alt={author_name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{author_name}</p>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex items-center gap-6 p-4 border-t">
          <div className="flex items-center gap-2 text-gray-600">
            <Heart className="w-5 h-5" />
            <span>{blog.likes_count || 0}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCommentModalOpen(true);
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{blog.comments_count || 0}</span>
          </button>
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal 
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={blog}
      />
    </div>
  );
};

export default BlogCard;