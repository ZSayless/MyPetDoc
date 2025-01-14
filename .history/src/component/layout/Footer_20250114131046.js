import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#98E9E9]/20 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#1A3C8E]">
              MyPetDoc
            </h3>
            <p className="text-sm text-gray-600">
              Connecting pet owners with quality veterinary care across Vietnam.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-[#1A3C8E] hover:text-[#98E9E9] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-[#1A3C8E] hover:text-[#98E9E9] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-[#1A3C8E] hover:text-[#98E9E9] transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#1A3C8E]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/find-hospital"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  Find Hospital
                </Link>
              </li>
              <li>
                <Link
                  to="/bloglist"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#1A3C8E]">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  Hospital Booking
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  Pet Health Records
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  Emergency Care
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  Veterinary Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#1A3C8E]">
              Contact Us
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>Ho Chi Minh City, Vietnam</p>
              <p className="flex items-center">
                <Mail size={16} className="mr-2 text-[#1A3C8E]" />
                <a
                  href="mailto:support@mypetdoc.com"
                  className="hover:text-[#98E9E9] transition-colors"
                >
                  support@mypetdoc.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2024 MyPetDoc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-sm text-gray-600 hover:text-[#98E9E9] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-600 hover:text-[#98E9E9] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
