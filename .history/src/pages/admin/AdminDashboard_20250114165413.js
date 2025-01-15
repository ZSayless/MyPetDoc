import { useState, useEffect } from "react";
import {
  Users,
  Hospital,
  FileText,
  Calendar,
  BarChart2,
  Search,
  Home,
  ArrowLeft,
  X,
  Menu,
  ClipboardList,
  Flag,
} from "lucide-react";
import { Link, Routes, Route } from "react-router-dom";
import UsersManagement from "./tabs/UsersManagement";
import HospitalsManagement from "./tabs/HospitalsManagement";
import BlogsManagement from "./tabs/BlogsManagement";
import PendingApprovals from "./tabs/PendingApprovals";
import ReportsManagement from "./tabs/ReportsManagement";
import AdminSidebar from "./AdminSidebar";
import AdminContactMessages from "./AdminContactMessages";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("adminActiveTab") || "overview";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);

  const menuItems = [
    { id: "overview", name: "Overview", icon: BarChart2 },
    { id: "users", name: "Users Management", icon: Users },
    { id: "hospitals", name: "Hospitals Management", icon: Hospital },
    { id: "blogs", name: "Blogs Management", icon: FileText },
    { id: "pending", name: "Pending Approvals", icon: ClipboardList },
    { id: "reports", name: "Reports Management", icon: Flag },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/contact-messages" element={<AdminContactMessages />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
