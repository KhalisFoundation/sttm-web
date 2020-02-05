import {
  DEFAULT_TRANSLATION_LANGUAGES,
  DEFAULT_TRANSLITERATION_LANGUAGES,
  DEFAULT_DARK_MODE,
  DEFAULT_VISRAAMS,
  DEFAULT_VISRAAM_SOURCE,
  DEFAULT_VISRAAM_STYLE,
  DEFAULT_UNICODE,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_CENTER_ALIGN_GURBANI,
  DEFAULT_SPLIT_VIEW,
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

export const TOGGLE_VISRAAMS = 'TOGGLE_VISRAAMS';
export const toggleVisraams = createAction(TOGGLE_VISRAAMS);

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

export const TOGGLE_SPLIT_VIEW_OPTION = 'TOGGLE_SPLIT_VIEW_OPTION';
export const toggleSplitViewOption = createAction(TOGGLE_SPLIT_VIEW_OPTION);

export const SET_VISRAAM_SOURCE = 'SET_VISRAAM_SOURCE';
export const setVisraamSource = createAction(SET_VISRAAM_SOURCE);

export const SET_VISRAAM_STYLE = 'SET_VISRAAM_STYLE';
export const setVisraamStyle = createAction(SET_VISRAAM_STYLE);

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

export const SET_VISRAAMS = 'SET_VISRAAMS';
export const setVisraams = createAction(SET_VISRAAMS);

export const SET_SPLIT_VIEW = 'SET_SPLIT_VIEW';
export const setSplitView = createAction(SET_SPLIT_VIEW);

export const resetDisplayOptions = () => dispatch => {
  dispatch(setTransliterationLanguages(DEFAULT_TRANSLITERATION_LANGUAGES));
  dispatch(setTranslationLanguages(DEFAULT_TRANSLATION_LANGUAGES));
  dispatch(setDarkMode(DEFAULT_DARK_MODE));
  dispatch(setVisraams(DEFAULT_VISRAAMS));
  dispatch(setVisraamSource(DEFAULT_VISRAAM_SOURCE));
  dispatch(setVisraamStyle(DEFAULT_VISRAAM_STYLE));
  dispatch(setCenterAlignOption(DEFAULT_CENTER_ALIGN_GURBANI));
  dispatch(setSplitView(DEFAULT_SPLIT_VIEW));
};

export const CHANGE_FONT = 'CHANGE_FONT';
export const changeFont = createAction(CHANGE_FONT);

export const resetFontOptions = () => dispatch => {
  dispatch(setUnicode(DEFAULT_UNICODE));
  dispatch(setFontSize(DEFAULT_FONT_SIZE));
  dispatch(changeFont(DEFAULT_FONT_FAMILY));
};

export const SET_CENTER_ALIGN_OPTION = 'SET_CENTER_ALIGN_OPTION';
export const setCenterAlignOption = createAction(SET_CENTER_ALIGN_OPTION);

export const toggleCenterAlignOption = () => (dispatch, getState) => {
  const state = getState();
  dispatch(setCenterAlignOption(!state.centerAlignGurbani));
};
