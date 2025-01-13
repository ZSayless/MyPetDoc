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
  Bell,
  User2,
  LogOut,
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
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white">
        <div className="flex items-center h-16 px-4 border-b">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 flex justify-center">
            <img src="/logo.png" alt="Logo" className="h-8" />
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User2 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed inset-y-0 left-0 w-[280px] bg-white z-40 transform transition-transform">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-lg">Admin Dashboard</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="bg-gray-50 rounded-xl p-3 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User2 size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Admin User</p>
                    <p className="text-sm text-gray-500">admin@mypetdoc.com</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View Profile
                </Link>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-[#98E9E9]/10 text-[#98E9E9]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t">
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ArrowLeft size={20} />
                  <span>Back to Website</span>
                </Link>
                <button
                  className="w-full mt-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-left flex items-center gap-2"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </>
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
