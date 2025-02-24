import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import UsersManagement from "./tabs/UsersManagement";
import HospitalsManagement from "./tabs/HospitalsManagement";
import BlogsManagement from "./tabs/BlogsManagement";
import ReportsManagement from "./tabs/ReportsManagement";
import ContactMessages from "./tabs/ContactMessages";
import PendingApprovals from "./tabs/PendingApprovals";
import FAQManagement from "./tabs/FAQManagement";
import BannerManagement from "./tabs/BannersManagement";
import CommunityManagement from "./tabs/CommunityManagement";
import AboutUsManagement from "./tabs/AboutUsManagement";
import TermsManagement from "./tabs/TermsManagement";
import ContactInfoManagement from "./tabs/ContactInfoManagement";
import { Menu, X, Users, Building2, FileText, AlertCircle } from "lucide-react";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("adminActiveTab") || "users";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);

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
      case "faq":
        return <FAQManagement />;
      case "community":
        return <CommunityManagement />;
      case "banner":
        return <BannerManagement />;
      case "aboutus":
        return <AboutUsManagement />;
      case "terms":
        return <TermsManagement />;
      case "contact":
        return <ContactInfoManagement />;
      default:
        return <UsersManagement />;
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-30 flex items-center justify-between px-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
        <div className="w-10" />
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div
          className={`fixed md:sticky top-0 inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 bg-white w-64 border-r`}
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
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 md:ml-0">
          <div className="container mx-auto">
            {/* Tab Content */}
            <div className="p-4">{renderTab()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
