import React, { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const BlogCard = memo(({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <LazyLoadImage
        src={blog.image}
        alt={blog.title}
        effect="blur"
        className="w-full h-48 object-cover"
        placeholderSrc="/placeholder-blog.jpg"
      />
      {/* ... rest of the card ... */}
    </div>
  );
});

export default BlogCard; 