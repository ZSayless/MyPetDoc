import { useEffect } from 'react';

export const useClickOutside = (refs, handler) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kiểm tra xem click có nằm ngoài tất cả các refs không
      const isOutside = refs.every(
        ref => ref.current && !ref.current.contains(event.target)
      );

      if (isOutside) {
        handler();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, handler]);
}; 