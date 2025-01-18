import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Community() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#98E9E9]/40 to-white py-20 text-center">
        <h1 className="text-4xl font-bold text-[#1A3C8E] mb-4">
          Pet Lovers Community
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Share your pet stories and connect with other pet lovers
        </p>
        <button className="px-8 py-3 bg-[#1A3C8E] text-white rounded-full font-medium hover:bg-[#98E9E9] hover:text-[#1A3C8E] transition-colors">
          Share Your Story
        </button>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
            <LazyLoadImage
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
              alt="Cat"
              effect="blur"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
            <LazyLoadImage
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e"
              alt="Dog"
              effect="blur" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
            <LazyLoadImage
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c"
              alt="Golden Retriever"
              effect="blur"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;