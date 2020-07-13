export interface ITransliterations {
  en: string,
  hi: string,
  ipa: string,
  ur: string
}

export interface IAmritKeertanHeader {
  HeaderID: number,
  Gurmukhi: string,
  GurmukhiUni: string,
  Transliterations: ITransliterations,
  Updated: string,
}
