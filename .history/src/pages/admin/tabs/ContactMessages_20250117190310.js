import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Mail, Trash2, X } from "lucide-react";
import {
  deleteMessage,
  markMessageAsRead,
} from "../../../redux/slices/adminSlice";
import { useTranslation } from "react-i18next";

function ContactMessages() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleView = async (message) => {
    setSelectedMessage(message);
    if (message.status === "unread") {
      dispatch(markMessageAsRead(message.id));
    }
  };

  const handleDelete = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteMessage(messageId));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    }
  };

  const handleReply = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-6">{t("admin.messages.title")}</h2>
      
      <input
        type="text"
        placeholder={t("admin.messages.search")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
      />

      <table>
        <thead>
          <tr>
            <th>{t("admin.messages.table.sender")}</th>
            <th>{t("admin.messages.table.subject")}</th>
            <th>{t("admin.messages.table.date")}</th>
            <th>{t("admin.messages.table.status")}</th>
            <th>{t("admin.messages.table.actions")}</th>
          </tr>
        </thead>
        {/* ... table body */}
      </table>
    </div>
  );
}

export default ContactMessages;
