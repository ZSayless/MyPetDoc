import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";
import EditNameModal from "./EditNameModal";
import EditAvatarModal from "./EditAvatarModal";
import EditSocialMediaModal from "./EditSocialMediaModal";
import ChangePasswordModal from "./ChangePasswordModal";

function Setting() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [showEditName, setShowEditName] = useState(false);
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [showEditSocial, setShowEditSocial] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t("auth.settings")}</h1>

        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="space-y-4">
            {/* Name Setting */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{t("auth.name")}</h3>
                <p className="text-gray-600">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <button
                onClick={() => setShowEditName(true)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                {t("auth.edit")}
              </button>
            </div>

            {/* Avatar Setting */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{t("auth.avatar")}</h3>
                <p className="text-gray-600">{t("auth.changeAvatar")}</p>
              </div>
              <button
                onClick={() => setShowEditAvatar(true)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                {t("auth.edit")}
              </button>
            </div>

            {/* Social Media Setting */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{t("auth.socialMedia")}</h3>
                <p className="text-gray-600">{t("auth.manageSocial")}</p>
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
                <p className="text-gray-600">{t("auth.changePassword")}</p>
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
      />
      <EditAvatarModal
        isOpen={showEditAvatar}
        onClose={() => setShowEditAvatar(false)}
      />
      <EditSocialMediaModal
        isOpen={showEditSocial}
        onClose={() => setShowEditSocial(false)}
      />
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
}

export default Setting; 