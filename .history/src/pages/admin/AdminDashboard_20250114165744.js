import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminContactMessages from "./AdminContactMessages";

function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<div>Overview Dashboard</div>} />
          <Route path="/users" element={<div>Users Management</div>} />
          <Route path="/hospitals" element={<div>Hospitals Management</div>} />
          <Route path="/blogs" element={<div>Blogs Management</div>} />
          <Route path="/contact-messages" element={<AdminContactMessages />} />
          <Route path="/pending" element={<div>Pending Approvals</div>} />
          <Route path="/reports" element={<div>Reports Management</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
