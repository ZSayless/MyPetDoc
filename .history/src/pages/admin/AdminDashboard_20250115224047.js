import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import UsersManagement from "./tabs/UsersManagement";
import HospitalsManagement from "./tabs/HospitalsManagement";
import BlogsManagement from "./tabs/BlogsManagement";
import ReportsManagement from "./tabs/ReportsManagement";
import ContactMessages from "./tabs/ContactMessages";
import PendingApprovals from "./tabs/PendingApprovals";
import { Menu, X } from "lucide-react";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "users":
        return <UsersManagement />;
      case "hospitals":
        return <HospitalsManagement />;
      case "blogs":
        return <BlogsManagement />;
      case "reports":
        return <ReportsManagement />;
      case "messages":
        return <ContactMessages />;
      case "pending":
        return <PendingApprovals />;
      default:
        return <UsersManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold text-[#1A3C8E]">Admin Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <AdminSidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setIsSidebarOpen(false);
            }}
          />
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">1,234</p>
                <span className="text-sm text-green-500">+12% from last month</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Total Hospitals</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">56</p>
                <span className="text-sm text-green-500">+3 new this month</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Total Blogs</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">892</p>
                <span className="text-sm text-green-500">+25% from last month</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Pending Approvals</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">12</p>
                <span className="text-sm text-yellow-500">Requires attention</span>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-lg shadow-sm">
              {renderTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
