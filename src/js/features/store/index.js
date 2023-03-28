import { compose, createStore, applyMiddleware } from 'redux';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import {
  LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_STEEK_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST_STRENGTH,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR,
  LOCAL_STORAGE_KEY_FOR_UNICODE,
  LOCAL_STORAGE_KEY_FOR_AUTO_SCROLL_MODE,
  LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW,
  LOCAL_STORAGE_KEY_FOR_FONT_SIZE,
  LOCAL_STORAGE_KEY_FOR_TRANSLATION_FONT_SIZE,
  LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_FONT_SIZE,
  LOCAL_STORAGE_KEY_FOR_LINE_HEIGHT,
  LOCAL_STORAGE_KEY_FOR_FONT_FAMILY,
  LOCAL_STORAGE_KEY_FOR_DARK_MODE,
  LOCAL_STORAGE_KEY_FOR_PARAGRAPH_MODE,
  LOCAL_STORAGE_KEY_FOR_SEHAJ_PAATH_MODE,
  LOCAL_STORAGE_KEY_FOR_VISRAAMS,
  LOCAL_STORAGE_KEY_FOR_CENTER_ALIGN_VIEW,
  LOCAL_STORAGE_KEY_FOR_VISRAAM_SOURCE,
  LOCAL_STORAGE_KEY_FOR_VISRAAMS_STYLE,
  LOCAL_STORAGE_KEY_FOR_SG_BAANI_LENGTH,
  LOCAL_STORAGE_KEY_FOR_MULTIPLE_SHABADS,
  LOCAL_STORAGE_KEY_FOR_CARTOONIFIED_PAGES,
  LOCAL_STORAGE_KEY_FOR_SHABAD_AUDIO_PLAYER,
  DEFAULT_TRANSLATION_LANGUAGES,
  DEFAULT_TRANSLITERATION_LANGUAGES,
  DEFAULT_STEEK_LANGUAGES,
  DEFAULT_LARIVAAR_ASSIST,
  DEFAULT_LARIVAAR_ASSIST_STRENGTH,
  DEFAULT_LARIVAAR,
  DEFAULT_UNICODE,
  DEFAULT_SPLIT_VIEW,
  DEFAULT_FONT_SIZE,
  DEFAULT_TRANSLATION_FONT_SIZE,
  DEFAULT_TRANSLITERATION_FONT_SIZE,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_FONT_FAMILY,
  DEFAULT_DARK_MODE,
  DEFAULT_AUTO_SCROLL_MODE,
  DEFAULT_PARAGRAPH_MODE,
  DEFAULT_SEHAJ_PAATH_MODE,
  DEFAULT_VISRAAMS,
  DEFAULT_CENTER_ALIGN_GURBANI,
  DEFAULT_VISRAAM_SOURCE,
  DEFAULT_VISRAAM_STYLE,
  DEFAULT_SG_BAANI_LENGTH,
  LOCAL_STORAGE_KEY_FOR_ENGLISH_TRANSLATION_LANGUAGES,
  DEFAULT_ENGLISH_TRANSLATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_HINDI_TRANSLATION_LANGUAGES,
  DEFAULT_HINDI_TRANSLATION_LANGUAGES,
  DEFAULT_CARTOONIFIED_PAGES,
  DEFAULT_SHABAD_AUDIO_PLAYER
} from '../../constants';
import {
  getArrayFromLocalStorage,
  getBooleanFromLocalStorage,
  getNumberFromLocalStorage,
  getStringFromLocalStorage,
} from '../../util';

export const initialState = {
  online: window !== undefined ? window.navigator.onLine : true,
  showAdvancedOptions: false,
  showTransliterationOptions: false,
  showTranslationOptions: false,
  fullScreenMode: false,
  translationLanguages: getArrayFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
    DEFAULT_TRANSLATION_LANGUAGES
  ),
  transliterationLanguages: getArrayFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES,
    DEFAULT_TRANSLITERATION_LANGUAGES
  ),
  larivaarAssist: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST,
    DEFAULT_LARIVAAR_ASSIST
  ),
  larivaarAssistStrength: getNumberFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST_STRENGTH,
    DEFAULT_LARIVAAR_ASSIST_STRENGTH
  ),
  larivaar: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_LARIVAAR,
    DEFAULT_LARIVAAR
  ),
  unicode: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_UNICODE,
    DEFAULT_UNICODE
  ),
  splitView: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW,
    DEFAULT_SPLIT_VIEW
  ),
  fontSize: getNumberFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_FONT_SIZE,
    DEFAULT_FONT_SIZE
  ),
  translationFontSize: getNumberFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_TRANSLATION_FONT_SIZE,
    DEFAULT_TRANSLATION_FONT_SIZE
  ),
  transliterationFontSize: getNumberFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_FONT_SIZE,
    DEFAULT_TRANSLITERATION_FONT_SIZE
  ),
  lineHeight: getNumberFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_LINE_HEIGHT,
    DEFAULT_LINE_HEIGHT
  ),
  fontFamily: getStringFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_FONT_FAMILY,
    DEFAULT_FONT_FAMILY
  ),
  paragraphMode: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_PARAGRAPH_MODE,
    DEFAULT_PARAGRAPH_MODE
  ),
  darkMode: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_DARK_MODE,
    DEFAULT_DARK_MODE
  ),
  autoScrollMode: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_AUTO_SCROLL_MODE,
    DEFAULT_AUTO_SCROLL_MODE
  ),
  visraams: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_VISRAAMS,
    DEFAULT_VISRAAMS
  ),
  visraamSource: getStringFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_VISRAAM_SOURCE,
    DEFAULT_VISRAAM_SOURCE
  ),
  visraamStyle: getStringFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_VISRAAMS_STYLE,
    DEFAULT_VISRAAM_STYLE
  ),
  centerAlignGurbani: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_CENTER_ALIGN_VIEW,
    DEFAULT_CENTER_ALIGN_GURBANI
  ),
  sehajPaathMode: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_SEHAJ_PAATH_MODE,
    DEFAULT_SEHAJ_PAATH_MODE
  ),
  hindiTranslationLanguages: getArrayFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_HINDI_TRANSLATION_LANGUAGES,
    DEFAULT_HINDI_TRANSLATION_LANGUAGES
  ),
  englishTranslationLanguages: getArrayFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_ENGLISH_TRANSLATION_LANGUAGES,
    DEFAULT_ENGLISH_TRANSLATION_LANGUAGES
  ),
  steekLanguages: getArrayFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_STEEK_LANGUAGES,
    DEFAULT_STEEK_LANGUAGES
  ),
  sgBaaniLength: getStringFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_SG_BAANI_LENGTH,
    DEFAULT_SG_BAANI_LENGTH
  ),
  isLoadingAng: false,
  isMahankoshTooltipActive: false,
  isMahankoshTooltipExplaination: false,
  prefetchAng: undefined,
  showSettingsPanel: false,
  showKeyboardShortcutsPanel: false,
  multipleShabads: getArrayFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_MULTIPLE_SHABADS,
    []
  ),
  showMultiViewPanel: false,
  showPinSettings: false,
  isModalOpen: false,
  gurbaniVerses: [],
  showCartoonifiedPages: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_CARTOONIFIED_PAGES,
    DEFAULT_CARTOONIFIED_PAGES
  ),
  showShabadAudioPlayer: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_SHABAD_AUDIO_PLAYER,
    DEFAULT_SHABAD_AUDIO_PLAYER
  )
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(createDebounce(), thunk));
const store = createStore(reducer, initialState, enhancer);

export default store;
