import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <span className="ml-2 text-xl font-semibold">mypetDoc</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="hover:text-[#98E9E9]">
              Home
            </Link>
            <Link to="/aboutus" className="hover:text-[#98E9E9]">
              About Us
            </Link>
            <Link to="/contactus" className="hover:text-[#98E9E9]">
              Contact Us
            </Link>
            <Link to="/bloglist" className="hover:text-[#98E9E9]">
              Blog
            </Link>
            <Link to="/find-hospital" className="hover:text-[#98E9E9]">
              Find Hospital
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
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

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
