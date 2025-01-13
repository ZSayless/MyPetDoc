import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#98E9E9] text-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">MyPetDoc</h3>
            <p className="text-sm text-gray-600">
              Connecting pet owners with quality veterinary care across Vietnam.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="text-gray-600 hover:text-gray-800">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/find-hospital" className="text-gray-600 hover:text-gray-800">
                  Find Hospital
                </Link>
              </li>
              <li>
                <Link to="/bloglist" className="text-gray-600 hover:text-gray-800">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-600 hover:text-gray-800">
                  Hospital Booking
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-gray-800">
                  Pet Health Records
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-gray-800">
                  Emergency Care
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-gray-800">
                  Veterinary Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-600">
              <p>Ho Chi Minh City, Vietnam</p>
              <p className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:support@mypetdoc.com" className="hover:text-gray-800">
                  support@mypetdoc.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2024 MyPetDoc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-800">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-800">
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