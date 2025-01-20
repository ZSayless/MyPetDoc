import React, { useState, useRef, useCallback } from "react";
import { MoreVertical, Heart, MessageCircle, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useClickOutside } from "../../hooks/useClickOutside";

function CommunityPost({ post, onDelete }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const optionsButtonRef = useRef(null);

  const handleClose = useCallback(() => {
    setShowOptions(false);
  }, []);

  useClickOutside([optionsRef, optionsButtonRef], handleClose);

  const handleOptionsClick = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(post.id);
    setShowOptions(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {/* Post Header */}
      <div className="flex justify-between items-start mb-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {post.user?.avatar ? (
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-green-600 flex items-center justify-center text-white">
                {post.user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium">{post.user?.name}</h3>
            <p className="text-sm text-gray-500">{post.createdAt}</p>
          </div>
        </div>

        {/* Options Menu */}
        <div className="relative">
          <button
            ref={optionsButtonRef}
            onClick={handleOptionsClick}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>

          {showOptions && (
            <div 
              ref={optionsRef}
              className="absolute right-0 top-10 bg-white rounded-lg shadow-lg py-2 min-w-[160px] z-10"
            >
              {(user?.id === post.userId || user?.role === "admin") && (
                <button
                  onClick={handleDeleteClick}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50"
                >
                  {t("community.deletePost")}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 mb-4">{post.content}</p>

      {/* Post Actions */}
      <div className="flex items-center gap-6 text-gray-500">
        <button className="flex items-center gap-2 hover:text-red-500">
          <Heart className="w-5 h-5" />
          <span>{post.likes || 0}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-blue-500">
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments || 0}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-green-500">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default CommunityPost; 