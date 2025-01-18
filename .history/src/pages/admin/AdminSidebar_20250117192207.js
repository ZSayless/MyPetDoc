import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  FileText,
  Flag,
  MessageSquare,
  ClipboardList,
  Home,
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
    <div className="h-full p-6">
      <h1 className="text-[#1A3C8E] text-xl font-bold mb-2">Admin Dashboard</h1>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E] mb-8"
      >
        <Home size={18} />
        <span>Back to Website</span>
      </Link>

      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-[#98E9E9]/20 text-[#1A3C8E]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={18} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default AdminSidebar;
