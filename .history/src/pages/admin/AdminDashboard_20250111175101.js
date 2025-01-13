import { useState } from "react";
import { 
  Users, 
  Hospital, 
  FileText, 
  Calendar, 
  Settings,
  BarChart2,
  Grid
} from "lucide-react";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Grid className="w-5 h-5" />,
    },
    {
      id: "users",
      label: "Users Management",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "hospitals",
      label: "Hospitals",
      icon: <Hospital className="w-5 h-5" />,
    },
    {
      id: "blogs",
      label: "Blog Posts",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "services",
      label: "Services",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      id: "statistics",
      label: "Statistics",
      icon: <BarChart2 className="w-5 h-5" />,
    },
  ];

  const stats = [
    {
      label: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
    },
    {
      label: "Active Hospitals",
      value: "56",
      change: "+3",
      changeType: "increase",
    },
    {
      label: "Appointments",
      value: "892",
      change: "+23%",
      changeType: "increase",
    },
    {
      label: "Blog Posts",
      value: "45",
      change: "+5",
      changeType: "increase",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-[72px] bottom-0 w-64 bg-white shadow-sm">
        <div className="px-4 py-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Admin Dashboard
          </h2>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-[#98E9E9] text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Overview</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <h3 className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`ml-2 text-sm font-medium ${
                        stat.changeType === "increase"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h2>
              {/* Add activity list here */}
            </div>
          </div>
        )}

        {/* Add other tab contents */}
      </div>

      {/* Spacer to push footer down */}
      <div className="h-24"></div>
    </div>
  );
}

export default AdminDashboard; 