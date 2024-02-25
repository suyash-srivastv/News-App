import i18n from 'i18n-js';
import { Scope } from './types';
import * as en from './en.json';
import * as ja from './ja.json';
import I18n from 'i18n-js';
const availableTranslations = {
  ja,
  en,
};

/* This function is useful to load spanish or english language translations and set the corresponding locale */
export const ChangeLanguage = languageCode => {
  I18n.translations = {
    [languageCode]: availableTranslations[languageCode],
  };
  I18n.locale = languageCode;
};
/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: Scope, options?: i18n.TranslateOptions) {
  return key ? i18n.t(key, options) : null;
}
