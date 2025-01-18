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
  
  const tabs = [
    { id: "users", name: t("admin.menu.usersManagement"), icon: Users },
    { id: "hospitals", name: t("admin.menu.hospitalsManagement"), icon: Building2 },
    { id: "blogs", name: t("admin.menu.blogsManagement"), icon: FileText },
    { id: "reports", name: t("admin.menu.reportsManagement"), icon: Flag },
    { id: "messages", name: t("admin.menu.contactMessages"), icon: MessageSquare },
    { id: "pending", name: t("admin.menu.pendingApprovals"), icon: ClipboardList },
  ];

  return (
    <div className="h-full p-6">
      <h1 className="text-[#1A3C8E] text-xl font-bold mb-2">Admin Dashboard</h1>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1A3C8E] mb-8"
      >
        <Home size={18} />
        <span>{t("admin.menu.backToWebsite")}</span>
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
