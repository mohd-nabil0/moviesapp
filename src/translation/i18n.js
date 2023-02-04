import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import ar from './ar.json';

i18n.use(initReactI18next).init({
  lng: 'ar',
  fallbackLng: 'ar',
  compatibilityJSON: 'v3',
  resources: {
    en: en,
    ar: ar,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
