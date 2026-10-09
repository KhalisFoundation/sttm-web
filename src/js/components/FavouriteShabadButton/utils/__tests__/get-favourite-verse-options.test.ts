import { getFavouriteVerseOptions } from '../get-favourite-verse-options';

describe('getFavouriteVerseOptions()', () => {
  it('returns an empty list for missing or invalid verses', () => {
    expect(getFavouriteVerseOptions(undefined)).toEqual([]);
    expect(getFavouriteVerseOptions(null)).toEqual([]);
    expect(getFavouriteVerseOptions([])).toEqual([]);
    expect(getFavouriteVerseOptions([{}])).toEqual([]);
  });

  it('maps verses to select options using unicode when present', () => {
    expect(
      getFavouriteVerseOptions([
        {
          verseId: 10,
          verse: { unicode: 'ਸਾਰਗ', gurmukhi: 'swrg' },
        },
      ])
    ).toEqual([{ label: 'ਸਾਰਗ', value: 10 }]);
  });
});
