import { createStore } from 'redux';
import reducer from '../reducers';
import {
  LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR,
  LOCAL_STORAGE_KEY_FOR_UNICODE,
  LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW,
  LOCAL_STORAGE_KEY_FOR_FONT_SIZE,
  DEFAULT_TRANSLATION_LANGUAGES,
  DEFAULT_TRANSLITERATION_LANGUAGES,
  DEFAULT_LARIVAAR_ASSIST,
  DEFAULT_LARIVAAR,
  DEFAULT_UNICODE,
  DEFAULT_SPLIT_VIEW,
  DEFAULT_FONT_SIZE,
} from '../../constants';
import {
  getArrayFromLocalStorage,
  getBooleanFromLocalStorage,
  getNumberFromLocalStorage,
} from '../../util';

const initialState = {
  showDisplayOptions: false,
  showFontOptions: false,
  showTransliterationOptions: false,
  showTranslationOptions: false,
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
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
