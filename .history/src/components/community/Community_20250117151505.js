import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CreatePostModal from "./CreatePostModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Community() {
  const { t } = useTranslation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data cho posts
  const posts = [
    {
      id: 1,
      title: "Tips for New Pet Owners",
      author: "Dr. Nguyen Van A",
      date: "2024-03-15",
      content: "Here are some essential tips for new pet owners...",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      likes: 24,
      comments: 12
    },
    {
      id: 2,
      title: "Pet Healthcare Basics",
      author: "Dr. Tran Thi B", 
      date: "2024-03-14",
      content: "Understanding basic pet healthcare is crucial...",
      image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987",
      likes: 18,
      comments: 8
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#98E9E9]/20 to-white py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1A3C8E]">
            {t("community.title")}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {t("community.subtitle")}
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-8 px-8 py-3 bg-[#1A3C8E] text-white rounded-full font-medium hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors"
          >
            {t("community.createPost.button")}
          </button>
        </div>

        {/* Content Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <LazyLoadImage
                src={post.image}
                alt={post.title}
                effect="blur"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <div className="text-sm text-gray-500 mb-4">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-gray-600 line-clamp-3">{post.content}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.likes} {t("community.post.likes")}</span>
                    <span>{post.comments} {t("community.post.comments")}</span>
                  </div>
                  <button className="text-[#1A3C8E] hover:text-[#98E9E9] font-medium">
                    {t("community.post.viewMore")} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

export default Community;
