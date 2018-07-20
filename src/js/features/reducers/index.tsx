import {
  TOGGLE_DISPLAY_OPTIONS,
  TOGGLE_FONT_OPTIONS,
  TOGGLE_TRANSLATION_OPTIONS,
  TOGGLE_TRANSLITERATION_OPTIONS,
  TOGGLE_LARIVAAR_ASSIST_OPTION,
  TOGGLE_LARIVAAR_OPTION,
  TOGGLE_UNICODE_OPTION,
  TOGGLE_DARK_MODE,
  TOGGLE_SPLIT_VIEW_OPTION,
  SET_UNICODE,
  SET_FONT_SIZE,
  SET_TRANSLATION_LANGUAGES,
  SET_TRANSLITERATION_LANGUAGES,
  SET_ONLINE_MODE,
  SET_DARK_MODE,
} from '../actions';
import {
  LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW,
  LOCAL_STORAGE_KEY_FOR_UNICODE,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST,
  LOCAL_STORAGE_KEY_FOR_DARK_MODE,
  LOCAL_STORAGE_KEY_FOR_FONT_SIZE,
  LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES,
} from '@/constants';
import { saveToLocalStorage } from '@/util';
import { clickEvent } from '@/util/analytics';
import { DARK_MODE_COOKIE } from '_@/common/constants';

export default function reducer(state, action) {
  switch (action.type) {
    case SET_ONLINE_MODE: {
      return {
        ...state,
        online: action.payload,
      };
    }
    case TOGGLE_TRANSLITERATION_OPTIONS: {
      const showTransliterationOptions = !state.showTransliterationOptions;
      clickEvent({
        action: TOGGLE_TRANSLITERATION_OPTIONS,
        label: showTransliterationOptions ? 1 : 0,
      });
      return {
        ...state,
        showTransliterationOptions,
      };
    }
    case TOGGLE_TRANSLATION_OPTIONS: {
      const showTranslationOptions = !state.showTranslationOptions;
      clickEvent({
        action: TOGGLE_TRANSLATION_OPTIONS,
        label: showTranslationOptions ? 1 : 0,
      });
      return {
        ...state,
        showTranslationOptions,
      };
    }
    case TOGGLE_DISPLAY_OPTIONS: {
      const showDisplayOptions = !state.showDisplayOptions;
      clickEvent({
        action: TOGGLE_DISPLAY_OPTIONS,
        label: showDisplayOptions ? 1 : 0,
      });
      return {
        ...state,
        showDisplayOptions,
      };
    }
    case TOGGLE_FONT_OPTIONS: {
      const showFontOptions = !state.showFontOptions;
      clickEvent({
        action: TOGGLE_FONT_OPTIONS,
        label: showFontOptions ? 1 : 0,
      });
      return {
        ...state,
        showFontOptions,
      };
    }
    case TOGGLE_DARK_MODE: {
      const darkMode = !state.darkMode;
      clickEvent({
        action: TOGGLE_DARK_MODE,
        label: darkMode ? 1 : 0,
      });

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_DARK_MODE, darkMode);
      document.cookie = `${DARK_MODE_COOKIE}=${darkMode ? 1 : 0};`;
      return {
        ...state,
        darkMode,
      };
    }
    case TOGGLE_SPLIT_VIEW_OPTION: {
      const splitView = !state.splitView;
      clickEvent({
        action: TOGGLE_SPLIT_VIEW_OPTION,
        label: splitView ? 1 : 0,
      });

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW, splitView);
      return {
        ...state,
        splitView,
      };
    }
    case TOGGLE_UNICODE_OPTION: {
      const unicode = !state.unicode;
      clickEvent({
        action: TOGGLE_UNICODE_OPTION,
        label: unicode ? 1 : 0,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_UNICODE, unicode);
      return {
        ...state,
        unicode,
      };
    }
    case TOGGLE_LARIVAAR_OPTION: {
      const larivaar = !state.larivaar;
      clickEvent({
        action: TOGGLE_LARIVAAR_OPTION,
        label: larivaar ? 1 : 0,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_LARIVAAR, larivaar);
      return {
        ...state,
        larivaar,
      };
    }
    case TOGGLE_LARIVAAR_ASSIST_OPTION: {
      const larivaarAssist = !state.larivaarAssist;
      clickEvent({
        action: TOGGLE_LARIVAAR_ASSIST_OPTION,
        label: larivaarAssist ? 1 : 0,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST, larivaarAssist);
      return {
        ...state,
        larivaarAssist,
      };
    }
    case SET_UNICODE: {
      const unicode = action.payload || false;
      clickEvent({
        action: SET_UNICODE,
        label: unicode ? true : false,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_UNICODE, unicode);
      return {
        ...state,
        unicode,
      };
    }
    case SET_FONT_SIZE: {
      const fontSize = parseFloat(action.payload, 10);

      if (fontSize === state.fontSize) return state;

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_FONT_SIZE, action.payload);
      return {
        ...state,
        fontSize,
      };
    }
    case SET_TRANSLATION_LANGUAGES: {
      const translationLanguages = action.payload || [];
      clickEvent({
        action: SET_TRANSLATION_LANGUAGES,
        label: JSON.stringify(translationLanguages),
      });
      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
        JSON.stringify(translationLanguages.payload)
      );
      return {
        ...state,
        translationLanguages,
      };
    }
    case SET_TRANSLITERATION_LANGUAGES: {
      const transliterationLanguages = action.payload || [];
      clickEvent({
        action: SET_TRANSLITERATION_LANGUAGES,
        label: JSON.stringify(transliterationLanguages),
      });
      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES,
        JSON.stringify(transliterationLanguages)
      );
      return {
        ...state,
        transliterationLanguages,
      };
    }
    case SET_DARK_MODE: {
      const darkMode = action.payload || false;
      clickEvent({
        action: SET_DARK_MODE,
        label: darkMode ? true : false,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_DARK_MODE, darkMode);
      return {
        ...state,
        darkMode,
      };
    }
    default:
      return state;
  }
}
