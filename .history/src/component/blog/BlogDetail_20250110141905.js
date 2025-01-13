import React from "react";

function BlogDetail() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Author info */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
            S
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Sơn Đặng</h3>
            <p className="text-sm text-gray-500">Posted on March 15, 2024</p>
          </div>
        </div>

        {/* Blog title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án "AI CHAT"
        </h1>

        {/* Blog content */}
        <div className="prose max-w-none">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {/* Add more content here */}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
