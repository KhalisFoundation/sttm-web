import {
  setOnlineMode,
  setTransliterationLanguages,
  resetDisplayOptions,
  resetFontOptions,
  toggleDisplayOptions,
  toggleFontOptions,
  toggleDarkMode,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleSplitViewOption,
  toggleUnicodeOption,
  setFontSize,
  setTranslationLanguages,
  toggleParagraphViewOption,
} from './actions';
import { initialState } from './store/initialState';

export interface IActionCreators {
  setOnlineMode: typeof setOnlineMode;
  setTransliterationLanguages: typeof setTransliterationLanguages;
  resetDisplayOptions: typeof resetDisplayOptions;
  resetFontOptions: typeof resetFontOptions;
  toggleDisplayOptions: typeof toggleDisplayOptions;
  toggleFontOptions: typeof toggleFontOptions;
  toggleDarkMode: typeof toggleDarkMode;
  toggleLarivaarAssistOption: typeof toggleLarivaarAssistOption;
  toggleLarivaarOption: typeof toggleLarivaarOption;
  toggleSplitViewOption: typeof toggleSplitViewOption;
  toggleParagraphViewOption: typeof toggleParagraphViewOption;
  toggleUnicodeOption: typeof toggleUnicodeOption;
  setFontSize: typeof setFontSize;
  setTranslationLanguages: typeof setTranslationLanguages;
}

export type State = typeof initialState;
