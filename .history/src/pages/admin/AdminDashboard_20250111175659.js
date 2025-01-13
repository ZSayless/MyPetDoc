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
import UsersManagement from "./components/UsersManagement";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // ... menuItems và stats code ...

  return (
    <div className="min-h-screen bg-gray-50">
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
      <div className="ml-64 p-8">
        {activeTab === "dashboard" && (
          // ... existing dashboard content ...
        )}

        {/* Users Management Tab */}
        {activeTab === "users" && <UsersManagement />}

        {/* Add other tab contents */}
      </div>
    </div>
  );
}

export default AdminDashboard; 