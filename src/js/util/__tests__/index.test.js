/* global describe, it, expect */
import { getHighlightIndices, toggleItemInArray } from '../';

describe('toggleItemInArray()', () => {
  it('returns [1,3] when called with (2, [1,2,3])', () => {
    expect(toggleItemInArray(2, [1, 2, 3])).toEqual([1, 3]);
  });
});

describe('getHighlightIndices()', () => {
  it('returns correct result when called for type 0', () => {
    expect(
      getHighlightIndices('mucu mucu grB gey kIn bicAw ]', 'mmggk', 0)
    ).toEqual([0, 1, 2, 3, 4]);
  });

  it('returns correct result when called for type 1', () => {
    expect(
      getHighlightIndices(
        'iqsu ivxu sBu ApivqRü hY jyqw pYnxu Kwxu ]',
        'hjp',
        1
      )
    ).toEqual([4, 5, 6]);
  });

  it('returns correct result when called for type 1', () => {
    expect(
      getHighlightIndices(
        'hm ikAw gux qyry ivQrh suAwmI qUM Apr Apwro rwm rwjy ]',
        'kgqv',
        1
      )
    ).toEqual([1, 2, 3, 4]);
  });

  it('returns correct result when called for type 2', () => {
    expect(
      getHighlightIndices('suix mn myry Bju sqgur srxw ]', 'mn myry', 2)
    ).toEqual([1, 2]);
  });

  it('returns correct result when called for type 2', () => {
    expect(getHighlightIndices('nwnk ivgsY vyprvwhu ]3]', 'vwh', 2)).toEqual([
      2
    ]);
  });

  it('returns correct result when called for type 4', () => {
    expect(
      getHighlightIndices('ikAw pihrau ikAw EiF idKwvau ]', 'kya pehiru kya', 4)
    ).toEqual([0, 1, 2]);
  });
});
