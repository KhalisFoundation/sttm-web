type Socket = {
  on: (event: string, cb: (...args: any[]) => void) => void;
  disconnect: () => void;
};

interface Window {
  io: (path: string) => Socket;
}

declare var BANIS_API_URL: string;
declare var SYNC_API_URL: string;
declare var API_URL: string;
declare var window: Window;

declare module '@sttm/banidb' {
  type Options = {
    q?: string;
    source?: string;
    type?: number;
    writer?: number;
    raag?: number;
    ang?: number;
    results?: number;
    offset?: number;
    id?: number;
    hukam?: boolean;
    akhar?: boolean;
    lipi?: boolean;
    random?: boolean;
    randomid?: boolean;
    API_URL?: string;
  };
  export var TYPES: [
    'First letter each word from start (Gurmukhi)',
    'First letter each word anywhere (Gurmukhi)',
    'Full Word (Gurmukhi)',
    'Full Word Translation (English)',
    'Romanized Gurmukhi (English)'
  ];

  interface SOURCES {
    all: 'All Sources';
    G: 'Guru Granth Sahib Ji';
    D: 'Dasam Granth Sahib';
    B: 'Bhai Gurdas Ji Vaaran';
    A: 'Amrit Keertan';
    S: 'Bhai Gurdas Singh Ji Vaaran';
    N: 'Bhai Nand Lal Ji Vaaran';
    R: 'Rehatnamas & Panthic Sources';
  }

  export var SOURCES: SOURCES;

  export function buildApiUrl(options: Options): string;
}

type Gurbani = Array<{
  shabad: Shabad;
}>;

type BaaniType = {
  ID: number;
  transliteration: string;
  gurmukhiUni: string;
};

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
