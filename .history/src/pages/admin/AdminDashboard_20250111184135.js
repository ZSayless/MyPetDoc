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
  ChevronRight,
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
            className="p-1.5"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <Link to="/" className="p-1.5">
            <Home size={24} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#1A1F36]">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-white text-xl">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-1.5"
            >
              <X size={24} />
            </button>
          </div>

          <div className="px-4 py-2">
            <div className="space-y-4">
              <Link to="/" className="block text-white text-lg">
                HOME
              </Link>
              <Link to="/find-hospital" className="block text-white text-lg">
                FIND A HOSPITAL
              </Link>
              <Link to="/services" className="block text-white text-lg">
                SERVICE
              </Link>
              <Link to="/blog" className="block text-white text-lg">
                BLOG
              </Link>
              <Link to="/about" className="block text-white text-lg">
                ABOUT US
              </Link>
              <Link to="/contact" className="block text-white text-lg">
                CONTACT US
              </Link>
              <Link to="/register" className="block text-white text-lg">
                REGISTER
              </Link>
              <Link to="/login" className="block text-white text-lg">
                LOGIN
              </Link>
              <div className="pt-4">
                <p className="text-white text-lg mb-2">LANGUAGE</p>
                <select className="w-full bg-transparent text-white border border-white/30 rounded px-3 py-2">
                  <option value="en" className="text-black">English</option>
                  <option value="vi" className="text-black">Vietnamese</option>
                </select>
              </div>
            </div>
          </div>
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
        {activeTab === "overview" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Total Users</h3>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
              <p className="text-xs text-green-600 mt-1">+12% from last month</p>
            </div>
            {/* ... other overview cards ... */}
          </div>
        )}
        {activeTab === "users" && <UsersManagement />}
        {activeTab === "hospitals" && <HospitalsManagement />}
        {activeTab === "blogs" && <BlogsManagement />}
      </div>
    </div>
  );
}

export default AdminDashboard;
