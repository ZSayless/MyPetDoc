import React, { useState, useCallback } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EditNameModal from "./modals/EditNameModal";
import EditAvatarModal from "./modals/EditAvatarModal";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import EditSocialMediaModal from "./modals/EditSocialMediaModal";
import { useAuth } from "../../context/AuthContext";

function Setting() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, updateUser, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [showEditName, setShowEditName] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);

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

  const updateUserProfile = async (data) => {
    try {
      // TODO: Thay thế bằng API call thực tế
      console.log("Updating profile with:", data);
      await updateUser(data);
    } catch (error) {
      throw new Error("Failed to update profile");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      setUser(prev => ({
        ...prev,
        ...formData
      }));
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

      {/* ... rest of security info section ... */}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen bg-white">
        {renderPersonalInfo()}
        {renderSecurityInfo()}
      </div>
    </div>
  );
}

export default Setting;