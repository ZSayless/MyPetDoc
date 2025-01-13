import { useState } from "react";
import {
  Users,
  Hospital,
  FileText,
  Calendar,
  BarChart2,
  Search,
  Home,
  ArrowLeft,
  X,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import UsersManagement from "./tabs/UsersManagement";
import HospitalsManagement from "./tabs/HospitalsManagement";
import BlogsManagement from "./tabs/BlogsManagement";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "overview", name: "Overview", icon: BarChart2 },
    { id: "users", name: "Users Management", icon: Users },
    { id: "hospitals", name: "Hospitals Management", icon: Hospital },
    { id: "blogs", name: "Blogs Management", icon: FileText },
    { id: "appointments", name: "Appointments", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <Link to="/" className="p-1.5 hover:bg-gray-100 rounded-lg">
            <Home size={24} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#1A1F36] text-white">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {item.name}
              </button>
            ))}
            <div className="border-t border-gray-700 my-4" />
            <Link
              to="/"
              className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              HOME
            </Link>
            <Link
              to="/find-hospital"
              className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              FIND A HOSPITAL
            </Link>
            <Link
              to="/services"
              className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              SERVICE
            </Link>
            <Link
              to="/blog"
              className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              BLOG
            </Link>
            <Link
              to="/about"
              className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              ABOUT US
            </Link>
            <Link
              to="/contact"
              className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              CONTACT US
            </Link>
            <Link
              to="/register"
              className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              REGISTER
            </Link>
            <Link
              to="/login"
              className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              LOGIN
            </Link>
            <div className="border-t border-gray-700 my-4" />
            <div className="py-3 px-4">
              <p className="text-sm mb-2">LANGUAGE</p>
              <select className="w-full bg-gray-700 px-3 py-2 rounded-lg">
                <option>English</option>
                <option>Vietnamese</option>
              </select>
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mt-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Website</span>
          </Link>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${
                activeTab === item.id
                  ? "bg-[#98E9E9]/10 text-[#98E9E9] border-r-4 border-[#98E9E9]"
                  : "text-gray-600 hover:bg-gray-50/80"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-[280px] p-4 lg:p-8 mt-14 lg:mt-0">
        {/* Content header, cards and tables remain the same */}
        {/* ... */}
      </div>
    </div>
  );
}

export default AdminDashboard;
