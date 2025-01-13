import React from "react";

function PersonalInfo({ user, onEditName, onEditUsername, onEditAvatar }) {
  return (
    <div>
      <h2 className="text-xl mb-2">Personal Information</h2>
      <p className="text-gray-600 mb-6">Manage your personal information.</p>

      {/* Basic Info Section */}
      <div className="bg-[#F8F9FF] rounded-2xl">
        <div className="p-4">
          <h3 className="text-base font-medium mb-1">Basic Information</h3>
          <p className="text-gray-600 text-sm">
            Manage your display name, username and avatar.
          </p>
        </div>

        <div className="bg-white rounded-2xl">
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={onEditName}
          >
            <div>
              <div className="font-medium">Full Name</div>
              <div className="text-gray-600 mt-1">{user.name}</div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </div>

          <div className="border-t">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={onEditUsername}
            >
              <div>
                <div className="font-medium">Username</div>
                <div className="text-gray-600 mt-1">{user.username}</div>
              </div>
              <span className="text-gray-400 text-xl">›</span>
            </div>
          </div>

          <div className="border-t">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={onEditAvatar}
            >
              <div>
                <div className="font-medium">Avatar</div>
                <div className="mt-2 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl">
                  {user.avatar}
                </div>
              </div>
              <span className="text-gray-400 text-xl">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-[#F8F9FF] rounded-2xl mt-8">
        <div className="p-4">
          <h3 className="text-base font-medium mb-1">Social Media Links</h3>
          <p className="text-gray-600 text-sm">
            Manage your social media connections.
          </p>
        </div>

        <div className="bg-white rounded-2xl">
          {Object.entries(user.socialMedia).map(([platform, value]) => (
            <div key={platform} className="border-t first:border-t-0">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                <div>
                  <div className="font-medium">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </div>
                  <div className="text-gray-600 mt-1">{value}</div>
                </div>
                <span className="text-gray-400 text-xl">›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo; 