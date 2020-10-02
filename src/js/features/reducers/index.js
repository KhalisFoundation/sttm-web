import {
  TOGGLE_ADVANCED_OPTIONS,
  TOGGLE_TRANSLATION_OPTIONS,
  TOGGLE_TRANSLITERATION_OPTIONS,
  TOGGLE_LARIVAAR_ASSIST_OPTION,
  TOGGLE_LARIVAAR_OPTION,
  TOGGLE_DARK_MODE,
  TOGGLE_AUTO_SCROLL_MODE,
  TOGGLE_PARAGRAPH_MODE,
  TOGGLE_SPLIT_VIEW_OPTION,
  TOGGLE_VISRAAMS,
  TOGGLE_SEHAJ_PAATH_MODE,
  SET_MAHANKOSH_TOOLTIP_EXPLAINATION,
  SET_MAHANKOSH_TOOLTIP_ACTIVE,
  SET_VISRAAM_SOURCE,
  SET_VISRAAM_STYLE,
  SET_CENTER_ALIGN_OPTION,
  SET_UNICODE,
  SET_FONT_SIZE,
  SET_TRANSLATION_FONT_SIZE,
  SET_TRANSLITERATION_FONT_SIZE,
  SET_LINE_HEIGHT,
  SET_AUTOSCROLLING,
  SET_TRANSLATION_LANGUAGES,
  SET_TRANSLITERATION_LANGUAGES,
  SET_LARIVAAR_ASSIST_STRENGTH,
  SET_ONLINE_MODE,
  SET_DARK_MODE,
  SET_AUTO_SCROLL_MODE,
  SET_PARAGRAPH_MODE,
  SET_SEHAJ_PAATH_MODE,
  SET_VISRAAMS,
  SET_SPLIT_VIEW,
  SET_FULLSCREEN_MODE,
  SET_LOADING_ANG,
  SET_PREFETCH_ANG,
  CHANGE_FONT,
} from '../actions';
import {
  LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW,
  LOCAL_STORAGE_KEY_FOR_UNICODE,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST,
  LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST_STRENGTH,
  LOCAL_STORAGE_KEY_FOR_DARK_MODE,
  LOCAL_STORAGE_KEY_FOR_AUTO_SCROLL_MODE,
  LOCAL_STORAGE_KEY_FOR_PARAGRAPH_MODE,
  LOCAL_STORAGE_KEY_FOR_VISRAAMS,
  LOCAL_STORAGE_KEY_FOR_VISRAAM_SOURCE,
  LOCAL_STORAGE_KEY_FOR_VISRAAMS_STYLE,
  LOCAL_STORAGE_KEY_FOR_FONT_SIZE,
  LOCAL_STORAGE_KEY_FOR_TRANSLATION_FONT_SIZE,
  LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_FONT_SIZE,
  LOCAL_STORAGE_KEY_FOR_LINE_HEIGHT,
  LOCAL_STORAGE_KEY_FOR_FONT_FAMILY,
  LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_CENTER_ALIGN_VIEW,
  LOCAL_STORAGE_KEY_FOR_SEHAJ_PAATH_MODE,
} from '../../constants';
import { saveToLocalStorage } from '../../util';
import { clickEvent } from '../../util/analytics';
import { DARK_MODE_COOKIE } from '../../../../common/constants';

