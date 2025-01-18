import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import settingEN from './locales/en/setting.json';
import settingVI from './locales/vi/setting.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        setting: settingEN
      },
      vi: {
        setting: settingVI
      }
    },
    lng: 'en', // ngôn ngữ mặc định
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 