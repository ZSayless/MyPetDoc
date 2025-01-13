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
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";
import UsersManagement from "./tabs/UsersManagement";
import HospitalsManagement from "./tabs/HospitalsManagement";
import BlogsManagement from "./tabs/BlogsManagement";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "overview",
      name: "Overview",
      icon: BarChart2,
    },
    {
      id: "users",
      name: "Users Management",
      icon: Users,
    },
    {
      id: "hospitals",
      name: "Hospitals Management",
      icon: Hospital,
    },
    {
      id: "blogs",
      name: "Blogs Management",
      icon: FileText,
    },
    {
      id: "appointments",
      name: "Appointments",
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b">
        <div className="flex items-center h-16 px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#98E9E9] rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="w-6 h-6" />
              </div>
              <span className="font-semibold text-gray-800">MyPetDoc</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-600" />
            </button>
            <Link
              to="/"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home size={20} className="text-gray-600" />
            </Link>
          </div>
        </div>
        <div className="px-4 py-2 border-t bg-white">
          <h1 className="text-lg font-semibold text-gray-800">
            {menuItems.find((item) => item.id === activeTab)?.name}
          </h1>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-lg z-30 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Sidebar Header */}
        <div className="lg:hidden flex items-center gap-3 p-4 border-b">
          <div className="w-10 h-10 bg-[#98E9E9] rounded-lg flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your platform</p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800 hidden lg:block">
            Admin Dashboard
          </h1>
          <Link
            to="/"
            className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-blue-600 mt-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Website</span>
          </Link>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
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
      <div className="lg:ml-[280px] p-4 lg:p-8 mt-[104px] lg:mt-0">
        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {menuItems.find((item) => item.id === activeTab)?.name}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9] focus:border-[#98E9E9]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Total Users</h3>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
              <p className="text-xs text-green-600 mt-1">
                +12% from last month
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Total Hospitals</h3>
              <p className="text-2xl font-bold text-gray-800">56</p>
              <p className="text-xs text-green-600 mt-1">+3 new this month</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Total Appointments</h3>
              <p className="text-2xl font-bold text-gray-800">892</p>
              <p className="text-xs text-green-600 mt-1">
                +25% from last month
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Total Blogs</h3>
              <p className="text-2xl font-bold text-gray-800">145</p>
              <p className="text-xs text-green-600 mt-1">+8 new this week</p>
            </div>
          </div>
        )}

        {/* Tables in management tabs */}
        <div className="overflow-x-auto">
          {activeTab === "users" && <UsersManagement />}
          {activeTab === "hospitals" && <HospitalsManagement />}
          {activeTab === "blogs" && <BlogsManagement />}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden backdrop-blur-[2px]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
