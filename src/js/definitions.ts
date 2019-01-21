type Socket = {
  on: (event: string, cb: (...args: any[]) => void) => void;
  disconnect: () => void;
};

// tslint:disable-next-line
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

  export let TYPES: [
    'First letter each word from start (Gurmukhi)',
    'First letter each word anywhere (Gurmukhi)',
    'Full Word (Gurmukhi)',
    'Full Word Translation (English)',
    'Romanized Gurmukhi (English)'
  ];

  interface ISOURCES {
    all: 'All Sources';
    G: 'Guru Granth Sahib Ji';
    D: 'Dasam Granth Sahib';
    B: 'Bhai Gurdas Ji Vaaran';
    A: 'Amrit Keertan';
    S: 'Bhai Gurdas Singh Ji Vaaran';
    N: 'Bhai Nand Lal Ji Vaaran';
    R: 'Rehatnamas & Panthic Sources';
  }

  export let SOURCES: ISOURCES;

  export function buildApiUrl(options: Options): string;
}
