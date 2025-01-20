import React, { useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';

function OptionsMenu({ isOpen, onClose, onDelete, t, canDelete }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      // Kiểm tra xem click có phải vào menu hoặc nút more không
      const isClickInside = e.target.closest('.options-menu-container');
      if (!isClickInside && isOpen) {
        onClose();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className="absolute right-0 top-10 bg-white rounded-lg shadow-lg py-2 min-w-[160px] z-50">
      {canDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50"
        >
          {t("community.deletePost")}
        </button>
      )}
    </div>
  );
}

export default OptionsMenu; 