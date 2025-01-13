import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 lg:hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Link to="/" className="flex items-center" onClick={onClose}>
          <img src="/logo.png" alt="Logo" className="h-8" />
          <span className="ml-2 text-xl font-semibold">mypetDoc</span>
        </Link>
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="p-4">
        <nav className="space-y-4">
          <Link
            to="/"
            className="block py-3 text-lg hover:text-[#98E9E9]"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            to="/aboutus"
            className="block py-3 text-lg hover:text-[#98E9E9]"
            onClick={onClose}
          >
            About Us
          </Link>
          <Link
            to="/contactus"
            className="block py-3 text-lg hover:text-[#98E9E9]"
            onClick={onClose}
          >
            Contact Us
          </Link>

          {/* Services Section */}
          <div className="py-3">
            <h3 className="text-lg font-medium mb-2">Services</h3>
            <div className="space-y-2 pl-4">
              <Link
                to="/find-hospital"
                className="block py-2 hover:text-[#98E9E9]"
                onClick={onClose}
              >
                Find Hospital
              </Link>
              <Link
                to="/bloglist"
                className="block py-2 hover:text-[#98E9E9]"
                onClick={onClose}
              >
                Blog
              </Link>
              <Link
                to="/community"
                className="block py-2 hover:text-[#98E9E9]"
                onClick={onClose}
              >
                Community
              </Link>
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center space-x-2 py-3">
            <img src="/language.png" alt="Language" className="w-5 h-5" />
            <span>English</span>
          </div>

          <Link
            to="/admin"
            className="block py-3 text-lg hover:text-[#98E9E9]"
            onClick={onClose}
          >
            Admin Dashboard
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="mt-8 space-y-3">
          <Link
            to="/login"
            className="block w-full py-3 text-center text-lg bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
            onClick={onClose}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block w-full py-3 text-center text-lg border border-[#98E9E9] text-gray-700 rounded-lg hover:bg-gray-50"
            onClick={onClose}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 