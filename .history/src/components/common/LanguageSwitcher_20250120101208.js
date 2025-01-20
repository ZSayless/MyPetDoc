import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { changeLanguage } = useAuth();

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    changeLanguage(lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleLanguageChange}
      className="bg-transparent text-sm focus:outline-none"
    >
      <option value="vi">Tiếng Việt</option>
      <option value="en">English</option>
    </select>
  );
} 