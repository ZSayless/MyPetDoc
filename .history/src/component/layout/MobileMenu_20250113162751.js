import React from "react";
import { Link } from "react-router-dom";
import { X, ChevronRight, Globe, Settings, LogOut } from "lucide-react";

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      title: "Find Hospital",
      path: "/find-hospital",
      description: "Search for veterinary clinics near you",
      color: "bg-blue-50",
    },
    {
      title: "Blog",
      path: "/bloglist",
      description: "Read pet care tips and stories",
      color: "bg-green-50",
    },
    {
      title: "Community",
      path: "/community",
      description: "Connect with other pet owners",
      color: "bg-purple-50",
    },
    {
      title: "About Us",
      path: "/aboutus",
      description: "Learn about our mission",
      color: "bg-orange-50",
    },
    {
      title: "Contact",
      path: "/contactus",
      description: "Get in touch with us",
      color: "bg-pink-50",
    },
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 lg:hidden overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center" onClick={onClose}>
            <img src="/logo.png" alt="Logo" className="h-8" />
            <span className="ml-2 text-xl font-semibold">mypetDoc</span>
          </Link>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Menu */}
      <div className="p-4 space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`block rounded-xl p-4 ${item.color} hover:opacity-80 transition-opacity`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.description}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Link
            to="/login"
            onClick={onClose}
            className="py-3 px-4 bg-[#98E9E9] text-gray-700 rounded-xl text-center font-medium hover:bg-[#7CD5D5]"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={onClose}
            className="py-3 px-4 border border-[#98E9E9] text-gray-700 rounded-xl text-center font-medium hover:bg-gray-50"
          >
            Register
          </Link>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <button className="flex items-center space-x-2 hover:text-gray-900">
            <Globe className="w-5 h-5" />
            <span>English</span>
          </button>
          <Link 
            to="/setting"
            onClick={onClose}
            className="flex items-center space-x-2 hover:text-gray-900"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <button className="flex items-center space-x-2 hover:text-gray-900">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 