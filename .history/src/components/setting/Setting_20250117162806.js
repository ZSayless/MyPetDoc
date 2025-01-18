import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function Setting() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("light");

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6">{t('settings.title')}</h2>

      {/* Language Settings */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {t('settings.language.label')}
        </label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">{t('settings.language.english')}</option>
          <option value="vi">{t('settings.language.vietnamese')}</option>
        </select>
      </div>

      {/* Notification Settings */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {t('settings.notification.label')}
        </label>
        <p className="text-gray-600 text-sm mb-2">
          {t('settings.notification.description')}
        </p>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-gray-700">
            {t('settings.notification.enable')}
          </span>
        </label>
      </div>

      {/* Theme Settings */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {t('settings.theme.label')}
        </label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="light"
              checked={theme === "light"}
              onChange={(e) => setTheme(e.target.value)}
              className="text-blue-600"
            />
            <span className="ml-2">{t('settings.theme.light')}</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="dark"
              checked={theme === "dark"}
              onChange={(e) => setTheme(e.target.value)}
              className="text-blue-600"
            />
            <span className="ml-2">{t('settings.theme.dark')}</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        {t('settings.save')}
      </button>
    </div>
  );
}

export default Setting;
