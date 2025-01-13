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
    website: "Chưa cập nhật",
    github: "Chưa cập nhật",
    linkedin: "Chưa cập nhật"
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Thông tin cá nhân</h2>
              <p className="text-gray-600 text-sm">Quản lý thông tin cá nhân của bạn.</p>
            </div>

            <div className="bg-white rounded-lg">
              <div className="border-b">
                <div className="px-6 py-4">
                  <h3 className="text-base font-medium mb-1">Thông tin cơ bản</h3>
                  <p className="text-sm text-gray-500">Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</p>
                </div>
              </div>

              <div className="divide-y">
                <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer"
                     onClick={() => setShowEditName(true)}>
                  <div>
                    <h4 className="text-sm font-medium">Họ và tên</h4>
                    <p className="text-sm text-gray-600">{user.name}</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>

                <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="text-sm font-medium">Tên người dùng</h4>
                    <p className="text-sm text-gray-600">{user.username}</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>

                <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="text-sm font-medium">Giới thiệu</h4>
                    <p className="text-sm text-gray-600">{user.bio}</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>

                <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="text-sm font-medium">Ảnh đại diện</h4>
                    <div className="mt-1 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                      {user.avatar}
                    </div>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg">
              <div className="border-b">
                <div className="px-6 py-4">
                  <h3 className="text-base font-medium mb-1">Thông tin mạng xã hội</h3>
                  <p className="text-sm text-gray-500">Quản lý liên kết tới các trang mạng xã hội của bạn.</p>
                </div>
              </div>

              <div className="divide-y">
                <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="text-sm font-medium">Trang web cá nhân</h4>
                    <p className="text-sm text-gray-600">{user.website}</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>

                <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="text-sm font-medium">GitHub</h4>
                    <p className="text-sm text-gray-600">{user.github}</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>

                <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="text-sm font-medium">LinkedIn</h4>
                    <p className="text-sm text-gray-600">{user.linkedin}</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Mật khẩu và bảo mật</h2>
              <p className="text-gray-600 text-sm">Quản lý mật khẩu và xác minh 2 bước.</p>
            </div>

            <div className="bg-white rounded-lg">
              <div className="border-b">
                <div className="px-6 py-4">
                  <h3 className="text-base font-medium mb-1">Đăng nhập & khôi phục</h3>
                  <p className="text-sm text-gray-500">Quản lý mật khẩu và xác minh 2 bước.</p>
                </div>
              </div>

              <div className="divide-y">
                <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer"
                     onClick={() => setShowChangePassword(true)}>
                  <div>
                    <h4 className="text-sm font-medium">Đổi mật khẩu</h4>
                    <p className="text-sm text-gray-600">Chưa đổi mật khẩu</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>

                <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="text-sm font-medium">Xác minh 2 bước</h4>
                    <p className="text-sm text-gray-600">Đang tắt</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Cài đặt tài khoản</h1>
          <p className="text-gray-600 mt-1">
            Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo, v.v.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[280px,1fr]">
            <div className="border-r border-gray-200 p-4 space-y-1">
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'personal' ? 'bg-[#1A1A37] text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('personal')}
              >
                <span>👤</span>
                <span>Thông tin cá nhân</span>
              </button>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'security' ? 'bg-[#1A1A37] text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <span>🔒</span>
                <span>Mật khẩu và bảo mật</span>
              </button>
            </div>

            <div className="p-8">
              {renderContent()}
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

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Đổi mật khẩu</h3>
              <button onClick={() => setShowChangePassword(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Nhập mật khẩu hiện tại của bạn"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Nhập mật khẩu mới của bạn"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Nhập lại mật khẩu mới của bạn"
                />
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <input type="checkbox" id="logout-devices" />
                <label htmlFor="logout-devices">Đăng xuất khỏi các thiết bị khác</label>
              </div>
              <button className="w-full bg-[#98E9E9] text-gray-700 py-2 rounded-lg hover:bg-[#7CD5D5]">
                Đổi mật khẩu
              </button>
              <div className="text-center">
                <a href="#" className="text-red-500 text-sm">Bạn quên mật khẩu ư?</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile; 