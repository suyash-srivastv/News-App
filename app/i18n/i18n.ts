import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

import * as en from './en.json';
import * as ja from './ja.json';

i18n.fallbacks = true;
i18n.translations = { ja, en };

const fallback = { languageTag: 'en', isRTL: false };

const { languageTag } =
  RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) ||
  fallback;
i18n.locale = languageTag;
