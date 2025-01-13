import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1E1B3A] z-50 lg:hidden">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Menu Items */}
      <div className="flex flex-col justify-center h-full px-8">
        <nav className="space-y-8">
          <Link
            to="/"
            className="block text-white text-2xl font-semibold tracking-wide hover:text-[#98E9E9]"
            onClick={onClose}
          >
            HOME
          </Link>
          
          <Link
            to="/find-hospital"
            className="block text-white text-2xl font-semibold tracking-wide hover:text-[#98E9E9]"
            onClick={onClose}
          >
            FIND A HOSPITAL
          </Link>

          <Link
            to="/services"
            className="block text-white text-2xl font-semibold tracking-wide hover:text-[#98E9E9]"
            onClick={onClose}
          >
            SERVICE
          </Link>

          <Link
            to="/bloglist"
            className="block text-white text-2xl font-semibold tracking-wide hover:text-[#98E9E9]"
            onClick={onClose}
          >
            BLOG
          </Link>

          <Link
            to="/aboutus"
            className="block text-white text-2xl font-semibold tracking-wide hover:text-[#98E9E9]"
            onClick={onClose}
          >
            ABOUT US
          </Link>

          <Link
            to="/contactus"
            className="block text-white text-2xl font-semibold tracking-wide hover:text-[#98E9E9]"
            onClick={onClose}
          >
            CONTACT US
          </Link>

          <Link
            to="/register"
            className="block text-white text-2xl font-semibold tracking-wide hover:text-[#98E9E9]"
            onClick={onClose}
          >
            REGISTER
          </Link>

          <Link
            to="/login"
            className="block text-white text-2xl font-semibold tracking-wide hover:text-[#98E9E9]"
            onClick={onClose}
          >
            LOGIN
          </Link>

          <button 
            className="block text-white text-2xl font-semibold tracking-wide hover:text-[#98E9E9]"
          >
            LANGUAGE
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu; 