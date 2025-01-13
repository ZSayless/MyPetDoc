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
    <footer className="bg-[#0c0e1a] text-white py-16 relative">
      <div className="container mx-auto px-4">
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
