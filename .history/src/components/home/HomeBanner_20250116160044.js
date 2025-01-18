import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

function HomeBanner() {
  return (
    <div className="relative">
      {/* Banner background */}
      <div className="h-[600px] bg-gradient-to-r from-[#98E9E9] to-[#7CD5D5]">
        <div className="container mx-auto px-4 h-full">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find the Best Pet Care Near You
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
              Discover top-rated veterinary hospitals and clinics in your area.
              Quality care for your beloved pets is just a click away.
            </p>

            {/* Search box */}
            <div className="w-full max-w-2xl">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search for veterinary services..."
                    className="w-full px-6 py-4 rounded-full border-2 border-white bg-white/90 backdrop-blur-sm focus:outline-none focus:border-[#7CD5D5] shadow-lg"
                  />
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <Link
                to=""
                className="px-8 py-3 bg-[#2A3342] text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg"
              >
                Find Hospitals
              </Link>
              <Link
                to=""
                className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
              >
                Join Community
              </Link>
              <Link
                to=""
                className="px-8 py-3 bg-[#98E9E9] text-gray-900 rounded-full font-medium hover:bg-[#7CD5D5] transition-colors shadow-lg"
              >
                List Your Hospital
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default HomeBanner;
