import { useState } from "react";
import { useTranslation } from "react-i18next";

function Setting() {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({
    language: i18n.language,
    theme: "light",
    notifications: "all",
    privacy: {
      isPublic: true,
      showEmail: false,
      showPhone: false,
    },
  });

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setSettings({ ...settings, language: lang });
  };

  const handleThemeChange = (theme) => {
    setSettings({ ...settings, theme });
    // Implement theme change logic
  };

  const handleNotificationChange = (value) => {
    setSettings({ ...settings, notifications: value });
  };

  const handlePrivacyChange = (key) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key],
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t("settings.title")}
          </h1>

          {/* Language Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("settings.language.title")}
            </h2>
            <p className="text-gray-600 mb-4">
              {t("settings.language.description")}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-4 py-2 rounded-lg ${
                  settings.language === "en"
                    ? "bg-[#1A3C8E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t("settings.language.options.en")}
              </button>
              <button
                onClick={() => handleLanguageChange("vi")}
                className={`px-4 py-2 rounded-lg ${
                  settings.language === "vi"
                    ? "bg-[#1A3C8E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t("settings.language.options.vi")}
              </button>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("settings.theme.title")}
            </h2>
            <p className="text-gray-600 mb-4">
              {t("settings.theme.description")}
            </p>
            <div className="flex gap-4">
              {["light", "dark", "system"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  className={`px-4 py-2 rounded-lg ${
                    settings.theme === theme
                      ? "bg-[#1A3C8E] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t(`settings.theme.options.${theme}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("settings.notifications.title")}
            </h2>
            <p className="text-gray-600 mb-4">
              {t("settings.notifications.description")}
            </p>
            <div className="space-y-3">
              {["all", "important", "none"].map((option) => (
                <label key={option} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="notifications"
                    checked={settings.notifications === option}
                    onChange={() => handleNotificationChange(option)}
                    className="w-4 h-4 text-[#1A3C8E]"
                  />
                  <span className="text-gray-700">
                    {t(`settings.notifications.options.${option}`)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("settings.privacy.title")}
            </h2>
            <p className="text-gray-600 mb-4">
              {t("settings.privacy.description")}
            </p>
            <div className="space-y-3">
              {Object.keys(settings.privacy).map((key) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.privacy[key]}
                    onChange={() => handlePrivacyChange(key)}
                    className="w-4 h-4 text-[#1A3C8E] rounded"
                  />
                  <span className="text-gray-700">
                    {t(`settings.privacy.options.${key}`)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button className="px-6 py-2 border rounded-lg hover:bg-gray-100">
              {t("settings.buttons.cancel")}
            </button>
            <button className="px-6 py-2 bg-[#1A3C8E] text-white rounded-lg hover:bg-[#98E9E9] hover:text-[#1A3C8E]">
              {t("settings.buttons.save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
