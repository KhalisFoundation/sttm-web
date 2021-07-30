export interface IFavoriteShabad {
  id: number,
  verse: string,
  source?: string,
  createdAt?: string,
}

type PshabadInfo = {
  shabadId: string,
  source: {
    unicode: string,
    english: string
  },
  writer: {
    english: string
  }
}

type Pverse = {
  verseId: number,
  verse: {
    unicode: string
  },
  larivaar: {
    unicode: string
  }
}
export interface IShabad {
  shabadInfo: PshabadInfo,
  verses: Pverse[]
}