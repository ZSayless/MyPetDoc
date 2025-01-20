import React, { useState, useRef } from "react";
import { MoreVertical, Heart, MessageCircle, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { createPortal } from "react-dom";

function CommunityPost({ post, onDelete }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {/* Post Header */}
      <div className="flex justify-between items-start mb-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          {/* ... existing code ... */}
        </div>

        {/* Options Menu */}
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>

          {showOptions && createPortal(
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowOptions(false)}
              />
              <div 
                className="fixed z-50 bg-white rounded-lg shadow-lg py-2 min-w-[160px]"
                style={{
                  top: "calc(100% + 8px)",
                  right: "16px",
                }}
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
            </>,
            document.body
          )}
        </div>
      </div>

      {/* Post Content */}
      {/* ... existing code ... */}
    </div>
  );
}

export default CommunityPost; 