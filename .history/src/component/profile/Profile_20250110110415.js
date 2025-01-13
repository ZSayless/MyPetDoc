import React, { useState } from 'react';
import { X } from 'lucide-react';

function Profile() {
  const [showEditName, setShowEditName] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [user] = useState({
    name: "Khương Thanh",
    username: "thanhkhuong",
    bio: "Chưa cập nhật",
    avatar: "T"
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Cài đặt tài khoản</h1>
          <p className="text-gray-600">
            Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo, v.v.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-[250px,1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-[#1A1A37] text-white">
              <span>👤 Thông tin cá nhân</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
              <span>🔒 Mật khẩu và bảo mật</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Thông tin cơ bản</h2>
              <p className="text-gray-600">Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</p>
            </div>

            {/* Profile Fields */}
            <div className="space-y-6">
              {/* Name Field */}
              <div className="flex items-center justify-between hover:bg-gray-50 p-4 rounded-lg cursor-pointer"
                   onClick={() => setShowEditName(true)}>
                <div>
                  <h3 className="font-medium">Họ và tên</h3>
                  <p className="text-gray-600">{user.name}</p>
                </div>
                <span className="text-gray-400">›</span>
              </div>

              {/* Username Field */}
              <div className="flex items-center justify-between hover:bg-gray-50 p-4 rounded-lg cursor-pointer">
                <div>
                  <h3 className="font-medium">Tên người dùng</h3>
                  <p className="text-gray-600">{user.username}</p>
                </div>
                <span className="text-gray-400">›</span>
              </div>

              {/* Bio Field */}
              <div className="flex items-center justify-between hover:bg-gray-50 p-4 rounded-lg cursor-pointer">
                <div>
                  <h3 className="font-medium">Giới thiệu</h3>
                  <p className="text-gray-600">{user.bio}</p>
                </div>
                <span className="text-gray-400">›</span>
              </div>

              {/* Avatar Field */}
              <div className="flex items-center justify-between hover:bg-gray-50 p-4 rounded-lg cursor-pointer">
                <div>
                  <h3 className="font-medium">Ảnh đại diện</h3>
                  <div className="mt-2 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl">
                    {user.avatar}
                  </div>
                </div>
                <span className="text-gray-400">›</span>
              </div>
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