import { compose, createStore, applyMiddleware } from 'redux';
import createDebounce from 'redux-debounced';
import reducer from '../reducers';
import {
  LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR,
  LOCAL_STORAGE_KEY_FOR_UNICODE,
  LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW,
  LOCAL_STORAGE_KEY_FOR_FONT_SIZE,
  LOCAL_STORAGE_KEY_FOR_DARK_MODE,
  DEFAULT_TRANSLATION_LANGUAGES,
  DEFAULT_TRANSLITERATION_LANGUAGES,
  DEFAULT_LARIVAAR_ASSIST,
  DEFAULT_LARIVAAR,
  DEFAULT_UNICODE,
  DEFAULT_SPLIT_VIEW,
  DEFAULT_FONT_SIZE,
  DEFAULT_DARK_MODE,
} from '../../constants';
import {
  getArrayFromLocalStorage,
  getBooleanFromLocalStorage,
  getNumberFromLocalStorage,
} from '../../util';
import thunk from 'redux-thunk';

const initialState = {
  online: window !== undefined ? window.navigator.onLine : true,
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
  darkMode: getBooleanFromLocalStorage(
    LOCAL_STORAGE_KEY_FOR_DARK_MODE,
    DEFAULT_DARK_MODE
  ),
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(createDebounce(), thunk));
const store = createStore(reducer, initialState, enhancer);

export default store;
