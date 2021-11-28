interface IPshabadInfo {
  shabadId: string;
  source: {
    unicode: string;
    english: string;
  };
  writer: {
    english: string;
  };
}

interface IPverse {
  verseId: number;
  verse: {
    unicode: string;
  };
  larivaar: {
    unicode: string;
  };
}

export interface IFavoriteShabad {
  id: number;
  verse: string;
  source?: string;
  createdAt?: string;
}

export interface IShabad {
  shabadInfo: IPshabadInfo;
  verses: IPverse[];
}
