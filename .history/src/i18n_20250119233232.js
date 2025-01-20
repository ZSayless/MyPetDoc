import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import viTranslation from "./locales/vi.json";

// Lấy ngôn ngữ đã lưu hoặc ngôn ngữ trình duyệt
const savedLang = localStorage.getItem("language");
const browserLang = navigator.language.split('-')[0];
const defaultLang = savedLang || (browserLang === 'vi' ? 'vi' : 'en');

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
    lng: defaultLang, // sử dụng ngôn ngữ đã lưu hoặc mặc định
    fallbackLng: "en", // ngôn ngữ dự phòng nếu thiếu translation
    
    // Thêm các cấu hình quan trọng
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 