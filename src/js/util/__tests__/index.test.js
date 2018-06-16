/* global describe, it, expect */
import { getHighlightIndices, toggleItemInArray } from '../';

describe('toggleItemInArray()', () => {
  it('returns [1,3] when called with (2, [1,2,3])', () => {
    expect(toggleItemInArray(2, [1, 2, 3])).toEqual([1, 3]);
  });
});

describe('getHighlightIndices()', () => {
  it('returns correct result when called with ("mucu mucu grB gey kIn bicAw ]", "mmggk", 0)', () => {
    expect(
      getHighlightIndices('mucu mucu grB gey kIn bicAw ]', 'mmggk', 0)
    ).toEqual([0, 5]);
  });

  it('returns correct result when called with ("iqsu ivxu sBu ApivqRü hY jyqw pYnxu Kwxu ]", "hjp", 0)', () => {
    expect(
      getHighlightIndices(
        'iqsu ivxu sBu ApivqRü hY jyqw pYnxu Kwxu ]',
        'hjp',
        1
      )
    ).toEqual([4, 7]);
  });

  it('returns correct result when called with ("suix mn myry Bju sqgur srxw ]", "mn myry", 2)', () => {
    expect(
      getHighlightIndices('suix mn myry Bju sqgur srxw ]', 'mn myry', 2)
    ).toEqual([1, 3]);
  });

  it('returns correct result when called with ("nwnk ivgsY vyprvwhu ]3]", "vwh", 2)', () => {
    expect(getHighlightIndices('nwnk ivgsY vyprvwhu ]3]', 'vwh', 2)).toEqual([
      2,
      3,
    ]);
  });

  it('returns correct result when called with ("ikAw pihrau ikAw EiF idKwvau ]", "kya pehiru kya", 4)', () => {
    expect(
      getHighlightIndices('ikAw pihrau ikAw EiF idKwvau ]', 'kya pehiru kya', 4)
    ).toEqual([0, 3]);
  });
});
