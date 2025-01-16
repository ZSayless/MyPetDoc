import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#98E9E9]"></div>
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );
}

export default Loading;
