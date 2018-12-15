import { Actions } from '../actions/types';
import { State } from '../types';
import {
  LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW,
  LOCAL_STORAGE_KEY_FOR_UNICODE,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST,
  LOCAL_STORAGE_KEY_FOR_DARK_MODE,
  LOCAL_STORAGE_KEY_FOR_FONT_SIZE,
  LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_PARAGRAPH_VIEW,
} from '@/constants';
import { saveToLocalStorage } from '@/util';
import { clickEvent } from '@/util/analytics';
import { DARK_MODE_COOKIE } from '@/../../common/constants';

export default function reducer(
  state: State,
  action: { type: Actions; payload: any }
) {
  switch (action.type) {
    case Actions.SET_ONLINE_MODE: {
      return {
        ...state,
        online: action.payload,
      };
    }
    case Actions.TOGGLE_TRANSLITERATION_OPTIONS: {
      const showTransliterationOptions = !state.showTransliterationOptions;
      clickEvent({
        action: Actions.TOGGLE_TRANSLITERATION_OPTIONS,
        label: showTransliterationOptions ? 1 : 0,
      });
      return {
        ...state,
        showTransliterationOptions,
      };
    }
    case Actions.TOGGLE_TRANSLATION_OPTIONS: {
      const showTranslationOptions = !state.showTranslationOptions;
      clickEvent({
        action: Actions.TOGGLE_TRANSLATION_OPTIONS,
        label: showTranslationOptions ? 1 : 0,
      });
      return {
        ...state,
        showTranslationOptions,
      };
    }
    case Actions.TOGGLE_DISPLAY_OPTIONS: {
      const showDisplayOptions = !state.showDisplayOptions;
      clickEvent({
        action: Actions.TOGGLE_DISPLAY_OPTIONS,
        label: showDisplayOptions ? 1 : 0,
      });
      return {
        ...state,
        showDisplayOptions,
      };
    }
    case Actions.TOGGLE_FONT_OPTIONS: {
      const showFontOptions = !state.showFontOptions;
      clickEvent({
        action: Actions.TOGGLE_FONT_OPTIONS,
        label: showFontOptions ? 1 : 0,
      });
      return {
        ...state,
        showFontOptions,
      };
    }
    case Actions.TOGGLE_DARK_MODE: {
      const darkMode = !state.darkMode;
      clickEvent({
        action: Actions.TOGGLE_DARK_MODE,
        label: darkMode ? 1 : 0,
      });

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_DARK_MODE, darkMode);
      document.cookie = `${DARK_MODE_COOKIE}=${darkMode ? 1 : 0};`;
      return {
        ...state,
        darkMode,
      };
    }
    case Actions.TOGGLE_PARAGRAPH_VIEW_OPTION: {
      const paragraphView = !state.paragraphView;
      clickEvent({
        action: Actions.TOGGLE_PARAGRAPH_VIEW_OPTION,
        label: paragraphView ? 1 : 0,
      });

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_PARAGRAPH_VIEW, paragraphView);
      return {
        ...state,
        paragraphView,
      };
    }
    case Actions.TOGGLE_SPLIT_VIEW_OPTION: {
      const splitView = !state.splitView;
      clickEvent({
        action: Actions.TOGGLE_SPLIT_VIEW_OPTION,
        label: splitView ? 1 : 0,
      });

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW, splitView);
      return {
        ...state,
        splitView,
      };
    }
    case Actions.TOGGLE_UNICODE_OPTION: {
      const unicode = !state.unicode;
      clickEvent({
        action: Actions.TOGGLE_UNICODE_OPTION,
        label: unicode ? 1 : 0,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_UNICODE, unicode);
      return {
        ...state,
        unicode,
      };
    }
    case Actions.TOGGLE_LARIVAAR_OPTION: {
      const larivaar = !state.larivaar;
      clickEvent({
        action: Actions.TOGGLE_LARIVAAR_OPTION,
        label: larivaar ? 1 : 0,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_LARIVAAR, larivaar);
      return {
        ...state,
        larivaar,
      };
    }
    case Actions.TOGGLE_LARIVAAR_ASSIST_OPTION: {
      const larivaarAssist = !state.larivaarAssist;
      clickEvent({
        action: Actions.TOGGLE_LARIVAAR_ASSIST_OPTION,
        label: larivaarAssist ? 1 : 0,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST, larivaarAssist);
      return {
        ...state,
        larivaarAssist,
      };
    }
    case Actions.SET_UNICODE: {
      const unicode = action.payload || false;
      clickEvent({
        action: Actions.SET_UNICODE,
        label: unicode ? true : false,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_UNICODE, unicode);
      return {
        ...state,
        unicode,
      };
    }
    case Actions.SET_FONT_SIZE: {
      const fontSize = parseFloat(action.payload);

      if (fontSize === state.fontSize) {
        return state;
      }

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_FONT_SIZE, action.payload);
      return {
        ...state,
        fontSize,
      };
    }
    case Actions.SET_TRANSLATION_LANGUAGES: {
      const translationLanguages = action.payload || [];
      clickEvent({
        action: Actions.SET_TRANSLATION_LANGUAGES,
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
    case Actions.SET_TRANSLITERATION_LANGUAGES: {
      const transliterationLanguages = action.payload || [];
      clickEvent({
        action: Actions.SET_TRANSLITERATION_LANGUAGES,
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
    case Actions.SET_DARK_MODE: {
      const darkMode = action.payload || false;
      clickEvent({
        action: Actions.SET_DARK_MODE,
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
