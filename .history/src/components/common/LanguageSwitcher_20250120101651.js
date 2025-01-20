import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/useLanguage";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    changeLanguage(lang);
  };

  return (
    <select
      value={currentLanguage}
      onChange={handleLanguageChange}
      className="bg-transparent text-sm focus:outline-none"
    >
      <option value="vi">Tiếng Việt</option>
      <option value="en">English</option>
    </select>
  );
} 