export default function reducer(state, action) {
  switch (action.type) {
    case SET_MAHANKOSH_TOOLTIP_EXPLAINATION: {
      return {
        ...state,
        isMahankoshTooltipExplaination: action.payload
      }
    }
    case SET_MAHANKOSH_TOOLTIP_ACTIVE: {
      return {
        ...state,
        isMahankoshTooltipActive: action.payload
      }
    }
    case SET_LOADING_ANG: {
      return {
        ...state,
        isLoadingAng: action.payload
      }
    }
    case SET_PREFETCH_ANG: {
      return {
        ...state,
        prefetchAng: action.payload
      }
    }
    case SET_ONLINE_MODE: {
      {
        return {
          ...state,
          online: action.payload
        }
      }
    }
    case SET_FULLSCREEN_MODE:
      {
        return {
          ...state,
          fullScreenMode: action.payload,
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
    case TOGGLE_ADVANCED_OPTIONS: {
      const showAdvancedOptions = !state.showAdvancedOptions;
      clickEvent({
        action: TOGGLE_ADVANCED_OPTIONS,
        label: showAdvancedOptions ? 1 : 0,
      });
      return {
        ...state,
        showAdvancedOptions,
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
    case TOGGLE_AUTO_SCROLL_MODE: {
      const autoScrollMode = !state.autoScrollMode;
      clickEvent({
        action: TOGGLE_AUTO_SCROLL_MODE,
        label: autoScrollMode ? 1 : 0,
      });

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_AUTO_SCROLL_MODE, autoScrollMode);

      return {
        ...state,
        autoScrollMode,
      };
    }

    case SET_SEHAJ_PAATH_MODE: {
      const sehajPaathMode = action.payload;

      clickEvent({
        action: SET_SEHAJ_PAATH_MODE,
        label: sehajPaathMode
      })

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_SEHAJ_PAATH_MODE, sehajPaathMode);
      return {
        ...state,
        sehajPaathMode
      }
    }

    case TOGGLE_SEHAJ_PAATH_MODE: {
      const sehajPaathMode = !state.sehajPaathMode;

      clickEvent({
        action: TOGGLE_SEHAJ_PAATH_MODE,
        label: sehajPaathMode ? 1 : 0,
      })

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_SEHAJ_PAATH_MODE, sehajPaathMode);
      return {
        ...state,
        sehajPaathMode
      }
    }


    case TOGGLE_PARAGRAPH_MODE: {
      const paragraphMode = !state.paragraphMode;

      clickEvent({
        action: TOGGLE_PARAGRAPH_MODE,
        label: paragraphMode ? 1 : 0,
      })

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_PARAGRAPH_MODE, paragraphMode);
      return {
        ...state,
        paragraphMode
      }
    }

    case TOGGLE_VISRAAMS: {
      const visraams = !state.visraams;
      clickEvent({
        action: TOGGLE_VISRAAMS,
        label: visraams ? 1 : 0,
      });
      const larivaarAssist = state.larivaarAssist && !visraams;
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAMS, visraams);
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST, larivaarAssist);
      return {
        ...state,
        visraams,
        larivaarAssist,
      };
    }
    case SET_VISRAAM_SOURCE: {
      const visraamSource = action.payload;
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAM_SOURCE, visraamSource);
      return {
        ...state,
        visraamSource,
      };
    }

    case SET_VISRAAM_STYLE: {
      const visraamStyle = action.payload;
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAMS_STYLE, visraamStyle);
      return {
        ...state,
        visraamStyle,
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
    case TOGGLE_LARIVAAR_OPTION: {
      if (state.larivaarAssist) return { ...state, larivaarAssist: !state.larivaarAssist }
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
      let larivaar = state.larivaar

      if (!larivaar) larivaar = !larivaar

      const larivaarAssist = !state.larivaarAssist;
      clickEvent({
        action: TOGGLE_LARIVAAR_ASSIST_OPTION,
        label: larivaarAssist ? 1 : 0,
      });
      const visraams = state.visraams && !larivaarAssist;
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST, larivaarAssist);
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAMS, visraams);
      return {
        ...state,
        larivaarAssist,
        visraams,
        larivaar
      };
    }

    case SET_AUTOSCROLLING: {
      return {
        ...state,
        isAutoScrolling: action.payload,
      }
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
    case SET_TRANSLATION_FONT_SIZE: {
      const translationFontSize = parseFloat(action.payload, 10);

      if (translationFontSize === state.translationFontSize) return state;

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_TRANSLATION_FONT_SIZE, action.payload);
      return {
        ...state,
        translationFontSize,
      };
    }
    case SET_TRANSLITERATION_FONT_SIZE: {
      const transliterationFontSize = parseFloat(action.payload, 10);

      if (transliterationFontSize === state.transliterationFontSize) return state;

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_FONT_SIZE, action.payload);
      return {
        ...state,
        transliterationFontSize,
      };
    }
    case SET_LINE_HEIGHT: {
      const lineHeight = parseFloat(action.payload, 10);

      if (lineHeight === state.lineHeight) return state;

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_LINE_HEIGHT, action.payload);
      return {
        ...state,
        lineHeight,
      };
    }
    case CHANGE_FONT: {
      const fontFamily = action.payload;
      const unicode = fontFamily === 'unicode_font';
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_UNICODE, unicode);
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_FONT_FAMILY, fontFamily);
      return {
        ...state,
        unicode,
        fontFamily,
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
        JSON.stringify(translationLanguages)
      );
      return {
        ...state,
        translationLanguages,
      };
    }
    case SET_LARIVAAR_ASSIST_STRENGTH: {
      const larivaarAssistStrength = action.payload;

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST_STRENGTH,
        JSON.stringify(larivaarAssistStrength)
      )

      return {
        ...state,
        larivaarAssistStrength,
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
    case SET_PARAGRAPH_MODE: {
      const paragraphMode = action.payload;

      clickEvent({
        action: SET_PARAGRAPH_MODE,
        label: paragraphMode ? true : false,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_PARAGRAPH_MODE, paragraphMode);
      return {
        ...state,
        paragraphMode,
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
    case SET_AUTO_SCROLL_MODE: {
      const autoScrollMode = action.payload || false;
      clickEvent({
        action: SET_AUTO_SCROLL_MODE,
        label: autoScrollMode ? true : false,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_AUTO_SCROLL_MODE, autoScrollMode);
      return {
        ...state,
        autoScrollMode,
      };
    }
    case SET_VISRAAMS: {
      const visraams = action.payload || false;
      clickEvent({
        action: SET_VISRAAMS,
        label: visraams ? true : false,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAMS, visraams);
      return {
        ...state,
        visraams,
      };
    }
    case SET_SPLIT_VIEW: {
      const splitView = action.payload || false;
      clickEvent({
        action: SET_SPLIT_VIEW,
        label: splitView ? true : false,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_SPLIT_VIEW, splitView);
      return {
        ...state,
        splitView,
      };
    }
    case SET_CENTER_ALIGN_OPTION: {
      const centerAlignGurbani = action.payload;

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_CENTER_ALIGN_VIEW,
        centerAlignGurbani
      );
      return {
        ...state,
        centerAlignGurbani,
      };
    }
    default:
      return state;
  }
}
