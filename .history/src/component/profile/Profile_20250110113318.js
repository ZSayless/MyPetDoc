import React, { useState } from 'react';
import { X } from 'lucide-react';

function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
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
          <p className="text-gray-600 text-sm">
            Quản lý mật khẩu của bạn.
          </p>
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
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Cài đặt tài khoản</h1>
          <p className="text-gray-600 mt-1">
            Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo, v.v.
          </p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-[280px,1fr] gap-8">
          {/* Sidebar - Thêm sticky positioning */}
          <div className="sticky top-4 h-fit">
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
              className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 mt-1 ${
                activeTab === 'security' ? 'bg-[#1A1A37] text-white' : ''
              }`}
              onClick={() => setActiveTab('security')}
            >
              <span className="text-xl">🔒</span>
              <span className="font-medium">Mật khẩu và bảo mật</span>
            </button>
          </div>

          {/* Content Area */}
          <div>
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'security' && renderSecurityInfo()}
          </div>
        </div>
      </div>

      {/* Modals */}
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

      {showChangePassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-medium">Đổi mật khẩu</h3>
              <button onClick={() => setShowChangePassword(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Mật khẩu của bạn phải có tối thiểu 8 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%...).
              </p>
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
                    Nhập lại mật khẩu mới
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Nhập lại mật khẩu mới của bạn"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="logout-devices" className="rounded" />
                  <label htmlFor="logout-devices" className="text-sm text-gray-700">
                    Đăng xuất khỏi các thiết bị khác
                  </label>
                </div>

                <button className="w-full bg-[#98E9E9] text-gray-700 py-2 rounded-lg hover:bg-[#7CD5D5]">
                  Đổi mật khẩu
                </button>

                <div className="text-center">
                  <a href="#" className="text-red-500 text-sm hover:underline">
                    Bạn quên mật khẩu ư?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Username Modal */}
      {showEditUsername && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-medium">Cập nhật tên người dùng</h3>
              <button onClick={() => setShowEditUsername(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Tên người dùng sẽ được sử dụng trong URL trang cá nhân của bạn.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên người dùng
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  defaultValue={user.username}
                />
              </div>
              <button className="w-full bg-[#98E9E9] text-gray-700 py-2 rounded-lg hover:bg-[#7CD5D5]">
                Lưu lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bio Modal */}
      {showEditBio && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-medium">Cập nhật giới thiệu</h3>
              <button onClick={() => setShowEditBio(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Thêm một vài thông tin về bản thân bạn.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giới thiệu
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg h-32 resize-none"
                  defaultValue={user.bio}
                  placeholder="Viết gì đó về bản thân..."
                />
              </div>
              <button className="w-full bg-[#98E9E9] text-gray-700 py-2 rounded-lg hover:bg-[#7CD5D5]">
                Lưu lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Avatar Modal */}
      {showEditAvatar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-medium">Cập nhật ảnh đại diện</h3>
              <button onClick={() => setShowEditAvatar(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl">
                  {user.avatar}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tải lên ảnh mới
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border rounded-lg"
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
