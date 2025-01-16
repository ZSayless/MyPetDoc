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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 md:gap-6 md:p-6">
          {/* Total Users */}
          <div className="bg-white rounded-lg p-3 md:p-6">
            <h3 className="text-gray-500 text-xs md:text-sm">Total Users</h3>
            <div className="mt-1 md:mt-2 flex items-baseline">
              <p className="text-lg md:text-2xl font-bold">1,234</p>
              <span className="ml-2 text-xs md:text-sm text-green-500">
                +12%
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              from last month
            </p>
          </div>

          {/* Total Hospitals */}
          <div className="bg-white rounded-lg p-3 md:p-6">
            <h3 className="text-gray-500 text-xs md:text-sm">
              Total Hospitals
            </h3>
            <div className="mt-1 md:mt-2 flex items-baseline">
              <p className="text-lg md:text-2xl font-bold">56</p>
              <span className="ml-2 text-xs md:text-sm text-green-500">+3</span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              new this month
            </p>
          </div>

          {/* Total Blogs */}
          <div className="bg-white rounded-lg p-3 md:p-6">
            <h3 className="text-gray-500 text-xs md:text-sm">Total Blogs</h3>
            <div className="mt-1 md:mt-2 flex items-baseline">
              <p className="text-lg md:text-2xl font-bold">892</p>
              <span className="ml-2 text-xs md:text-sm text-green-500">
                +25%
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              from last month
            </p>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-lg p-3 md:p-6">
            <h3 className="text-gray-500 text-xs md:text-sm">
              Pending Approvals
            </h3>
            <div className="mt-1 md:mt-2 flex items-baseline">
              <p className="text-lg md:text-2xl font-bold">12</p>
              <span className="ml-2 text-xs md:text-sm text-yellow-500">
                Active
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              requires attention
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-3 md:px-6 md:pb-6">{renderTab()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
