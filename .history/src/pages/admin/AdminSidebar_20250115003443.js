import { Link } from "react-router-dom";
import {
  BarChart2,
  Users,
  Hospital,
  FileText,
  ClipboardList,
  Flag,
  MessageSquare,
  Home,
} from "lucide-react";

function AdminSidebar() {
  const menuItems = [
    {
      title: "Overview",
      icon: <BarChart2 className="w-5 h-5" />,
      path: "/admin",
    },
    {
      title: "Users Management",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/users",
    },
    {
      title: "Hospitals Management",
      icon: <Hospital className="w-5 h-5" />,
      path: "/admin/hospitals",
    },
    {
      title: "Blogs Management",
      icon: <FileText className="w-5 h-5" />,
      path: "/admin/blogs",
    },
    {
      title: "Contact Messages",
      icon: <MessageSquare className="w-5 h-5" />,
      path: "/admin/contact-messages",
    },
    {
      title: "Pending Approvals",
      icon: <ClipboardList className="w-5 h-5" />,
      path: "/admin/pending",
    },
    {
      title: "Reports Management",
      icon: <Flag className="w-5 h-5" />,
      path: "/admin/reports",
    },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-sm">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mt-4"
        >
          <Home className="w-5 h-5" />
          <span>Back to Website</span>
        </Link>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default AdminSidebar;
