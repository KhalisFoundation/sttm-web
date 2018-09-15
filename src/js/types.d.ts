type Gurbani = Array<{
  shabad: Shabad;
}>;

type ShabadTypes = 'shabad' | 'ang' | 'hukamnama';
type Shabad = {
  shabadid: string;
  id: string;
  gurbani: {
    unicode: string;
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
      };
    };
  };
};
