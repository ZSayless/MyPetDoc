import React, { useState } from "react";
import { ArrowLeft, Bold, Italic, Underline, List, Link as LinkIcon, Image, Code, RotateCcw, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";

const WriteBlog = () => {
  const [title, setTitle] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px]">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Link to="/bloglist" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <input
                type="text"
                placeholder="Tiêu đề"
                className="text-xl font-medium focus:outline-none placeholder:text-gray-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]">
              XUẤT BẢN
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Toolbar */}
          <div className="border-b px-4 py-2">
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-gray-100 rounded">
                <Bold className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Italic className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Underline className="w-5 h-5" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button className="p-2 hover:bg-gray-100 rounded">
                <List className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <LinkIcon className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Image className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Code className="w-5 h-5" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button className="p-2 hover:bg-gray-100 rounded">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <textarea
              placeholder="Nội dung viết ở đây"
              className="w-full min-h-[500px] focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog; 