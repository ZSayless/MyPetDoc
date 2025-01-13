import React from "react";

function SecurityInfo({ onChangePassword }) {
  return (
    <div>
      <h2 className="text-xl mb-2">Password & Security</h2>
      <p className="text-gray-600 mb-6">
        Manage your password and security settings.
      </p>

      <div className="bg-[#F8F9FF] rounded-2xl">
        <div className="p-4">
          <h3 className="text-base font-medium mb-1">Login & Recovery</h3>
          <p className="text-gray-600 text-sm">Manage your password.</p>
        </div>

        <div className="bg-white rounded-2xl">
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={onChangePassword}
          >
            <div>
              <div className="font-medium">Change Password</div>
              <div className="text-gray-600 mt-1">Password not changed</div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityInfo; 