import React, { useState } from "react";
import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import OptionsMenu from './OptionsMenu';

function CommunityPost({ post, onDelete }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = () => {
    onDelete(post.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-start mb-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          {/* ... existing code ... */}
        </div>

        {/* Options Menu */}
        <div className="relative options-menu-container">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>

          <OptionsMenu
            isOpen={showOptions}
            onClose={() => setShowOptions(false)}
            onDelete={handleDelete}
            t={t}
            canDelete={user?.id === post.userId || user?.role === "admin"}
          />
        </div>
      </div>

      {/* Post Content */}
      {/* ... existing code ... */}
    </div>
  );
}

export default CommunityPost; 