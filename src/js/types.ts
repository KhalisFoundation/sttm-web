export type IGurbani = Array<{
  shabad: IShabad;
}>;

export type IBaaniType = {
  ID: number;
  transliteration: string;
  gurmukhiUni: string;
};

export type IShabadTypes = 'shabad' | 'ang' | 'hukamnama';

export interface IShabad {
  shabadid: string;
  id: string;
  gurbani: {
    gurmukhi: string;
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
}

export interface IVerse {
  verseId: number;
  verse: {
    gurmukhi: string;
    unicode: string;
  };
  larivaar: {
    gurmukhi: string;
    unicode: string;
  };
  translation: {
    english: {
      ssk: string;
    };
    punjabi: {
      bms: {
        gurmukhi: string;
        unicode: string;
      };
    };
    spanish: string;
  };
  transliteration: {
    english: string;
  };
  shabadId: number;
  pageNo: number;
  lineNo: number;
  updated: string;
  firstLetters: {
    ascii: string;
    english: string;
  };
  bisram: {
    sttm: string;
    igurbani1: string;
    igurbani2: string;
  };
}

export interface IHukamnamaAPIResponseShabad {
  shabadInfo: IShabadInfo;
  count: number;
  navigation: {
    previous: number;
    next: number;
  };
  verses: IVerse[];
}

export interface IShabadInfo {
  shabadId: number;
  pageNo: number;
  source: {
    sourceId: string;
    gurmukhi: string;
    unicode: string;
    english: string;
    pageNo: number;
  };
  raag: {
    raagId: number;
    gurmukhi: string;
    unicode: string;
    english: string;
    startAng: number;
    endAng: number;
    raagWithPage: string;
  };
  writer: {
    writerId: string;
    gurmukhi: string;
    unicode: string;
    english: string;
  };
}
export interface IHukamnamaAPIResponse {
  date: {
    gregorian: {
      month: number;
      date: number;
      year: number;
    };
  };
  shabadIds: number[];
  shabads: IHukamnamaAPIResponseShabad[];
}

export interface IKhajanaAPIResponse {
  shabadinfo: {
    id: string;
    pageno: string;
    source: {
      english: string;
      gurmukhi: string;
      pageno: string;
      id: string;
    };
    raag: {
      english: string;
      unicode: string;
      gurmukhi: string;
    };
    writer: {
      english: string;
      unicode: string;
      gurmukhi: string;
    };
  };
  navigation: {
    previous: string;
    next: string;
  };
  source: string;
  gurbani: IGurbani[];
}
