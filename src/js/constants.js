import { SOURCES, TYPES as _TYPES } from '@sttm/banidb';

export { SOURCES };

export const SEARCH_TYPES = {
  FIRST_LETTERS: 0,
  FIRST_LETTERS_ANYWHERE: 1,
  GURMUKHI_WORD: 2,
  ENGLISH_WORD: 3,
  ROMANIZED: 4,
  ANG: 5,
};

export const TYPES = [..._TYPES, 'Ang'];

export const SHORT_DOMAIN = 'sttm.co';

export const LOCAL_STORAGE_KEY_FOR_SEARCH_SOURCE = 'searchSource';
export const LOCAL_STORAGE_KEY_FOR_SEARCH_TYPE = 'searchType';
export const LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES =
  'translationLanguages';
export const LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES =
  'transliterationLanguages';
export const LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST = 'larivaarAssist';
export const LOCAL_STORAGE_KEY_FOR_LARIVAAR = 'larivaar';
export const LOCAL_STORAGE_KEY_FOR_UNICODE = 'unicode';
export const LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW = 'splitView';
export const LOCAL_STORAGE_KEY_FOR_FONT_SIZE = 'fontSize';
export const LOCAL_STORAGE_KEY_FOR_DARK_MODE = 'darkMode';
export const LOCAL_STORAGE_KEY_FOR_PREVIOUSLY_READ_ANG = 'previouslyReadAng';

export const PLACEHOLDERS = {
  [SEARCH_TYPES.FIRST_LETTERS]: ['jmTAq'], // first letters
  [SEARCH_TYPES.FIRST_LETTERS_ANYWHERE]: ['mqjbe'], // first letter anywhere
  [SEARCH_TYPES.GURMUKHI_WORD]: ['jo mwgih Twkur Apuny qy'], // gurmukhi
  [SEARCH_TYPES.ENGLISH_WORD]: ['He has extended His power', true], // translation
  [SEARCH_TYPES.ROMANIZED]: ['jo mange thakur apne te soi', true], // romanized
  [SEARCH_TYPES.ANG]: ['123', true], //ang
};

export const TRANSLATION_LANGUAGES = ['punjabi', 'english', 'spanish'];
export const TRANSLITERATION_LANGUAGES = ['english'];

export const DEFAULT_SEARCH_TYPE = SEARCH_TYPES.FIRST_LETTERS;
export const DEFAULT_SEARCH_SOURCE = 'all';
export const DEFAULT_TRANSLATION_LANGUAGES = ['english'];
export const DEFAULT_TRANSLITERATION_LANGUAGES = ['english'];
export const DEFAULT_LARIVAAR = false;
export const DEFAULT_LARIVAAR_ASSIST = false;
export const DEFAULT_UNICODE = false;
export const DEFAULT_SPLIT_VIEW = false;
export const DEFAULT_FONT_SIZE = 2;
export const DEFAULT_PAGE_TITLE = 'SikhiToTheMax';
export const DEFAULT_DARK_MODE = false;

export const LARIVAAR_ASSIST_COLOR = '#f39c1d';

