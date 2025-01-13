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

  return (
    <div className="pt-[72px]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 fixed left-0 top-[72px] bottom-0 bg-white shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Admin Dashboard
            </h2>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
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
              {/* Add dashboard content */}
            </div>
          )}

          {/* Add other tab contents */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 