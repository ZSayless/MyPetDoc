import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

export default function LanguageSwitcher() {
  const { currentLang, changeLang } = useAuth();

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    changeLang(lang);
  };

  return (
    <select
      value={currentLang}
      onChange={handleLanguageChange}
      className="bg-transparent text-sm focus:outline-none"
    >
      <option value="vi">Tiếng Việt</option>
      <option value="en">English</option>
    </select>
  );
} 