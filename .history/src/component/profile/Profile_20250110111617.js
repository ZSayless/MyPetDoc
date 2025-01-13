import React, { useState } from 'react';
import { X } from 'lucide-react';

function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showEditName, setShowEditName] = useState(false);
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

      <div className="bg-[#F8F9FF] rounded-lg mb-6">
        <div className="p-4">
          <h3 className="text-base font-medium mb-1">Thông tin cơ bản</h3>
          <p className="text-gray-600 text-sm">
            Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.
          </p>
        </div>

        <div className="bg-white divide-y">
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

          <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
            <div>
              <div className="font-medium">Tên người dùng</div>
              <div className="text-gray-600 mt-1">{user.username}</div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
            <div>
              <div className="font-medium">Giới thiệu</div>
              <div className="text-gray-600 mt-1">{user.bio}</div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
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
  );

  return (
    <div className="min-h-screen bg-[#F8F9FF]">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Cài đặt tài khoản</h1>
          <p className="text-gray-600 mt-1">
            Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo, v.v.
          </p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-[280px,1fr]">
          {/* Sidebar */}
          <div>
            <div className="space-y-1">
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'personal' ? 'bg-[#1A1A37] text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('personal')}
              >
                <span role="img" aria-label="user">👤</span>
                <span>Thông tin cá nhân</span>
              </button>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'security' ? 'bg-[#1A1A37] text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <span role="img" aria-label="lock">🔒</span>
                <span>Mật khẩu và bảo mật</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="pl-8">
            {activeTab === 'personal' && renderPersonalInfo()}
          </div>
        </div>
      </div>

      {/* Edit Name Modal */}
      {showEditName && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-medium">Cập nhật tên của bạn</h3>
              <button onClick={() => setShowEditName(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  defaultValue={user.name}
                />
              </div>
              <button className="w-full bg-[#98E9E9] text-gray-700 py-2 rounded-lg hover:bg-[#7CD5D5]">
                Lưu lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile; 