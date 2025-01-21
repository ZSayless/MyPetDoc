import React, { useState, useCallback } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EditNameModal from "./modals/EditNameModal";
import EditAvatarModal from "./modals/EditAvatarModal";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import EditSocialMediaModal from "./modals/EditSocialMediaModal";
import { useAuth } from "../../context/AuthContext";
import Toast from '../common/Toast';

function Setting() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, updateUser, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [showEditName, setShowEditName] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [toast, setToast] = useState(null);

  // Memoize initial form data
  const initialFormData = useCallback(
    () => ({
      name: user?.name || "Admin User",
      avatar: user?.avatar || user?.name?.charAt(0) || "A",
      bio: user?.bio || "",
      socialMedia: {
        facebook: user?.socialMedia?.facebook || "",
        x: user?.socialMedia?.x || "",
        instagram: user?.socialMedia?.instagram || "",
      },
    }),
    [user]
  );

  const [formData, setFormData] = useState(initialFormData);

  // Memoize handlers
  const handleEditSocial = useCallback(
    (platform) => {
      const socialMedia = user?.socialMedia || {};
      setSelectedSocial({
        platform,
        value: socialMedia[platform.toLowerCase()] || "",
      });
    },
    [user?.socialMedia]
  );

  const handleUpdateSocial = useCallback(
    (newValue) => {
      const currentSocialMedia = user?.socialMedia || {};
      updateUser({
        socialMedia: {
          ...currentSocialMedia,
          [selectedSocial.platform.toLowerCase()]: newValue,
        },
      });
      setSelectedSocial(null);
    },
    [user?.socialMedia, selectedSocial, updateUser]
  );

  const handleClose = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      // Hiển thị thông báo thành công
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Hiển thị thông báo lỗi
    }
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const handleAvatarUpdate = async (base64Image) => {
    try {
      // Kiểm tra kích thước file
      const sizeInMB = (base64Image.length * 3) / 4 / 1024 / 1024;
      if (sizeInMB > 2) {
        setToast({
          message: t('setting.modal.editAvatar.fileSizeError'),
          type: 'error'
        });
        return;
      }

      const updatedUser = {
        ...user,
        avatar: base64Image,
      };
      
      await updateUser(updatedUser);
      setUser(updatedUser);
      setShowEditAvatar(false);
    } catch (error) {
      console.error("Failed to update avatar:", error);
      setToast({
        message: t('setting.errors.updateFailed'),
        type: 'error'
      });
    }
  };

  const renderPersonalInfo = () => (
    <div>
      <h2 className="text-xl mb-2">{t("setting.personal.title")}</h2>
      <p className="text-gray-600 mb-6">{t("setting.personal.description")}</p>

      <div className="bg-[#F8F9FF] rounded-2xl">
        <div className="p-4">
          <h3 className="text-base font-medium mb-1">
            {t("setting.personal.basic.title")}
          </h3>
          <p className="text-gray-600 text-sm">
            {t("setting.personal.basic.description")}
          </p>
        </div>

        <div className="bg-white rounded-2xl">
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setShowEditName(true)}
          >
            <div>
              <div className="font-medium">
                {t("setting.personal.basic.fullName")}
              </div>
              <div className="text-gray-600 mt-1">
                {user?.name || "Admin User"}
              </div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </div>

          <div className="border-t">
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setShowEditAvatar(true)}
            >
              <div>
                <div className="font-medium">
                  {t("setting.personal.basic.avatar")}
                </div>
                <div className="mt-2 w-12 h-12 rounded-full overflow-hidden">
                  {user?.avatar?.startsWith("data:image") ? (
                    <img
                      src={user.avatar}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-600 flex items-center justify-center text-white text-xl">
                      {user?.name?.charAt(0) || "A"}
                    </div>
                  )}
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
          <h3 className="text-base font-medium mb-1">
            {t("setting.personal.social.title")}
          </h3>
          <p className="text-gray-600 text-sm">
            {t("setting.personal.social.description")}
          </p>
        </div>

        <div className="bg-white rounded-2xl">
          {["Facebook", "X", "Instagram"].map((platform) => (
            <div key={platform} className="border-t first:border-t-0">
              <div
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleEditSocial(platform)}
              >
                <div>
                  <div className="font-medium">
                    {t(`setting.personal.social.${platform.toLowerCase()}`)}
                  </div>
                  <div className="text-gray-600 mt-1">
                    {(user?.socialMedia &&
                      user.socialMedia[platform.toLowerCase()]) ||
                      t("setting.personal.social.notLinked")}
                  </div>
                </div>
                <span className="text-gray-400 text-xl">›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityInfo = () => (
    <div>
      <h2 className="text-xl mb-2">{t("setting.security.title")}</h2>
      <p className="text-gray-600 mb-6">{t("setting.security.description")}</p>

      <div className="bg-[#F8F9FF] rounded-2xl">
        <div className="p-4">
          <h3 className="text-base font-medium mb-1">
            {t("setting.security.login.title")}
          </h3>
          <p className="text-gray-600 text-sm">
            {t("setting.security.login.description")}
          </p>
        </div>

        <div className="bg-white rounded-2xl">
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setShowChangePassword(true)}
          >
            <div>
              <div className="font-medium">
                {t("setting.security.login.changePassword")}
              </div>
              <div className="text-gray-600 mt-1">
                {t("setting.security.login.notChanged")}
              </div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center z-10">
          {/* Back button for mobile */}
          <button
            onClick={handleClose}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Title */}
          <h1 className="flex-1 text-xl font-semibold text-center">
            Account Settings
          </h1>

          {/* Close button for desktop */}
          <button
            onClick={handleClose}
            className="hidden lg:flex w-10 h-10 items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              {/* Mobile tabs */}
              <div className="flex lg:hidden overflow-x-auto mb-6 -mx-4 px-4">
                <button
                  className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 ${
                    activeTab === "personal"
                      ? "bg-[#1A1A37] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setActiveTab("personal")}
                >
                  Personal Info
                </button>
                <button
                  className={`flex-shrink-0 px-4 py-2 rounded-full ${
                    activeTab === "security"
                      ? "bg-[#1A1A37] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  Password & Security
                </button>
              </div>

              {/* Desktop sidebar */}
              <div className="hidden lg:block sticky top-20">
                <button
                  className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 ${
                    activeTab === "personal" ? "bg-[#1A1A37] text-white" : ""
                  }`}
                  onClick={() => setActiveTab("personal")}
                >
                  <span className="text-xl">👤</span>
                  <span className="font-medium">
                    {t("setting.personal.tab")}
                  </span>
                </button>
                <button
                  className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 mt-1 ${
                    activeTab === "security" ? "bg-[#1A1A37] text-white" : ""
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  <span className="text-xl">🔒</span>
                  <span className="font-medium">
                    {t("setting.security.tab")}
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="col-span-12 lg:col-span-9">
              {activeTab === "personal" && renderPersonalInfo()}
              {activeTab === "security" && renderSecurityInfo()}
            </div>
          </div>
        </div>

        {/* Modals */}
        <EditNameModal
          isOpen={showEditName}
          onClose={() => setShowEditName(false)}
          currentName={user?.name || "Admin User"}
          onSubmit={(newName) => updateUser({ name: newName })}
        />
        <EditAvatarModal
          isOpen={showEditAvatar}
          onClose={() => setShowEditAvatar(false)}
          currentAvatar={user?.avatar || user?.name?.charAt(0) || "A"}
          onSubmit={handleAvatarUpdate}
        />
        {selectedSocial && (
          <EditSocialMediaModal
            platform={selectedSocial.platform}
            value={selectedSocial.value}
            onClose={() => setSelectedSocial(null)}
            onSubmit={handleUpdateSocial}
          />
        )}
        {showChangePassword && (
          <ChangePasswordModal
            isOpen={showChangePassword}
            onClose={() => setShowChangePassword(false)}
          />
        )}
        
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Setting;
