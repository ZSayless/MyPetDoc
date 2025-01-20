import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { changeLanguage } = useAuth();

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  };

  // ... rest of the component
} 