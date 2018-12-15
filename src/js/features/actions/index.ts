import {
  DEFAULT_TRANSLATION_LANGUAGES,
  DEFAULT_TRANSLITERATION_LANGUAGES,
  DEFAULT_DARK_MODE,
  DEFAULT_UNICODE,
  DEFAULT_FONT_SIZE,
} from '@/constants';
import { Dispatch } from 'redux';
import { createAction } from '../util';
import { Actions } from './types';

export const setOnlineMode = createAction<Actions, boolean>(
  Actions.SET_ONLINE_MODE
);

export const toggleDisplayOptions = createAction<Actions>(
  Actions.TOGGLE_DISPLAY_OPTIONS
);

export const toggleFontOptions = createAction<Actions>(
  Actions.TOGGLE_FONT_OPTIONS
);

export const toggleDarkMode = createAction<Actions>(Actions.TOGGLE_DARK_MODE);

export const toggleTranslationOptions = createAction<Actions>(
  Actions.TOGGLE_TRANSLATION_OPTIONS
);

export const toggleTransliterationOptions = createAction<Actions>(
  Actions.TOGGLE_TRANSLITERATION_OPTIONS
);

export const toggleLarivaarOption = createAction<Actions>(
  Actions.TOGGLE_LARIVAAR_OPTION
);

export const toggleLarivaarAssistOption = createAction<Actions>(
  Actions.TOGGLE_LARIVAAR_ASSIST_OPTION
);

export const toggleUnicodeOption = createAction<Actions>(
  Actions.TOGGLE_UNICODE_OPTION
);

export const toggleParagraphViewOption = createAction<Actions>(
  Actions.TOGGLE_PARAGRAPH_VIEW_OPTION
);

export const toggleSplitViewOption = createAction<Actions>(
  Actions.TOGGLE_SPLIT_VIEW_OPTION
);

export const setUnicode = createAction<Actions, boolean>(Actions.SET_UNICODE);

const fontSizeMeta = {
  debounce: {
    time: 300,
  },
};

export const setFontSize = createAction<Actions, typeof fontSizeMeta, number>(
  Actions.SET_FONT_SIZE,
  fontSizeMeta
);

export const setTranslationLanguages = createAction<Actions, string[]>(
  Actions.SET_TRANSLATION_LANGUAGES
);

export const setTransliterationLanguages = createAction<Actions, string[]>(
  Actions.SET_TRANSLITERATION_LANGUAGES
);

export const setDarkMode = createAction<Actions, boolean>(
  Actions.SET_DARK_MODE
);

export const resetDisplayOptions = () => (dispatch: Dispatch) => {
  dispatch(setTransliterationLanguages(DEFAULT_TRANSLITERATION_LANGUAGES));
  dispatch(setTranslationLanguages(DEFAULT_TRANSLATION_LANGUAGES));
  dispatch(setDarkMode(DEFAULT_DARK_MODE));
};

export const resetFontOptions = () => (dispatch: Dispatch) => {
  dispatch(setUnicode(DEFAULT_UNICODE));
  dispatch(setFontSize(DEFAULT_FONT_SIZE));
};
