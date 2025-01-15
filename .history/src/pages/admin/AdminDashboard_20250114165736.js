import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHome from "./AdminHome";
import AdminContactMessages from "./AdminContactMessages";
import UsersManagement from "./tabs/UsersManagement";
import HospitalsManagement from "./tabs/HospitalsManagement";
import BlogsManagement from "./tabs/BlogsManagement";
import PendingApprovals from "./tabs/PendingApprovals";
import ReportsManagement from "./tabs/ReportsManagement";

function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/users" element={<UsersManagement />} />
          <Route path="/hospitals" element={<HospitalsManagement />} />
          <Route path="/blogs" element={<BlogsManagement />} />
          <Route path="/contact-messages" element={<AdminContactMessages />} />
          <Route path="/pending" element={<PendingApprovals />} />
          <Route path="/reports" element={<ReportsManagement />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
