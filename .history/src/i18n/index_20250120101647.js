import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import viTranslation from "./locales/vi/translation.json";

// Lấy ngôn ngữ từ localStorage nếu có
const savedLanguage = localStorage.getItem("language");

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      vi: {
        translation: viTranslation,
      },
    },
    lng: savedLanguage || "vi", // Chỉ dùng 'vi' khi không có savedLanguage
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "language",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
