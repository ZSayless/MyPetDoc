import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Heart, MessageCircle, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

function CommunityPost({ post, onDelete }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClick = (e) => {
      // Nếu click không phải vào menu hoặc button, đóng menu
      if (
        menuRef.current && 
        !menuRef.current.contains(e.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    };

    // Thêm event listener khi menu mở
    if (showOptions) {
      document.addEventListener('click', handleClick);
    }

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [showOptions]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showOptions]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-start mb-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          {/* ... existing code ... */}
        </div>

        {/* Options Menu */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>

          {showOptions && (
            <div
              ref={menuRef}
              className="absolute right-0 top-10 bg-white rounded-lg shadow-lg py-2 min-w-[160px] z-50"
            >
              {(user?.id === post.userId || user?.role === "admin") && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(post.id);
                    setShowOptions(false);
                  }}
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
      {/* ... existing code ... */}
    </div>
  );
}

export default CommunityPost; 