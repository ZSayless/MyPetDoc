import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  FileText,
  Flag,
  MessageSquare,
  ClipboardList,
  Home,
  Settings
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
    <div className="h-screen flex flex-col">
      <div className="p-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E]"
        >
          <Home size={20} />
          <span>Back to Website</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 pb-4">
        <div className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#98E9E9]/20 text-[#1A3C8E]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t">
        <Link
          to="/settings"
          className="flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E] px-4 py-2"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;
