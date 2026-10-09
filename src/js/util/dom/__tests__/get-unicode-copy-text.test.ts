import { getUnicodeCopyText } from '../get-unicode-copy-text';

const textLength = (element: Element): number =>
  (element.textContent || '').length;

const rangeBetween = (from: Element, to: Element): Range => {
  const range = document.createRange();
  range.setStart(from.firstChild as Node, 0);
  range.setEnd(to.lastChild as Node, textLength(to));
  return range;
};

const selectionLike = (
  range: Range,
  overrides: Record<string, unknown> = {}
) => ({
  anchorNode: range.startContainer,
  focusNode: range.endContainer,
  isCollapsed: false,
  rangeCount: 1,
  getRangeAt: () => range,
  ...overrides,
});

describe('getUnicodeCopyText()', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns null when unicode display mode is on', () => {
    document.body.innerHTML =
      '<div data-unicode-verse="ਸਾਰਗ ਮਹਲਾ ੫ ॥"><div class="gurlipi">swrg mhlw 5 ]</div></div>';
    const pankti = document.querySelector('.gurlipi') as Element;
    const selection = selectionLike(rangeBetween(pankti, pankti));

    expect(getUnicodeCopyText({ unicodeMode: true, selection })).toBeNull();
  });

  it('returns null for a collapsed or empty selection', () => {
    document.body.innerHTML =
      '<div data-unicode-verse="ਸਾਰਗ"><div class="gurlipi">swrg</div></div>';
    const pankti = document.querySelector('.gurlipi') as Element;
    const range = rangeBetween(pankti, pankti);

    expect(
      getUnicodeCopyText({
        unicodeMode: false,
        selection: selectionLike(range, { isCollapsed: true }),
      })
    ).toBeNull();
    expect(
      getUnicodeCopyText({
        unicodeMode: false,
        selection: selectionLike(range, { rangeCount: 0 }),
      })
    ).toBeNull();
    expect(
      getUnicodeCopyText({ unicodeMode: false, selection: null })
    ).toBeNull();
  });

  it('returns the unicode of a selected GurbaniLipi pankti', () => {
    document.body.innerHTML =
      '<div data-unicode-verse="ਸਾਰਗ ਮਹਲਾ ੫ ॥"><div class="gurlipi">swrg mhlw 5 ]</div></div>';
    const pankti = document.querySelector('.gurlipi') as Element;

    expect(
      getUnicodeCopyText({
        unicodeMode: false,
        selection: selectionLike(rangeBetween(pankti, pankti)),
      })
    ).toBe('ਸਾਰਗ ਮਹਲਾ ੫ ॥');
  });

  it('supports reading-mode lines', () => {
    document.body.innerHTML =
      '<div data-unicode-verse="ਸਾਰਗ"><div class="gurlipi-reading-mode">swrg</div></div>';
    const pankti = document.querySelector(
      '.gurlipi-reading-mode'
    ) as Element;

    expect(
      getUnicodeCopyText({
        unicodeMode: false,
        selection: selectionLike(rangeBetween(pankti, pankti)),
      })
    ).toBe('ਸਾਰਗ');
  });

  it('joins every selected pankti in order', () => {
    document.body.innerHTML =
      '<div id="shabad">' +
      '<div data-unicode-verse="ਪੰਕਤੀ ਇੱਕ"><div class="gurlipi">pNqI ikk</div></div>' +
      '<div data-unicode-verse="ਪੰਕਤੀ ਦੋ"><div class="gurlipi">pNqI do</div></div>' +
      '<div data-unicode-verse="ਪੰਕਤੀ ਤਿੰਨ"><div class="gurlipi">pNqI qinn</div></div>' +
      '</div>';
    const gurlipiLines = document.querySelectorAll('.gurlipi');
    const first = gurlipiLines[0];
    const third = gurlipiLines[2];

    expect(
      getUnicodeCopyText({
        unicodeMode: false,
        selection: selectionLike(rangeBetween(first, third)),
      })
    ).toBe('ਪੰਕਤੀ ਇੱਕ\nਪੰਕਤੀ ਦੋ\nਪੰਕਤੀ ਤਿੰਨ');
  });

  it('does not rewrite copies made entirely outside GurbaniLipi', () => {
    document.body.innerHTML =
      '<div data-unicode-verse="ਸਾਰਗ"><div class="translation">Saarang</div></div>';
    const translation = document.querySelector('.translation') as Element;

    expect(
      getUnicodeCopyText({
        unicodeMode: false,
        selection: selectionLike(rangeBetween(translation, translation)),
      })
    ).toBeNull();
  });

  it('falls back to the focus line when the anchor is outside GurbaniLipi', () => {
    document.body.innerHTML =
      '<div id="shabad">' +
      '<div data-unicode-verse="ਸਾਰਗ"><div class="gurlipi">swrg</div></div>' +
      '<div class="translation">Saarang</div>' +
      '</div>';
    const gurbani = document.querySelector('.gurlipi') as Element;
    const translation = document.querySelector('.translation') as Element;
    const range = document.createRange();
    range.setStart(translation.firstChild as Node, 0);
    range.setEnd(gurbani.firstChild as Node, textLength(gurbani));

    expect(
      getUnicodeCopyText({
        unicodeMode: false,
        selection: selectionLike(range),
      })
    ).toBe('ਸਾਰਗ');
  });
});
