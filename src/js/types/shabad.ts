export type IShabad = {
  shabadid: string;
  id: string;
  gurbani: {
    unicode: string;
  };
  transliteration: {
    english: string,
    hindi: string,
    en: string,
    hi: string,
    ipa: string,
    ur: string,
  },
  translation: {
    en: {
      ssk: string,
      bdb: string,
      ms: string
    };
    es: {
      sn: string
    };
    pu: {
      ss: {
        gurmukhi: string,
        unicode: string
      },
      ft: {
        gurmukhi: string,
        unicode: string
      },      
      bdb: {
        gurmukhi: string,
        unicode: string
      },      
      ms: {
        gurmukhi: string,
        unicode: string
      },      
    };
    hi: {
      ss: string,
      sts: string,
    }
  };
};