export type Action = {
  type: string;
  payload: any;
};

export type Store = {
  fontSize: number;
  larivaarAssist: boolean;
  larivaar: boolean;
  unicode: boolean;
  splitView: boolean;
  darkMode: boolean;
  showFontOptions: boolean;
  showDisplayOptions: boolean;
  showTranslationOptions: boolean;
  showTransliterationOptions: boolean;
  transliterationLanguages: string[];
  translationLanguages: string[];
  online: boolean;
};
