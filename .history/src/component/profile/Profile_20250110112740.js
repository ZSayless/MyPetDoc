import React, { useState } from 'react';
import { X } from 'lucide-react';

function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showEditName, setShowEditName] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [user] = useState({
    name: "Khương Thanh",
    username: "thanhkhuong",
    bio: "Chưa cập nhật",
    avatar: "T",
  });

  const renderPersonalInfo = () => (
    // ... code renderPersonalInfo giữ nguyên
  );

  const renderSecurityInfo = () => (
    // ... code renderSecurityInfo giữ nguyên
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Cài đặt tài khoản</h1>
          <p className="text-gray-600 mt-1">
            Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo, v.v.
          </p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-[280px,1fr] gap-8">
          {/* Sidebar */}
          <div className="bg-[#F8F9FF] rounded-2xl p-4">
            <div className="space-y-1">
              <button 
                className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 ${
                  activeTab === 'personal' ? 'bg-[#1A1A37] text-white' : ''
                }`}
                onClick={() => setActiveTab('personal')}
              >
                <span className="text-xl">👤</span>
                <span className="font-medium">Thông tin cá nhân</span>
              </button>
              <button 
                className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 ${
                  activeTab === 'security' ? 'bg-[#1A1A37] text-white' : ''
                }`}
                onClick={() => setActiveTab('security')}
              >
                <span className="text-xl">🔒</span>
                <span className="font-medium">Mật khẩu và bảo mật</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div>
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'security' && renderSecurityInfo()}
          </div>
        </div>
      </div>

      {/* ... các modals giữ nguyên ... */}
    </div>
  );
}

export default Profile;
