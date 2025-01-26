import React, { memo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const BlogCard = memo(({ blog }) => {
  const [imageError, setImageError] = useState(false);

  const defaultImage = "https://placehold.co/600x400?text=No+Image";

  return (
    <Link to={`/blogdetail/${blog.id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
        <div className="aspect-[16/9] w-full relative">
          <LazyLoadImage
            src={imageError ? defaultImage : blog.image || defaultImage}
            alt={blog.title}
            effect="blur"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
            {blog.excerpt}
          </p>
          <div className="flex items-center space-x-2">
            <LazyLoadImage
              src={blog.author?.avatar || defaultImage}
              alt={blog.author?.name || "Author"}
              effect="blur"
              onError={(e) => {
                e.target.src = defaultImage;
              }}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700">
              {blog.author?.name || "Anonymous"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default BlogCard;