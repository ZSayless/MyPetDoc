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
import { useTranslation } from "react-i18next";

function AdminSidebar({ activeTab, setActiveTab }) {
  const { t } = useTranslation();

  const menuItems = [
    { name: t("admin.dashboard.menu.users"), icon: Users, path: "users" },
    { name: t("admin.dashboard.menu.hospitals"), icon: Building2, path: "hospitals" },
    { name: t("admin.dashboard.menu.blogs"), icon: FileText, path: "blogs" },
    { name: t("admin.dashboard.menu.reports"), icon: Flag, path: "reports" },
    { name: t("admin.dashboard.menu.messages"), icon: MessageSquare, path: "messages" },
    { name: t("admin.dashboard.menu.approvals"), icon: ClipboardList, path: "approvals" }
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
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => setActiveTab(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === item.path
                  ? "bg-[#98E9E9]/20 text-[#1A3C8E]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default AdminSidebar;
