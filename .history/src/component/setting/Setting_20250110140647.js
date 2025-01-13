import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [showEditName, setShowEditName] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [showEditBio, setShowEditBio] = useState(false);
  const [showEditAvatar, setShowEditAvatar] = useState(false);

  const [user] = useState({
    name: "Khương Thanh",
    username: "thanhkhuong",
    bio: "Chưa cập nhật",
    avatar: "T",
  });

  const renderPersonalInfo = () => (
    <div>
      <h2 className="text-xl mb-2">Thông tin cá nhân</h2>
      <p className="text-gray-600 mb-6">Quản lý thông tin cá nhân của bạn.</p>

      <div className="bg-[#F8F9FF] rounded-2xl">
        <div className="p-4">
          <h3 className="text-base font-medium mb-1">Thông tin cơ bản</h3>
          <p className="text-gray-600 text-sm">
            Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.
          </p>
        </div>

        <div className="bg-white rounded-2xl">
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setShowEditName(true)}
          >
            <div>
              <div className="font-medium">Họ và tên</div>
              <div className="text-gray-600 mt-1">{user.name}</div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </div>

          <div className="border-t">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setShowEditUsername(true)}
            >
              <div>
                <div className="font-medium">Tên người dùng</div>
                <div className="text-gray-600 mt-1">{user.username}</div>
              </div>
              <span className="text-gray-400 text-xl">›</span>
            </div>
          </div>

          <div className="border-t">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setShowEditBio(true)}
            >
              <div>
                <div className="font-medium">Giới thiệu</div>
                <div className="text-gray-600 mt-1">{user.bio}</div>
              </div>
              <span className="text-gray-400 text-xl">›</span>
            </div>
          </div>

          <div className="border-t">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setShowEditAvatar(true)}
            >
              <div>
                <div className="font-medium">Ảnh đại diện</div>
                <div className="mt-2 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl">
                  {user.avatar}
                </div>
              </div>
              <span className="text-gray-400 text-xl">›</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityInfo = () => (
    <div>
      <h2 className="text-xl mb-2">Mật khẩu và bảo mật</h2>
      <p className="text-gray-600 mb-6">Quản lý mật khẩu và cài đặt bảo mật.</p>

      <div className="bg-[#F8F9FF] rounded-2xl">
        <div className="p-4">
          <h3 className="text-base font-medium mb-1">Đăng nhập & khôi phục</h3>
          <p className="text-gray-600 text-sm">Quản lý mật khẩu của bạn.</p>
        </div>

        <div className="bg-white rounded-2xl">
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setShowChangePassword(true)}
          >
            <div>
              <div className="font-medium">Đổi mật khẩu</div>
              <div className="text-gray-600 mt-1">Chưa đổi mật khẩu</div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Main Container */}
        <div className="grid grid-cols-[280px,1fr] gap-8">
          {/* Left Column - Title and Sidebar */}
          <div className="sticky top-4 h-fit">
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Cài đặt tài khoản</h1>
              <p className="text-gray-600 mt-1">
                Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt
                bảo mật, quản lý thông báo, v.v.
              </p>
            </div>

            {/* Sidebar */}
            <div>
              <button
                className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 ${
                  activeTab === "personal" ? "bg-[#1A1A37] text-white" : ""
                }`}
                onClick={() => setActiveTab("personal")}
              >
                <span className="text-xl">👤</span>
                <span className="font-medium">Thông tin cá nhân</span>
              </button>
              <button
                className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 mt-1 ${
                  activeTab === "security" ? "bg-[#1A1A37] text-white" : ""
                }`}
                onClick={() => setActiveTab("security")}
              >
                <span className="text-xl">🔒</span>
                <span className="font-medium">Mật khẩu và bảo mật</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div>
            {activeTab === "personal" && renderPersonalInfo()}
            {activeTab === "security" && renderSecurityInfo()}
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* Copy toàn bộ phần modals từ Profile.js sang đây */}
    </div>
  );
}

export default Setting;
