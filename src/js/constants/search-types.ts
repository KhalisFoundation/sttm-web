interface ISearchTypes {
  [key: string]: number
}

export const SEARCH_TYPES: ISearchTypes = {
  FIRST_LETTERS: 0,
  FIRST_LETTERS_ANYWHERE: 1,
  GURMUKHI_WORD: 2,
  ENGLISH_WORD: 3,
  ROMANIZED: 4,
  ANG: 5,
  MAIN_LETTERS: 6,
  ROMANIZED_FIRST_LETTERS_ANYWHERE: 7,
  ASK_A_QUESTION: 8
};

export const SEARCH_TYPES_NOT_ALLOWED_KEYS = {
  [SEARCH_TYPES.MAIN_LETTERS]: ['W', 'y', 'Y', 'w', 'O', 'o', 'u', 'i', 'I', 'U', 'N', 'H', 'R', 'M'],
  [SEARCH_TYPES.ROMANIZED_FIRST_LETTERS_ANYWHERE]: []
}
