import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import UsersManagement from "./tabs/UsersManagement";
import HospitalsManagement from "./tabs/HospitalsManagement";
import BlogsManagement from "./tabs/BlogsManagement";
import ReportsManagement from "./tabs/ReportsManagement";
import ContactMessages from "./tabs/ContactMessages";
import PendingApprovals from "./tabs/PendingApprovals";
import { Menu } from "lucide-react";

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6">
          <div className="bg-white rounded-lg p-4 md:p-6">
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-xl md:text-2xl font-bold mt-2">1,234</p>
            <span className="text-green-500 text-sm">+12% from last month</span>
          </div>
          <div className="bg-white rounded-lg p-4 md:p-6">
            <h3 className="text-gray-500 text-sm">Total Hospitals</h3>
            <p className="text-xl md:text-2xl font-bold mt-2">56</p>
            <span className="text-green-500 text-sm">+3 new this month</span>
          </div>
          <div className="bg-white rounded-lg p-4 md:p-6">
            <h3 className="text-gray-500 text-sm">Total Blogs</h3>
            <p className="text-xl md:text-2xl font-bold mt-2">892</p>
            <span className="text-green-500 text-sm">+25% from last month</span>
          </div>
          <div className="bg-white rounded-lg p-4 md:p-6">
            <h3 className="text-gray-500 text-sm">Pending Approvals</h3>
            <p className="text-xl md:text-2xl font-bold mt-2">12</p>
            <span className="text-yellow-500 text-sm">Requires attention</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 md:px-6 md:pb-6">{renderTab()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
