// i18n.js
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../translations/en.json';
import chTranslation from '../translations/ch.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  ch: {
    translation: chTranslation,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
