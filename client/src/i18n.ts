import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locals/en.json";
import tr from "./locals/tr.json";

const options = {
  load: "languageOnly",
  defaultLanguage: "en",
  otherLanguages: ["tr"],
  debug: false,
  resources: {
    tr: {
      translation: tr,
    },
    en: {
      translation: en,
    },
  },
  fallbackLng: ["en"],
  order: ["localStorage", "cookie"],
  cache: ["cookie"],
  // ns: ["common"],

  // defaultNS: "common",
  // interpolation: {
  // 	escapeValue: false
  // },
  react: {
    wait: false,
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default",
  },
};

i18n.use(initReactI18next).init(options as any);
export default i18n;
