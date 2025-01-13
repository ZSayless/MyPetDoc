import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./tabs/PersonalInfo";
import SecurityInfo from "./tabs/SecurityInfo";
import EditNameModal from "./modals/EditNameModal";
import EditUsernameModal from "./modals/EditUsernameModal";
import EditAvatarModal from "./modals/EditAvatarModal";
import ChangePasswordModal from "./modals/ChangePasswordModal";

function Setting() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [showEditName, setShowEditName] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [showEditAvatar, setShowEditAvatar] = useState(false);

  const [user] = useState({
    name: "John Doe",
    username: "johndoe",
    avatar: "J",
    socialMedia: {
      website: "Not updated",
      github: "Not updated", 
      linkedin: "Not updated",
      facebook: "Not updated",
      youtube: "Not updated",
      tiktok: "Not updated"
    }
  });

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center">
          <button
            onClick={handleClose}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <h1 className="flex-1 text-xl font-semibold text-center">
            Account Settings
          </h1>

          <button
            onClick={handleClose}
            className="hidden lg:flex w-10 h-10 items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              {/* Mobile tabs */}
              <div className="flex lg:hidden overflow-x-auto mb-6 -mx-4 px-4">
                <button
                  className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 ${
                    activeTab === "personal"
                      ? "bg-[#1A1A37] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setActiveTab("personal")}
                >
                  Personal Info
                </button>
                <button
                  className={`flex-shrink-0 px-4 py-2 rounded-full ${
                    activeTab === "security"
                      ? "bg-[#1A1A37] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  Password & Security
                </button>
              </div>

              {/* Desktop sidebar */}
              <div className="hidden lg:block sticky top-20">
                <button
                  className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 ${
                    activeTab === "personal" ? "bg-[#1A1A37] text-white" : ""
                  }`}
                  onClick={() => setActiveTab("personal")}
                >
                  <span className="text-xl">👤</span>
                  <span className="font-medium">Personal Info</span>
                </button>
                <button
                  className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 mt-1 ${
                    activeTab === "security" ? "bg-[#1A1A37] text-white" : ""
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  <span className="text-xl">🔒</span>
                  <span className="font-medium">Password & Security</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="col-span-12 lg:col-span-9">
              {activeTab === "personal" && (
                <PersonalInfo
                  user={user}
                  onEditName={() => setShowEditName(true)}
                  onEditUsername={() => setShowEditUsername(true)}
                  onEditAvatar={() => setShowEditAvatar(true)}
                />
              )}
              {activeTab === "security" && (
                <SecurityInfo
                  onChangePassword={() => setShowChangePassword(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEditName && <EditNameModal onClose={() => setShowEditName(false)} />}
      {showEditUsername && (
        <EditUsernameModal onClose={() => setShowEditUsername(false)} />
      )}
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
      {showEditAvatar && (
        <EditAvatarModal onClose={() => setShowEditAvatar(false)} />
      )}
    </div>
  );
}

export default Setting;
