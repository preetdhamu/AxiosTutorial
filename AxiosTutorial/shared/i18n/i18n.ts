import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from "react-native-localize";

import en from "../locales/en.json";
import es from "../locales/es.json";
import hi from "../locales/hi.json";



export const resources = {
    en: { translation: en },
    es: { translation: es },
    hi: { translation: hi },
}

export const SUPPORTED_LANGS = [ "en" ,"es" , "hi"] as const ;
export type LangCode = typeof SUPPORTED_LANGS[number];
const fallback : LangCode = "en";


export function getDeviceLang() : string {
    const locales = RNLocalize.getLocales();
    if (!locales || locales.length === 0) return fallback;
    const code = locales[0].languageCode;
    return SUPPORTED_LANGS.includes(code as LangCode) ? code : fallback;
}



// i18n.use(initReactI18next).init({
//     resources,
//     lng: getDeviceLang(),
//     fallbackLng: fallback,
//     interpolation: {
//         escapeValue: false,
//     },
// })


export function initI18N(lang: string) {
  return i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: fallback,
    interpolation: { escapeValue: false },
  });
}


export default i18n;