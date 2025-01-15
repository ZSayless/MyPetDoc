import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Mail, Phone, User, MessageSquare, Trash2, Check } from "lucide-react";

function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all"); // all, unread, read

  // Tạm thời dùng dữ liệu mẫu
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        // Giả lập API call
        const sampleMessages = [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "0123456789",
            message: "I have a question about pet vaccination services.",
            createdAt: "2024-03-15T08:30:00Z",
            status: "unread"
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "0987654321",
            message: "Looking for information about pet grooming services.",
            createdAt: "2024-03-14T15:45:00Z",
            status: "read"
          }
        ];
        setMessages(sampleMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleMarkAsRead = async (messageId) => {
    try {
      // Tạm thời update local state
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: "read" } : msg
      ));
      
      // Khi có API:
      // await adminService.markMessageAsRead(messageId);
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleDelete = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        // Tạm thời update local state
        setMessages(messages.filter(msg => msg.id !== messageId));
        
        // Khi có API:
        // await adminService.deleteMessage(messageId);
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (selectedStatus === "all") return true;
    return msg.status === selectedStatus;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Contact Messages</h1>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading messages...</div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No messages found</div>
      ) : (
        <div className="grid gap-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-lg shadow-sm p-4 ${
                msg.status === "unread" ? "border-l-4 border-blue-500" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">{msg.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a
                      href={`tel:${msg.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {msg.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {msg.status === "unread" && (
                    <button
                      onClick={() => handleMarkAsRead(msg.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                      title="Mark as read"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Delete message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-gray-400 mt-1" />
                <p className="text-gray-700">{msg.message}</p>
              </div>

              <div className="text-sm text-gray-500">
                {format(new Date(msg.createdAt), "MMM d, yyyy 'at' h:mm a")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminContactMessages; 