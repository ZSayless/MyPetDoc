import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <header>
      {/* ... existing code ... */}
      <nav>
        <Link to="/">{t('common.home')}</Link>
        <Link to="/about">{t('common.about')}</Link>
        <Link to="/contact">{t('common.contact')}</Link>
        <Link to="/blog">{t('common.blog')}</Link>
      </nav>
      <LanguageSwitcher />
    </header>
  );
}; 