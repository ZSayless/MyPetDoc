import { MessageSquare } from "lucide-react";

function AdminSidebar() {
  const menuItems = [
    {
      title: "Contact Messages",
      icon: <MessageSquare className="w-5 h-5" />,
      path: "/admin/contact-messages"
    },
  ];

  return (
    // ... existing code
  );
}

export default AdminSidebar; 