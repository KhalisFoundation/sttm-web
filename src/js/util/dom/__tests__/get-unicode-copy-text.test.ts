import { getUnicodeCopyText } from '../get-unicode-copy-text';

describe('getUnicodeCopyText()', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns null when unicode display mode is on', () => {
    document.body.innerHTML =
      '<div data-unicode-verse="ਸਾਰਗ"><div class="gurlipi">swrg</div></div>';
    const node = document.querySelector('.gurlipi').firstChild;

    expect(
      getUnicodeCopyText({ unicodeMode: true, selectionAnchorNode: node })
    ).toBeNull();
  });

  it('returns unicode when copying from a GurbaniLipi pankti', () => {
    document.body.innerHTML =
      '<div data-unicode-verse="ਸਾਰਗ ਮਹਲਾ ੫ ॥"><div class="gurlipi">swrg mhlw 5 ]</div></div>';
    const node = document.querySelector('.gurlipi').firstChild;

    expect(
      getUnicodeCopyText({ unicodeMode: false, selectionAnchorNode: node })
    ).toBe('ਸਾਰਗ ਮਹਲਾ ੫ ॥');
  });

  it('does not rewrite copies from translations', () => {
    document.body.innerHTML =
      '<div data-unicode-verse="ਸਾਰਗ"><div class="translation">Saarang</div></div>';
    const node = document.querySelector('.translation').firstChild;

    expect(
      getUnicodeCopyText({ unicodeMode: false, selectionAnchorNode: node })
    ).toBeNull();
  });
});
