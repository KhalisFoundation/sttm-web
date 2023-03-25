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
  TOGGLE_SETTINGS_PANEL,
  TOGGLE_KEYBOARD_SHORTCUTS_PANEL,
  SET_SETTINGS_PANEL,
  SET_KEYBOARD_SHORTCUTS_PANEL,
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
  SET_STEEK_LANGUAGES,
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
  SET_SG_BAANI_LENGTH,
  SET_ERROR,
  CHANGE_FONT,
  SET_MULTIPLE_SHABADS,
  CLEAR_MULTIPLE_SHABADS,
  REMOVE_MULTIPLE_SHABADS,
  SET_MULTI_VIEW_PANEL,
  SET_PIN_SETTINGS,
  SET_ENGLISH_TRANSLATION_LANGUAGES,
  SET_HINDI_TRANSLATION_LANGUAGES,
  TOGGLE_CARTOONIFIED_PAGES,
  SET_CARTOONIFIED_PAGES,
  SET_IS_MODAL_OPEN,
  SET_GURBANI_VERSES,
  TOGGLE_SHABAD_AUDIO_PLAYER,
  SET_SHABAD_AUDIO_PLAYER,
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
  LOCAL_STORAGE_KEY_FOR_STEEK_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_CENTER_ALIGN_VIEW,
  LOCAL_STORAGE_KEY_FOR_SEHAJ_PAATH_MODE,
  LOCAL_STORAGE_KEY_FOR_SG_BAANI_LENGTH,
  LOCAL_STORAGE_KEY_FOR_MULTIPLE_SHABADS,
  LOCAL_STORAGE_KEY_FOR_ENGLISH_TRANSLATION_LANGUAGES,
  LOCAL_STORAGE_KEY_FOR_HINDI_TRANSLATION_LANGUAGES,
  PUNJABI_LANGUAGE,
  HINDI_LANGUAGE,
  ENGLISH_LANGUAGE,
  LOCAL_STORAGE_KEY_FOR_CARTOONIFIED_PAGES,
  LOCAL_STORAGE_KEY_FOR_SHABAD_AUDIO_PLAYER
} from '@/constants';
import {
  saveToLocalStorage,
  clickEvent,
} from '@/util';
import { DARK_MODE_COOKIE } from '../../../../common/constants';

