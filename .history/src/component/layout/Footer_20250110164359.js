import React from "react";
import {
  Facebook,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Chrome,
} from "lucide-react";
import logo from "../../assets/img/logo.png";
const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img src="/logo.png" alt="MyPetDoc" className="h-10 mb-4" />
            <p className="text-gray-400">
              Your trusted directory for pet hospitals in Vietnam. Find the best care for your furry friends.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Street Name, City, Country</li>
              <li>Phone: +1 234 567 890</li>
              <li>Email: info@mypetdoc.com</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-center mb-6">
              <img src={logo} alt="bizMap" className="h-8" />
            </div>
            <p className="text-gray-400 mb-8">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
              Industry Has Been The Industry.
            </p>
            <div className="flex items-center space-x-3 mb-8">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border border-gray-700 rounded px-4 py-3 pr-32 focus:outline-none focus:border-[#4611a7]"
                />
                <button className="absolute right-0 top-0 h-full bg-[#4611a7] text-white px-6 rounded-r hover:bg-[#3a0d8c] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex space-x-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#4611a7] flex items-center justify-center hover:bg-[#3a0d8c] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#4611a7] flex items-center justify-center hover:bg-[#3a0d8c] transition-colors"
              >
                <Chrome size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#4611a7] flex items-center justify-center hover:bg-[#3a0d8c] transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#4611a7] flex items-center justify-center hover:bg-[#3a0d8c] transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#4611a7] flex items-center justify-center hover:bg-[#3a0d8c] transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xl font-bold mb-6">
              Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Hotel
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Appartment
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Atuomation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Underwriting
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Lending Licnses
                  </a>
                </li>
              </ul>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Restaurant
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    SPA & Beauty
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Travel
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    For Employers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xl font-bold mb-6">Contact us</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <MapPin className="text-[#4611a7]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Address</h4>
                  <p className="text-gray-400">
                    Demo Address #8901 Marmora Road Chi Minh City, Vietnam
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <Phone className="text-[#4611a7]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Phone</h4>
                  <p className="text-gray-400">0800-123456 (24/7 Support)</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <Mail className="text-[#4611a7]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Email</h4>
                  <p className="text-gray-400">Info@Example.Com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            Design With <span className="text-[#4611a7]">❤</span> By DexignZone
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
