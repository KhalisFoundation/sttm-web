import {
  DEFAULT_LARIVAAR_ASSIST_STRENGTH,
  DEFAULT_TRANSLATION_LANGUAGES,
  DEFAULT_TRANSLATION_FONT_SIZE,
  DEFAULT_STEEK_LANGUAGES,
  DEFAULT_TRANSLITERATION_LANGUAGES,
  DEFAULT_TRANSLITERATION_FONT_SIZE,
  DEFAULT_FONT_SIZE,
  DEFAULT_DARK_MODE,
  DEFAULT_AUTO_SCROLL_MODE,
  DEFAULT_IS_AUTOSCROLLING,
  DEFAULT_PARAGRAPH_MODE,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_VISRAAMS,
  DEFAULT_VISRAAM_SOURCE,
  DEFAULT_VISRAAM_STYLE,
  DEFAULT_UNICODE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_CENTER_ALIGN_GURBANI,
  DEFAULT_SPLIT_VIEW,
  DEFAULT_SEHAJ_PAATH_MODE,
  DEFAULT_SG_BAANI_LENGTH
} from '../../constants';

export const createAction = (type, meta) => payload => ({
  type,
  meta,
  payload,
});

export const SET_ONLINE_MODE = 'SET_ONLINE_MODE';
export const setOnlineMode = createAction(SET_ONLINE_MODE);

export const TOGGLE_ADVANCED_OPTIONS = 'TOGGLE_ADVANCED_OPTIONS';
export const toggleAdvancedOptions = createAction(TOGGLE_ADVANCED_OPTIONS);

export const TOGGLE_SETTINGS_PANEL = 'TOGGLE_SETTINGS_PANEL';
export const toggleSettingsPanel = createAction(TOGGLE_SETTINGS_PANEL);

export const SET_SETTINGS_PANEL = 'SET_SETTINGS_PANEL';
export const setSettingsPanel = createAction(SET_SETTINGS_PANEL);

export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const toggleDarkMode = createAction(TOGGLE_DARK_MODE);

export const TOGGLE_VISRAAMS = 'TOGGLE_VISRAAMS';
export const toggleVisraams = createAction(TOGGLE_VISRAAMS);

export const TOGGLE_AUTO_SCROLL_MODE = 'TOGGLE_AUTO_SCROLL_MODE';

export const toggleAutoScrollMode = createAction(TOGGLE_AUTO_SCROLL_MODE);

export const TOGGLE_TRANSLATION_OPTIONS = 'TOGGLE_TRANSLATION_OPTIONS';
export const toggleTranslationOptions = createAction(
  TOGGLE_TRANSLATION_OPTIONS
);

export const TOGGLE_PARAGRAPH_MODE = 'TOGGLE_PARAGRAPH_MODE';
export const toggleParagraphMode = createAction(
  TOGGLE_PARAGRAPH_MODE
)

export const TOGGLE_SEHAJ_PAATH_MODE = 'TOGGLE_SEHAJ_PAATH_MODE';
export const toggleSehajPaathMode = createAction(
  TOGGLE_SEHAJ_PAATH_MODE
)

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

export const SET_AUTOSCROLLING = 'SET_AUTOSCROLLING';
export const setAutoScrolling = createAction(SET_AUTOSCROLLING);

export const SET_VISRAAM_SOURCE = 'SET_VISRAAM_SOURCE';
export const setVisraamSource = createAction(SET_VISRAAM_SOURCE);

export const SET_VISRAAM_STYLE = 'SET_VISRAAM_STYLE';
export const setVisraamStyle = createAction(SET_VISRAAM_STYLE);

export const SET_UNICODE = 'SET_UNICODE';
export const setUnicode = createAction(SET_UNICODE);

export const SET_FULLSCREEN_MODE = 'SET_FULLSCREEN_MODE';
export const setFullScreenMode = createAction(SET_FULLSCREEN_MODE);

export const SET_FONT_SIZE = 'SET_FONT_SIZE';
export const setFontSize = createAction(SET_FONT_SIZE);

export const SET_TRANSLATION_FONT_SIZE = 'SET_TRANSLATION_FONT_SIZE';
export const setTranslationFontSize = createAction(SET_TRANSLATION_FONT_SIZE);

export const SET_TRANSLITERATION_FONT_SIZE = 'SET_TRANSLITERATION_FONT_SIZE';
export const setTransliterationFontSize = createAction(SET_TRANSLITERATION_FONT_SIZE);

export const SET_STEEK_LANGUAGES = 'SET_STEEK_LANGUAGES';
export const setSteekLanguages = createAction(SET_STEEK_LANGUAGES);

export const SET_LARIVAAR_ASSIST_STRENGTH = 'SET_LARIVAAR_ASSIST_STRENGTH';
export const setLarivaarAssistStrength = createAction(SET_LARIVAAR_ASSIST_STRENGTH);