export default function reducer(state, action) {
  switch (action.type) {
    case SET_MAHANKOSH_TOOLTIP_EXPLAINATION: {
      return {
        ...state,
        isMahankoshTooltipExplaination: action.payload,
      };
    }
    case SET_MAHANKOSH_TOOLTIP_ACTIVE: {
      return {
        ...state,
        isMahankoshTooltipActive: action.payload,
      };
    }
    case SET_LOADING_ANG: {
      return {
        ...state,
        isLoadingAng: action.payload,
      };
    }
    case SET_PREFETCH_ANG: {
      return {
        ...state,
        prefetchAng: action.payload,
      };
    }
    case SET_ONLINE_MODE: {
      {
        return {
          ...state,
          online: action.payload,
        };
      }
    }
    case SET_FULLSCREEN_MODE: {
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
    case TOGGLE_SETTINGS_PANEL: {
      const showSettingsPanel = !state.showSettingsPanel;
      clickEvent({
        action: TOGGLE_SETTINGS_PANEL,
        label: showSettingsPanel ? 1 : 0,
      });
      return {
        ...state,
        showSettingsPanel,
      };
    }
    case SET_SETTINGS_PANEL: {
      return {
        ...state,
        showSettingsPanel: action.payload,
      };
    }
    case SET_KEYBOARD_SHORTCUTS_PANEL: {
      return {
        ...state,
        showKeyboardShortcutsPanel: action.payload,
      };
    }
    case TOGGLE_KEYBOARD_SHORTCUTS_PANEL: {
      const showKeyboardShortcutsPanel = !state.showKeyboardShortcutsPanel;
      clickEvent({
        action: TOGGLE_KEYBOARD_SHORTCUTS_PANEL,
        label: showKeyboardShortcutsPanel ? 1 : 0,
      });
      return {
        ...state,
        showKeyboardShortcutsPanel,
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

    case TOGGLE_CARTOONIFIED_PAGES: {
      const showCartoonifiedPages = !state.showCartoonifiedPages;
      clickEvent({
        action: TOGGLE_CARTOONIFIED_PAGES,
        label: showCartoonifiedPages ? 1 : 0,
      });

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_CARTOONIFIED_PAGES, showCartoonifiedPages);
      return {
        ...state,
        showCartoonifiedPages,
      };
    }

    case TOGGLE_SHABAD_AUDIO_PLAYER: {
      const showShabadAudioPlayer = !state.showShabadAudioPlayer;
      clickEvent({
        action: TOGGLE_SHABAD_AUDIO_PLAYER,
        label: showShabadAudioPlayer ? 1 : 0,
      });

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_SHABAD_AUDIO_PLAYER, showShabadAudioPlayer);
      return {
        ...state,
        showShabadAudioPlayer,
      };
    }

    case TOGGLE_AUTO_SCROLL_MODE: {
      const autoScrollMode = !state.autoScrollMode;
      clickEvent({
        action: TOGGLE_AUTO_SCROLL_MODE,
        label: autoScrollMode ? 1 : 0,
      });

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_AUTO_SCROLL_MODE,
        autoScrollMode
      );

      return {
        ...state,
        autoScrollMode,
      };
    }

    case SET_SEHAJ_PAATH_MODE: {
      const sehajPaathMode = action.payload;

      clickEvent({
        action: SET_SEHAJ_PAATH_MODE,
        label: sehajPaathMode,
      });

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_SEHAJ_PAATH_MODE,
        sehajPaathMode
      );
      return {
        ...state,
        sehajPaathMode,
      };
    }

    case TOGGLE_SEHAJ_PAATH_MODE: {
      const sehajPaathMode = !state.sehajPaathMode;

      clickEvent({
        action: TOGGLE_SEHAJ_PAATH_MODE,
        label: sehajPaathMode ? 1 : 0,
      });

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_SEHAJ_PAATH_MODE,
        sehajPaathMode
      );
      return {
        ...state,
        sehajPaathMode,
      };
    }

    case TOGGLE_PARAGRAPH_MODE: {
      const paragraphMode = !state.paragraphMode;

      clickEvent({
        action: TOGGLE_PARAGRAPH_MODE,
        label: paragraphMode ? 1 : 0,
      });

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_PARAGRAPH_MODE, paragraphMode);
      return {
        ...state,
        paragraphMode,
      };
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
      const larivaarAssist = state.larivaarAssist && false;
      const larivaar = !state.larivaar;
      clickEvent({
        action: TOGGLE_LARIVAAR_OPTION,
        label: larivaar ? 1 : 0,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST, larivaarAssist);
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_LARIVAAR, larivaar);
      return {
        ...state,
        larivaar,
        larivaarAssist,
      };
    }
    case TOGGLE_LARIVAAR_ASSIST_OPTION: {
      let larivaar = state.larivaar;

      if (!larivaar) larivaar = !larivaar;

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
        larivaar,
      };
    }

    case SET_AUTOSCROLLING: {
      return {
        ...state,
        isAutoScrolling: action.payload,
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
    case SET_TRANSLATION_FONT_SIZE: {
      const translationFontSize = parseFloat(action.payload, 10);

      if (translationFontSize === state.translationFontSize) return state;

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_TRANSLATION_FONT_SIZE,
        action.payload
      );
      return {
        ...state,
        translationFontSize,
      };
    }
    case SET_TRANSLITERATION_FONT_SIZE: {
      const transliterationFontSize = parseFloat(action.payload, 10);

      if (transliterationFontSize === state.transliterationFontSize)
        return state;

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_TRANSLITERATION_FONT_SIZE,
        action.payload
      );
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

    case SET_SG_BAANI_LENGTH: {
      const sgBaaniLength = action.payload;

      clickEvent({
        action: SET_SG_BAANI_LENGTH,
        label: JSON.stringify(sgBaaniLength),
      });

      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_SG_BAANI_LENGTH, sgBaaniLength);

      return {
        ...state,
        sgBaaniLength,
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
      const isPunjabiLanguageSelected = action.payload.includes('punjabi');
      const isEnglishLanguageSelected = action.payload.includes('english');
      const isHindiLanguageSelected = action.payload.includes('hindi');

      const translationLanguages = action.payload || [];

      const isSteekLanguageSelected = state.steekLanguages.length > 0;
      let steekLanguages = [];
      if (isPunjabiLanguageSelected) {
        if (isSteekLanguageSelected) steekLanguages = state.steekLanguages;
        else {
          steekLanguages = ['BaniDB'];
        }
      }

      const isEnglishTranslationLanguageSelected =
        state.englishTranslationLanguages.length > 0;
      let englishTranslationLanguages = [];
      if (isEnglishLanguageSelected) {
        if (isEnglishTranslationLanguageSelected)
          englishTranslationLanguages = state.englishTranslationLanguages;
        else {
          englishTranslationLanguages = ['BaniDB'];
        }
      }

      const isHindiTranslationLanguageSelected =
        state.hindiTranslationLanguages.length > 0;
      let hindiTranslationLanguages = [];
      if (isHindiLanguageSelected) {
        if (isHindiTranslationLanguageSelected)
          hindiTranslationLanguages = state.hindiTranslationLanguages;
        else {
          hindiTranslationLanguages = ['sahib singh'];
        }
      }

      clickEvent({
        action: SET_TRANSLATION_LANGUAGES,
        label: JSON.stringify(translationLanguages),
      });

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
        JSON.stringify(translationLanguages)
      );

      // save steeks as well to local storage
      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_STEEK_LANGUAGES,
        JSON.stringify(steekLanguages)
      );

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_ENGLISH_TRANSLATION_LANGUAGES,
        JSON.stringify(englishTranslationLanguages)
      );

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_HINDI_TRANSLATION_LANGUAGES,
        JSON.stringify(hindiTranslationLanguages)
      );

      return {
        ...state,
        translationLanguages,
        steekLanguages,
        englishTranslationLanguages,
        hindiTranslationLanguages,
      };
    }

    case SET_STEEK_LANGUAGES: {
      const steekLanguages = action.payload || [];

      let translationLanguages = state.translationLanguages;
      if (steekLanguages.length > 0) {
        const isPunjabiLanguageSelected =
          state.translationLanguages.includes(PUNJABI_LANGUAGE);
        translationLanguages = isPunjabiLanguageSelected
          ? state.translationLanguages
          : [...state.translationLanguages, PUNJABI_LANGUAGE];
      } else {
        translationLanguages = state.translationLanguages.filter(
          (t) => t !== PUNJABI_LANGUAGE
        );
      }

      clickEvent({
        action: SET_STEEK_LANGUAGES,
        label: JSON.stringify(steekLanguages),
      });

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
        JSON.stringify(translationLanguages)
      );

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_STEEK_LANGUAGES,
        JSON.stringify(steekLanguages)
      );

      return {
        ...state,
        translationLanguages,
        steekLanguages,
      };
    }

    case SET_ENGLISH_TRANSLATION_LANGUAGES: {
      let englishTranslationLanguages = action.payload || [];

      let translationLanguages = [];
      if (englishTranslationLanguages.length > 0) {
        const isEnglishLanguageSelected =
          state.translationLanguages.includes(ENGLISH_LANGUAGE);
        translationLanguages = isEnglishLanguageSelected
          ? state.translationLanguages
          : [...state.translationLanguages, ENGLISH_LANGUAGE];
      } else {
        translationLanguages = state.translationLanguages.filter(
          (t) => t !== ENGLISH_LANGUAGE
        );
      }

      clickEvent({
        action: LOCAL_STORAGE_KEY_FOR_ENGLISH_TRANSLATION_LANGUAGES,
        label: JSON.stringify(englishTranslationLanguages),
      });

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
        JSON.stringify(translationLanguages)
      );

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_ENGLISH_TRANSLATION_LANGUAGES,
        JSON.stringify(englishTranslationLanguages)
      );

      return {
        ...state,
        translationLanguages,
        englishTranslationLanguages,
      };
    }

    case SET_HINDI_TRANSLATION_LANGUAGES: {
      let hindiTranslationLanguages = action.payload || [];

      let translationLanguages = [];
      if (hindiTranslationLanguages.length > 0) {
        const isHindiLanguageSelected =
          state.translationLanguages.includes(HINDI_LANGUAGE);
        translationLanguages = isHindiLanguageSelected
          ? state.translationLanguages
          : [...state.translationLanguages, HINDI_LANGUAGE];
      } else {
        translationLanguages = state.translationLanguages.filter(
          (t) => t !== HINDI_LANGUAGE
        );
      }

      clickEvent({
        action: LOCAL_STORAGE_KEY_FOR_HINDI_TRANSLATION_LANGUAGES,
        label: JSON.stringify(hindiTranslationLanguages),
      });

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_TRANSLATION_LANGUAGES,
        JSON.stringify(translationLanguages)
      );

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_HINDI_TRANSLATION_LANGUAGES,
        JSON.stringify(hindiTranslationLanguages)
      );

      return {
        ...state,
        translationLanguages,
        hindiTranslationLanguages,
      };
    }

    case SET_LARIVAAR_ASSIST_STRENGTH: {
      const larivaarAssistStrength = action.payload;

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_LARIVAAR_ASSIST_STRENGTH,
        JSON.stringify(larivaarAssistStrength)
      );

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

    case SET_CARTOONIFIED_PAGES: {
      const showCartoonifiedPages = action.payload || false;
      clickEvent({
        action: SET_CARTOONIFIED_PAGES,
        label: showCartoonifiedPages ? true : false,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_CARTOONIFIED_PAGES, showCartoonifiedPages);
      return {
        ...state,
        showCartoonifiedPages,
      };
    }

    case SET_SHABAD_AUDIO_PLAYER: {
      const showShabadAudioPlayer = action.payload || false;
      clickEvent({
        action: SET_SHABAD_AUDIO_PLAYER,
        label: showShabadAudioPlayer ? true : false,
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_SHABAD_AUDIO_PLAYER, showShabadAudioPlayer);
      return {
        ...state,
        showShabadAudioPlayer,
      };
    }

    case SET_AUTO_SCROLL_MODE: {
      const autoScrollMode = action.payload || false;
      clickEvent({
        action: SET_AUTO_SCROLL_MODE,
        label: autoScrollMode ? true : false,
      });
      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_AUTO_SCROLL_MODE,
        autoScrollMode
      );
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

    case SET_MULTIPLE_SHABADS: {
      const newShabad = action.payload;
      const multipleShabads =
        state.multipleShabads.findIndex((e) => e.id === newShabad.id) === -1
          ? [...state.multipleShabads, newShabad]
          : [...state.multipleShabads];

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_MULTIPLE_SHABADS,
        JSON.stringify(multipleShabads)
      );

      return {
        ...state,
        multipleShabads,
      };
    }

    case REMOVE_MULTIPLE_SHABADS: {
      const id = action.payload;
      const multipleShabads = state.multipleShabads.filter(
        (shabad) => shabad.id !== id
      );

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_MULTIPLE_SHABADS,
        JSON.stringify(multipleShabads)
      );

      return {
        ...state,
        multipleShabads,
      };
    }

    case CLEAR_MULTIPLE_SHABADS: {
      const multipleShabads = [];

      saveToLocalStorage(
        LOCAL_STORAGE_KEY_FOR_MULTIPLE_SHABADS,
        multipleShabads
      );
      return {
        ...state,
        multipleShabads,
      };
    }

    case SET_MULTI_VIEW_PANEL: {
      const showMultiViewPanel = action.payload;
      return {
        ...state,
        showMultiViewPanel,
      };
    }

    case SET_PIN_SETTINGS: {
      const showPinSettings = action.payload;
      return {
        ...state,
        showPinSettings,
      };
    }

    case SET_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error,
      };
    }

    case SET_IS_MODAL_OPEN: {
      const isModalOpen = action.payload;
      return {
        ...state,
        isModalOpen
      };
    }

    case SET_GURBANI_VERSES: {
      const gurbaniVerses = action.payload;
      return {
        ...state,
        gurbaniVerses
      };
    }

    default:
      return state;
  }
}
