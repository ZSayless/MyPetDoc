import React, { useState } from 'react';
import { X } from 'lucide-react';

function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showEditName, setShowEditName] = useState(false);

  const [user] = useState({
    name: "Khương Thanh",
    username: "thanhkhuong",
    bio: "Chưa cập nhật",
    avatar: "T",
    website: "Chưa cập nhật",
    github: "Chưa cập nhật",
    linkedin: "Chưa cập nhật"
  });

  const renderPersonalInfo = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-medium">Thông tin cá nhân</h2>
        <p className="text-gray-600">Quản lý thông tin cá nhân của bạn.</p>
      </div>

      {/* Thông tin cơ bản section */}
      <div className="bg-[#F8F9FF] rounded-lg mb-6">
        <div className="p-4">
          <h3 className="text-lg font-medium">Thông tin cơ bản</h3>
          <p className="text-gray-600 text-sm">Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</p>
        </div>

        <div className="bg-white">
          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                 onClick={() => setShowEditName(true)}>
              <div>
                <h4 className="font-medium">Họ và tên</h4>
                <p className="text-gray-600">{user.name}</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Tên người dùng</h4>
                <p className="text-gray-600">{user.username}</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Giới thiệu</h4>
                <p className="text-gray-600">{user.bio}</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Ảnh đại diện</h4>
                <div className="mt-2 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl">
                  {user.avatar}
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin mạng xã hội section */}
      <div className="bg-[#F8F9FF] rounded-lg">
        <div className="p-4">
          <h3 className="text-lg font-medium">Thông tin mạng xã hội</h3>
          <p className="text-gray-600 text-sm">Quản lý liên kết tới các trang mạng xã hội của bạn.</p>
        </div>

        <div className="bg-white">
          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div>
                <h4 className="font-medium">Trang web cá nhân</h4>
                <p className="text-gray-600">{user.website}</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div>
                <h4 className="font-medium">GitHub</h4>
                <p className="text-gray-600">{user.github}</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div>
                <h4 className="font-medium">LinkedIn</h4>
                <p className="text-gray-600">{user.linkedin}</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
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
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-[280px,1fr]">
            {/* Sidebar */}
            <div className="bg-white border-r">
              <div className="p-2">
                <button 
                  className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${
                    activeTab === 'personal' ? 'bg-[#1A1A37] text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('personal')}
                >
                  <span>👤</span>
                  <span>Thông tin cá nhân</span>
                </button>
                <button 
                  className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${
                    activeTab === 'security' ? 'bg-[#1A1A37] text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('security')}
                >
                  <span>🔒</span>
                  <span>Mật khẩu và bảo mật</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 bg-[#F8F9FF]">
              {activeTab === 'personal' && renderPersonalInfo()}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Name Modal */}
      {showEditName && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Cập nhật tên của bạn</h3>
              <button onClick={() => setShowEditName(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
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
      )}
    </div>
  );
}

export default Profile; 