import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";

const MobileMenu = ({ isOpen, onClose }) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1E1B3A] z-50 lg:hidden">
      {/* Close Button */}
      <div className="absolute top-6 right-6">
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-300"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col justify-center h-full px-8">
        <nav className="space-y-8">
          <Link
            to="/"
            className="block text-white text-2xl font-semibold hover:text-[#98E9E9]"
            onClick={onClose}
          >
            HOME
          </Link>
          
          <Link
            to="/find-hospital"
            className="block text-white text-2xl font-semibold hover:text-[#98E9E9]"
            onClick={onClose}
          >
            FIND A HOSPITAL
          </Link>

          <Link
            to="/services"
            className="block text-white text-2xl font-semibold hover:text-[#98E9E9]"
            onClick={onClose}
          >
            SERVICE
          </Link>

          <Link
            to="/bloglist"
            className="block text-white text-2xl font-semibold hover:text-[#98E9E9]"
            onClick={onClose}
          >
            BLOG
          </Link>

          <Link
            to="/aboutus"
            className="block text-white text-2xl font-semibold hover:text-[#98E9E9]"
            onClick={onClose}
          >
            ABOUT US
          </Link>

          <Link
            to="/contactus"
            className="block text-white text-2xl font-semibold hover:text-[#98E9E9]"
            onClick={onClose}
          >
            CONTACT US
          </Link>

          <Link
            to="/register"
            className="block text-white text-2xl font-semibold hover:text-[#98E9E9]"
            onClick={onClose}
          >
            REGISTER
          </Link>

          <Link
            to="/login"
            className="block text-white text-2xl font-semibold hover:text-[#98E9E9]"
            onClick={onClose}
          >
            LOGIN
          </Link>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center text-white text-2xl font-semibold hover:text-[#98E9E9]"
            >
              LANGUAGE
              <ChevronDown className={`ml-2 w-6 h-6 transition-transform ${
                isLanguageOpen ? "rotate-180" : ""
              }`} />
            </button>
            
            {isLanguageOpen && (
              <div className="mt-2 py-2 space-y-2">
                <button className="block w-full text-left text-white text-xl hover:text-[#98E9E9] pl-4">
                  English
                </button>
                <button className="block w-full text-left text-white text-xl hover:text-[#98E9E9] pl-4">
                  Tiếng Việt
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu; 