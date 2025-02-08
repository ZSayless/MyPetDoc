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
      case "users": return <UsersManagement />;
      case "hospitals": return <HospitalsManagement />;
      case "blogs": return <BlogsManagement />;
      case "reports": return <ReportsManagement />;
      case "messages": return <ContactMessages />;
      case "pending": return <PendingApprovals />;
      case "faq": return <FAQManagement />;
      case "banner": return <BannerManagement />;
      default: return <UsersManagement />;
    }
  };

  const statsCards = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
      period: "from last month",
      icon: <Users className="w-5 h-5 text-blue-500" />,
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Hospitals",
      value: "56",
      change: "+3",
      changeType: "new",
      period: "this month",
      icon: <Building2 className="w-5 h-5 text-purple-500" />,
      bgColor: "bg-purple-50"
    },
    {
      title: "Total Blogs",
      value: "892",
      change: "+25%",
      changeType: "increase",
      period: "from last month",
      icon: <FileText className="w-5 h-5 text-green-500" />,
      bgColor: "bg-green-50"
    },
    {
      title: "Pending Approvals",
      value: "12",
      change: "Active",
      changeType: "warning",
      period: "requires attention",
      icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
      bgColor: "bg-yellow-50"
    }
  ];

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
        <div className={`fixed md:sticky top-0 inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 bg-white w-64 border-r`}>
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
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {statsCards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                    <span className={`p-2 rounded-lg ${card.bgColor}`}>
                      {card.icon}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl md:text-2xl font-bold text-gray-800">
                      {card.value}
                    </p>
                    <span className={`text-sm font-medium ${
                      card.changeType === 'increase' ? 'text-green-500' :
                      card.changeType === 'warning' ? 'text-yellow-500' : 
                      'text-blue-500'
                    }`}>
                      {card.change}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    {card.period}
                  </p>
                </div>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {renderTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
