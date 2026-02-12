interface Verse {
    verseId: number;
    shabadId: number;
    verse: {
      gurmukhi?: string;
      unicode: string;
    };
    larivaar?: {
      gurmukhi?: string;
      unicode?: string;
    };
    translation?: {
      en?: {
        bdb?: string;
        ms?: string;
        ssk?: string;
      };
      pu?: {
        pss?: {
          gurmukhi?: string;
          unicode?: string;
        };
        ss?: {
          gurmukhi?: string;
          unicode?: string;
        };
      };
      [key: string]: any;
    };
    transliteration?: {
      english?: string;
      hindi?: string;
      en?: string;
      hi?: string;
      ipa?: string;
      ur?: string;
    };
    pageNo?: number;
    lineNo?: number;
    updated?: string;
    visraam?: any;
  }
  export default Verse;