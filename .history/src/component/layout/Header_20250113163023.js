import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <span className="ml-2 text-xl font-semibold">mypetDoc</span>
          </Link>

          {/* Desktop Menu - Giữ nguyên */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#98E9E9]">
                Home
              </Link>
              <Link to="/aboutus" className="text-gray-700 hover:text-[#98E9E9]">
                About Us
              </Link>
              <Link to="/contactus" className="text-gray-700 hover:text-[#98E9E9]">
                Contact Us
              </Link>
              <div className="relative">
                <button
                  className="text-gray-700 hover:text-[#98E9E9] flex items-center"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Services
                  <svg
                    className={`ml-1 w-4 h-4 transition-transform ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Link
                      to="/find-hospital"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Find Hospital
                    </Link>
                    <Link
                      to="/bloglist"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Blog
                    </Link>
                    <Link
                      to="/community"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Community
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Desktop Right Section - Giữ nguyên */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img src="/language.png" alt="Language" className="w-5 h-5" />
              <span className="text-gray-700">English</span>
            </div>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-[#98E9E9] whitespace-nowrap"
            >
              Admin Dashboard
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 border border-[#98E9E9] text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Component - Sẽ làm mới hoàn toàn */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
