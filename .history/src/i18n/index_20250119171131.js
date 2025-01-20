import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import viTranslation from "./locales/vi/translation.json";

// Lấy ngôn ngữ từ localStorage hoặc mặc định là 'vi'
const savedLanguage = localStorage.getItem("language");
const defaultLanguage = savedLanguage || "vi";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      vi: {
        translation: viTranslation
      }
    },
    lng: defaultLanguage,
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