export const TEXTS = {
  URIS: {
    HOME: 'Home',
    ABOUT: 'About',
    INDEX: 'Index',
    HELP: 'Help',
    TOS: 'Terms of Service',
    SUNDAR_GUTKA: 'Sundar Gutka',
    SUNDAR_GUTKA_BAANI: 'Baani',
  },
  ANDROID: 'Android',
  IOS: 'iOS',
  SEHAJ_PAATH: ang => `Continue reading Ang ${ang}`,
  SUNDAR_GUTKA_HEADER: `Sundar Gutka Baaniyaan`,
  SUNDAR_GUTKA_APP: `Download Sundar Gutka App for improved experience on`,
  SYNC: `Remote Sync`,
  SYNC_DESCRIPTION: `Remote Sync is a feature of SikhiToTheMax desktop application. It allows you to view the shabad and current line displayed via the Desktop Application on your mobile/device. To get started you need to enter the code below, as shared by the desktop application.`,
  SYNC_ERROR: `We aren't able to connect to the entered code. Make sure it's correct or try again later.`,
  SYNC_NOTIFICATION: code => `You're now connected to ${code}. Tap to dismiss.`,
  SYNC_CONNECTED: code =>
    `Awesome! You're now connected to the device "${code}" and will start receiving shabads soon! The screen would automatically update now as shabad and the line changes on the desktop.`,
  SYNC_DISCONNECT: `Are you sure you want to disconnect now? You can re-connect by entering the same code later.`,
  OFFLINE: `It seems you aren't connected to internet`,
  OFFLINE_DESCRIPTION: `Unfortunately we don't support offline mode fully as of now, and you would need to be connected to use SikhiToTheMax.`,
  HELP_SECTION: 'the help section',
  INDEX_SECTION: 'the index page',
  GENERIC_ERROR: `ਵਾਹਿਗੁਰੂ! Something isn't working correctly`,
  GENERIC_ERROR_DESCRIPTION: `This is really unusual. You may want to hit the Feedback button at the bottom of this page, and report this issue to our Sevadaars to fix it before others face it.`,
  TIMEOUT_ERROR: `ਵਾਹਿਗੁਰੂ! Network connection timed out`,
  TIMEOUT_ERROR_DESCRIPTION: `This usually happens when your internet connection is either down or very slow. Try connecting sometime later?`,
  GO_TO_SHABAD: 'Open Shabad',
  HUKAMNAMA: 'Daily Hukamnama from Sri Harmandir Sahib, Amritsar',
  ANG_NOT_FOUND: `Sorry, we couldn't find the requested ang (page).`,
  ANG_NOT_FOUND_DESCRIPTION: (ang, source) =>
    `Ang (page) "${ang}" was not found in "${source}". Make sure ang (page) ${ang} is actually present in the selected source. If you still cannot find your shabad, head over to `,
  NO_RESULTS_FOUND: `Sorry, we couldn't find results for your query`,
  NO_RESULTS_FOUND_DESCRIPTION: (source, type) =>
    `Are you sure you want to search in "${source}" with search type of "${type}"? If not, try changing your search settings from above. If you still cannot find your shabad, head over to `,
  GURBAANI_COPIED: 'Gurbaani has been copied to your clipboard!',
  EMBED_COPIED:
    'Embedding code has been copied. Paste it in a rich editor usually found in forums',
  EMBED_FAILURE: "Sorry, we couldn't copy embed code",
  LINK_COPIED: 'Link has been copied to your clipboard!',
  COPY_FAILURE: "Sorry, we couldn't copy the link. Try copying it manually.",
  OPEN_PAGE: 'Open Page',
  PREVIOUS_PAGE: 'Previous Page',
  NEXT_PAGE: 'Next Page',
  PAGE_NOT_FOUND_MESSAGE: 'These are not the Singhs you are looking for.',
  URL_NOT_FOUND: url =>
    `The requested URL "${url}" was not found on this server.`,
  EMPTY_QUERY: `Oh no! You can't just search for nothing.`,
  EMPTY_QUERY_DESCRIPTION:
    'Please enter your query in the search bar above to give us a chance to serve you.',
  REDIRECTING: 'Redirecting you to',
  REDIRECTING_DESCRIPTION: 'If your browser does not redirect, you may visit',
  RESET: 'Reset',
  SPLIT_VIEW: 'Split View',
  UNICODE: 'Unicode',
  ASSIST: 'Assist',
  FONT: 'Font',
  DISPLAY: 'Display',
  LARIVAAR: 'Larivaar',
  TRANSLATION: 'Translation',
  TRANSLITERATION: 'Transliteration',
  FONT_SIZE: 'Font Size',
  DARK_MODE: 'Dark Mode',
};

export const SHABAD_CONTENT_CLASSNAME = 'shabad-content';
