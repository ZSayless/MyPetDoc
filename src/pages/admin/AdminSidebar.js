import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  FileText,
  Flag,
  MessageSquare,
  ClipboardList,
} from "lucide-react";

function AdminSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "users", name: "Users Management", icon: Users },
    { id: "hospitals", name: "Hospitals Management", icon: Building2 },
    { id: "blogs", name: "Blogs Management", icon: FileText },
    { id: "reports", name: "Reports Management", icon: Flag },
    { id: "messages", name: "Contact Messages", icon: MessageSquare },
    { id: "pending", name: "Pending Approvals", icon: ClipboardList },
  ];

  return (
    <div className="w-64 bg-white shadow-sm">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <Link to="/" className="text-sm text-blue-600 hover:text-blue-800">
          Back to Website
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#98E9E9] text-gray-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default AdminSidebar;
