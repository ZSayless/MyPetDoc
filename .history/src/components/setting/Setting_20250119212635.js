import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import EditNameModal from "./modals/EditNameModal";
import EditAvatarModal from "./modals/EditAvatarModal";
import EditSocialMediaModal from "./modals/EditSocialMediaModal";
import ChangePasswordModal from "./modals/ChangePasswordModal";

function Setting() {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const [showEditName, setShowEditName] = useState(false);
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [showEditSocial, setShowEditSocial] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t("auth.settings")}</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Thông tin cơ bản */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">{t("setting.personal.basic.title")}</h2>
            <p className="text-gray-600 mb-4">{t("setting.personal.basic.description")}</p>

            {/* Name Setting */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-medium">{t("auth.name")}</h3>
                <p className="text-gray-600">{user?.name || "Admin User"}</p>
              </div>
              <button
                onClick={() => setShowEditName(true)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                {t("auth.edit")}
              </button>
            </div>

            {/* Avatar Setting */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-medium">{t("auth.avatar")}</h3>
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl mt-2">
                  {user?.avatar || user?.name?.charAt(0) || "A"}
                </div>
              </div>
              <button
                onClick={() => setShowEditAvatar(true)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                {t("auth.edit")}
              </button>
            </div>

            {/* Social Media Setting */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-medium">{t("auth.socialMedia")}</h3>
                <p className="text-gray-600">
                  {user?.username || user?.email?.split('@')[0]}
                </p>
              </div>
              <button
                onClick={() => setShowEditSocial(true)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                {t("auth.edit")}
              </button>
            </div>

            {/* Password Setting */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{t("auth.password")}</h3>
                <p className="text-gray-600">********</p>
              </div>
              <button
                onClick={() => setShowChangePassword(true)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                {t("auth.edit")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditNameModal
        isOpen={showEditName}
        onClose={() => setShowEditName(false)}
        currentName={user?.name || "Admin User"}
      />
      <EditAvatarModal
        isOpen={showEditAvatar}
        onClose={() => setShowEditAvatar(false)}
        currentAvatar={user?.avatar || user?.name?.charAt(0) || "A"}
      />
      <EditSocialMediaModal
        isOpen={showEditSocial}
        onClose={() => setShowEditSocial(false)}
        currentUsername={user?.username || user?.email?.split('@')[0]}
      />
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
}

export default Setting;
