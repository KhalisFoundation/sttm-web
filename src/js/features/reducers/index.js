import {
    TOGGLE_DISPLAY_OPTIONS,
    TOGGLE_FONT_OPTIONS,
    TOGGLE_TRANSLATION_OPTIONS,
    TOGGLE_TRANSLITERATION_OPTIONS,
    TOGGLE_LARIVAAR_ASSIST_OPTION,
    TOGGLE_LARIVAAR_OPTION,
    TOGGLE_UNICODE_OPTION,
    TOGGLE_SPLIT_VIEW_OPTION,
    SET_FONT_SIZE,
    SET_TRANSLATION_LANGUAGES,
    SET_TRANSLITERATION_LANGUAGES,
} from '../actions';
import {
    LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW,
    LOCAL_STORAGE_KEY_FOR_UNICODE,
    LOCAL_STORAGE_KEY_FOR_LARIVAAR,
    LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST,
    LOCAL_STORAGE_KEY_FOR_FONT_SIZE,
    LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
    LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES,
} from '../../constants';
import {
    saveToLocalStorage,
} from '../../util';

export default function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_TRANSLITERATION_OPTIONS: return {
      ...state,
      showTransliterationOptions: !state.showTransliterationOptions,
    };
    case TOGGLE_TRANSLATION_OPTIONS: return {
      ...state,
      showTranslationOptions: !state.showTranslationOptions,
    };
    case TOGGLE_DISPLAY_OPTIONS: return {
      ...state,
      showDisplayOptions: !state.showDisplayOptions,
    };
    case TOGGLE_FONT_OPTIONS: return {
      ...state,
      showFontOptions: !state.showFontOptions,
    };
    case TOGGLE_SPLIT_VIEW_OPTION: {
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW, !state.splitView);
      return {
        ...state,
        splitView: !state.splitView,
      };
    }
    case TOGGLE_UNICODE_OPTION: {
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_UNICODE, !state.unicode);
      return {
        ...state,
        unicode: !state.unicode,
      };
    }
    case TOGGLE_LARIVAAR_OPTION: {
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_LARIVAAR, !state.larivaar);
      return {
        ...state,
        larivaar: !state.larivaar,
      };
    }
    case TOGGLE_LARIVAAR_ASSIST_OPTION: {
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST, !state.larivaarAssist);
      return {
        ...state,
        larivaarAssist: !state.larivaarAssist,
      };
    }
    case SET_FONT_SIZE: {
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_FONT_SIZE, action.payload);
      return {
        ...state,
        fontSize: parseFloat(action.payload, 10),
      };
    }
    case SET_TRANSLATION_LANGUAGES: {
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES, JSON.stringify(action.payload));
      return {
        ...state,
        translationLanguages: action.payload,
      };
    }
    case SET_TRANSLITERATION_LANGUAGES: {
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES, JSON.stringify(action.payload));
      return {
        ...state,
        transliterationLanguages: action.payload,
      };
    }
    default: return state;
  }
}
