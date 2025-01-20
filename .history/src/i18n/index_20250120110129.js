import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import viTranslation from "./locales/vi/translation.json";

// Lấy ngôn ngữ đã lưu từ localStorage hoặc dùng 'vi' làm mặc định
const savedLanguage = localStorage.getItem("i18nextLng") || "vi";

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
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
