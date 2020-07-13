import { BANI_LENGTH_COLS } from "../../constants";

export const versesToGurbani = (verses, baniLength = 'extralong', mangalPosition = 'current') => {
  const processedVerses = mangalPosition === 'ceremony' ?
    verses : verses.filter(v => v.mangalPosition === mangalPosition || v.mangalPosition === null);

  return baniLength ?
    processedVerses.map(({ verse, ...v }) => ({
      ...verse,
      ...v,
    })).filter(v => v[BANI_LENGTH_COLS[baniLength]])
    :
    processedVerses.map(({ verse, ...v }) => ({
      ...verse,
      ...v,
    }));
}
