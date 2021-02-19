export interface IStore {
  online: boolean;
  showAdvancedOptions: boolean;
  showTransliterationOptions: boolean;
  showTranslationOptions: boolean;
  translationLanguages: ['english', 'punjabi', 'spanish'];
  transliterationLanguages: ['english'];
  larivaarAssist: boolean;
  larivaarAssistStrength: number;
  larivaar: boolean;
  unicode: boolean;
  splitView: boolean;
  fontSize: number;
  darkMode: boolean;
}
