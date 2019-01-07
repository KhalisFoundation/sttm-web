export interface IStore {
  online: boolean;
  showDisplayOptions: boolean;
  showFontOptions: boolean;
  showTransliterationOptions: boolean;
  showTranslationOptions: boolean;
  translationLanguages: ['english', 'punjabi', 'spanish'];
  transliterationLanguages: ['english'];
  larivaarAssist: boolean;
  larivaar: boolean;
  unicode: boolean;
  splitView: boolean;
  fontSize: number;
  darkMode: boolean;
}