export const SET_LINE_HEIGHT = 'SET_LINE_HEIGHT';
export const setLineHeight = createAction(SET_LINE_HEIGHT);

export const SET_PARAGRAPH_MODE = 'SET_PARAGRAPH_MODE';
export const setParagraphMode = createAction(SET_PARAGRAPH_MODE);

export const SET_SEHAJ_PAATH_MODE = 'SET_SEHAJ_PAATH_MODE';
export const setSehajPaathMode = createAction(SET_SEHAJ_PAATH_MODE);

export const SET_TRANSLATION_LANGUAGES = 'SET_TRANSLATION_LANGUAGES';
export const setTranslationLanguages = createAction(SET_TRANSLATION_LANGUAGES);

export const SET_TRANSLITERATION_LANGUAGES = 'SET_TRANSLITERATION_LANGUAGES';
export const setTransliterationLanguages = createAction(
  SET_TRANSLITERATION_LANGUAGES
);
export const SET_DARK_MODE = 'SET_DARK_MODE';
export const setDarkMode = createAction(SET_DARK_MODE);

export const SET_AUTO_SCROLL_MODE = 'SET_AUTO_SCROLL_MODE';
export const setAutoScrollMode = createAction(SET_AUTO_SCROLL_MODE);

export const SET_VISRAAMS = 'SET_VISRAAMS';
export const setVisraams = createAction(SET_VISRAAMS);

export const SET_SPLIT_VIEW = 'SET_SPLIT_VIEW';
export const setSplitView = createAction(SET_SPLIT_VIEW);

export const SET_SG_BAANI_LENGTH = 'SET_SG_BAANI_LENGTH';
export const setSgBaaniLength = createAction(SET_SG_BAANI_LENGTH);

export const SET_PREFETCH_ANG = 'SET_PREFETCH_ANG';
export const SET_LOADING_ANG = 'SET_LOADING_ANG';
export const SET_MAHANKOSH_TOOLTIP_ACTIVE = 'SET_MAHANKOSH_TOOLTIP_ACTIVE';
export const SET_MAHANKOSH_TOOLTIP_EXPLAINATION = 'SET_MAHANKOSH_TOOTIP_EXPLAINATION';

export const SET_ERROR = 'SET_ERROR';

export const resetDisplayOptions = () => dispatch => {
  dispatch(setTransliterationLanguages(DEFAULT_TRANSLITERATION_LANGUAGES));
  dispatch(setTranslationLanguages(DEFAULT_TRANSLATION_LANGUAGES));
  dispatch(setSteekLanguages(DEFAULT_STEEK_LANGUAGES));
  dispatch(setDarkMode(DEFAULT_DARK_MODE));
  dispatch(setAutoScrollMode(DEFAULT_AUTO_SCROLL_MODE));
  dispatch(setAutoScrolling(DEFAULT_IS_AUTOSCROLLING));
  dispatch(setParagraphMode(DEFAULT_PARAGRAPH_MODE))
  dispatch(setVisraams(DEFAULT_VISRAAMS));
  dispatch(setVisraamSource(DEFAULT_VISRAAM_SOURCE));
  dispatch(setVisraamStyle(DEFAULT_VISRAAM_STYLE));
  dispatch(setCenterAlignOption(DEFAULT_CENTER_ALIGN_GURBANI));
  dispatch(setLarivaarAssistStrength(DEFAULT_LARIVAAR_ASSIST_STRENGTH));
  dispatch(setSplitView(DEFAULT_SPLIT_VIEW));
  dispatch(setSehajPaathMode(DEFAULT_SEHAJ_PAATH_MODE));
  dispatch(setSgBaaniLength(DEFAULT_SG_BAANI_LENGTH));
};

export const CHANGE_FONT = 'CHANGE_FONT';
export const changeFont = createAction(CHANGE_FONT);

export const resetFontOptions = () => dispatch => {
  dispatch(setUnicode(DEFAULT_UNICODE));
  dispatch(setFontSize(DEFAULT_FONT_SIZE));
  dispatch(setTranslationFontSize(DEFAULT_TRANSLATION_FONT_SIZE));
  dispatch(setTransliterationFontSize(DEFAULT_TRANSLITERATION_FONT_SIZE));
  dispatch(changeFont(DEFAULT_FONT_FAMILY));
  dispatch(setLineHeight(DEFAULT_LINE_HEIGHT));
};

export const SET_CENTER_ALIGN_OPTION = 'SET_CENTER_ALIGN_OPTION';
export const setCenterAlignOption = createAction(SET_CENTER_ALIGN_OPTION);

export const toggleCenterAlignOption = () => (dispatch, getState) => {
  const state = getState();
  dispatch(setCenterAlignOption(!state.centerAlignGurbani));
};

export const closeSettingsPanel = () => dispatch => {
  dispatch(setSettingsPanel(false))
}
