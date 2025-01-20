import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./i18n/locales/en/translation.json";
import viTranslation from "./i18n/locales/vi/translation.json";

// Lấy ngôn ngữ đã lưu hoặc ngôn ngữ trình duyệt
const savedLang = localStorage.getItem("language");
const browserLang = navigator.language.split("-")[0];
const defaultLang = savedLang || (browserLang === "vi" ? "vi" : "en");

i18n
  .use(LanguageDetector)
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
    lng: defaultLang, // sử dụng ngôn ngữ đã lưu hoặc mặc định
    fallbackLng: "en", // ngôn ngữ dự phòng nếu thiếu translation

    // Thêm các cấu hình quan trọng
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
