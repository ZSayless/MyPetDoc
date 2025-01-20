import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Heart, MessageCircle, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

function CommunityPost({ post, onDelete }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const optionsButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsRef.current && 
        !optionsRef.current.contains(event.target) &&
        !optionsButtonRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          {/* ... user info ... */}
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
      {/* ... rest of the component ... */}
    </div>
  );
}

export default CommunityPost; 