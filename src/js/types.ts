export type Gurbani = {
  shabad: Shabad;
};

export type BaaniType = {
  ID: number;
  transliteration: string;
  gurmukhiUni: string;
};

export type ShabadTypes = 'shabad' | 'ang' | 'hukamnama';

export type Shabad = {
  shabadid: string;
  paragraph?: number;
  id: string;
  gurbani: {
    unicode: string;
    gurmukhi: string;
  };
  transliteration: string;
  translation: {
    english: {
      ssk: string;
    };
    spanish: string;
    punjabi: {
      bms: {
        unicode: string;
        gurmukhi: string;
      };
    };
  };
};
