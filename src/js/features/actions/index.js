import {
  DEFAULT_TRANSLATION_LANGUAGES,
  DEFAULT_TRANSLITERATION_LANGUAGES,
  DEFAULT_DARK_MODE,
  DEFAULT_UNICODE,
  DEFAULT_FONT_SIZE,
} from '../../constants';

export const createAction = (type, meta) => payload => ({
  type,
  meta,
  payload,
});

export const SET_ONLINE_MODE = 'SET_ONLINE_MODE';
export const setOnlineMode = createAction(SET_ONLINE_MODE);

export const TOGGLE_DISPLAY_OPTIONS = 'TOGGLE_DISPLAY_OPTIONS';
export const toggleDisplayOptions = createAction(TOGGLE_DISPLAY_OPTIONS);

export const TOGGLE_FONT_OPTIONS = 'TOGGLE_FONT_OPTIONS';
export const toggleFontOptions = createAction(TOGGLE_FONT_OPTIONS);

export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const toggleDarkMode = createAction(TOGGLE_DARK_MODE);

export const TOGGLE_TRANSLATION_OPTIONS = 'TOGGLE_TRANSLATION_OPTIONS';
export const toggleTranslationOptions = createAction(
  TOGGLE_TRANSLATION_OPTIONS
);

export const TOGGLE_TRANSLITERATION_OPTIONS = 'TOGGLE_TRANSLITERATION_OPTIONS';
export const toggleTransliterationOptions = createAction(
  TOGGLE_TRANSLITERATION_OPTIONS
);

export const TOGGLE_LARIVAAR_OPTION = 'TOGGLE_LARIVAAR_OPTION';
export const toggleLarivaarOption = createAction(TOGGLE_LARIVAAR_OPTION);

export const TOGGLE_LARIVAAR_ASSIST_OPTION = 'TOGGLE_LARIVAAR_ASSIST_OPTION';
export const toggleLarivaarAssistOption = createAction(
  TOGGLE_LARIVAAR_ASSIST_OPTION
);

export const TOGGLE_UNICODE_OPTION = 'TOGGLE_UNICODE_OPTION';
export const toggleUnicodeOption = createAction(TOGGLE_UNICODE_OPTION);

export const TOGGLE_SPLIT_VIEW_OPTION = 'TOGGLE_SPLIT_VIEW_OPTION';
export const toggleSplitViewOption = createAction(TOGGLE_SPLIT_VIEW_OPTION);

export const SET_UNICODE = 'SET_UNICODE';
export const setUnicode = createAction(SET_UNICODE);

export const SET_FONT_SIZE = 'SET_FONT_SIZE';
export const setFontSize = createAction(SET_FONT_SIZE, {
  debounce: {
    time: 300,
  },
});

export const SET_TRANSLATION_LANGUAGES = 'SET_TRANSLATION_LANGUAGES';
export const setTranslationLanguages = createAction(SET_TRANSLATION_LANGUAGES);

export const SET_TRANSLITERATION_LANGUAGES = 'SET_TRANSLITERATION_LANGUAGES';
export const setTransliterationLanguages = createAction(
  SET_TRANSLITERATION_LANGUAGES
);

export const SET_DARK_MODE = 'SET_DARK_MODE';
export const setDarkMode = createAction(SET_DARK_MODE);

export const resetDisplayOptions = () => dispatch => {
  dispatch(setTransliterationLanguages(DEFAULT_TRANSLITERATION_LANGUAGES));
  dispatch(setTranslationLanguages(DEFAULT_TRANSLATION_LANGUAGES));
  dispatch(setDarkMode(DEFAULT_DARK_MODE));
}

export const resetFontOptions = () => dispatch => {
  dispatch(setUnicode(DEFAULT_UNICODE));
  dispatch(setFontSize(DEFAULT_FONT_SIZE));
}
