import { getUnicodeCopyText } from '../get-unicode-copy-text';

// One verse as the shabad page renders it with Unicode display off: the
// GurbaniLipi words in their own spans, then transliteration and translation.
const verse = (gurlipi: string, unicode: string, english: string) =>
  `<div class="verse">` +
  `<div data-unicode-verse="${unicode}">\n<div class="gurlipi">` +
  gurlipi
    .split(' ')
    .map((word) => `<span>${word} </span>`)
    .join('') +
  `</div></div>` +
  `<div class="transliteration">${english.toLowerCase()}</div>` +
  `<blockquote class="translation">${english}</blockquote>` +
  `</div>`;

const render = (...verses: string[]) => {
  document.body.innerHTML = `<div id="shabad">${verses.join('')}</div>`;
};

const textNodes = (element: Element): Text[] => {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    if ((node.textContent || '').trim()) {
      nodes.push(node as Text);
    }
    node = walker.nextNode();
  }
  return nodes;
};

// A selection from the start of `from` to the end of `to`.
const select = (from: Element, to: Element = from) => {
  const first = textNodes(from)[0];
  const last = textNodes(to).slice(-1)[0];
  const range = document.createRange();
  range.setStart(first, 0);
  range.setEnd(last, (last.textContent || '').length);
  return { isCollapsed: false, rangeCount: 1, getRangeAt: () => range };
};

const copy = (selection: ReturnType<typeof select>) =>
  getUnicodeCopyText({ unicodeMode: false, selection });

const FIRST = verse('Awid scu jugwid scu ]', 'ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥', 'True In The Beginning');
const SECOND = verse('hY BI scu ]1]', 'ਹੈ ਭੀ ਸਚੁ ॥੧॥', 'True Here And Now');

describe('getUnicodeCopyText()', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns null when unicode display mode is on', () => {
    render(FIRST);
    const selection = select(document.querySelector('.gurlipi') as Element);

    expect(getUnicodeCopyText({ unicodeMode: true, selection })).toBeNull();
  });

  it('returns null for a collapsed or empty selection', () => {
    render(FIRST);
    const selection = select(document.querySelector('.gurlipi') as Element);

    expect(copy({ ...selection, isCollapsed: true })).toBeNull();
    expect(copy({ ...selection, rangeCount: 0 })).toBeNull();
    expect(getUnicodeCopyText({ unicodeMode: false, selection: null })).toBeNull();
  });

  it('returns the unicode of a selected GurbaniLipi pankti', () => {
    render(FIRST);

    expect(copy(select(document.querySelector('.gurlipi') as Element))).toBe(
      'ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥'
    );
  });

  it('returns only the selected words of a pankti', () => {
    render(FIRST);
    const words = document.querySelectorAll('.gurlipi span');

    expect(copy(select(words[1], words[2]))).toBe('ਸਚੁ ਜੁਗਾਦਿ');
  });

  it('counts a half-selected word as selected', () => {
    render(FIRST);
    const words = document.querySelectorAll('.gurlipi span');
    const range = document.createRange();
    range.setStart(textNodes(words[0])[0], 2); // "id " of "Awid "
    range.setEnd(textNodes(words[1])[0], 1); // "s" of "scu "

    expect(
      copy({ isCollapsed: false, rangeCount: 1, getRangeAt: () => range })
    ).toBe('ਆਦਿ ਸਚੁ');
  });

  it('keeps the transliteration and translation selected with a pankti', () => {
    render(FIRST);

    expect(
      copy(
        select(
          document.querySelector('.gurlipi') as Element,
          document.querySelector('.translation') as Element
        )
      )
    ).toBe(
      ['ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥', 'true in the beginning', 'True In The Beginning'].join('\n')
    );
  });

  it('keeps everything selected between two panktis', () => {
    render(FIRST, SECOND);
    const gurlipiLines = document.querySelectorAll('.gurlipi');

    expect(copy(select(gurlipiLines[0], gurlipiLines[1]))).toBe(
      [
        'ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥',
        'true in the beginning',
        'True In The Beginning',
        'ਹੈ ਭੀ ਸਚੁ ॥੧॥',
      ].join('\n')
    );
  });

  it('keeps a pankti that repeats', () => {
    render(FIRST, SECOND, FIRST);
    const gurlipiLines = document.querySelectorAll('.gurlipi');

    const copied = copy(select(gurlipiLines[0], gurlipiLines[2])) as string;

    expect(copied.split('\n').filter((line) => line === 'ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥')).toHaveLength(2);
  });

  it('does not rewrite copies made entirely outside GurbaniLipi', () => {
    render(FIRST);

    expect(copy(select(document.querySelector('.translation') as Element))).toBeNull();
  });

  it('supports reading-mode lines', () => {
    document.body.innerHTML =
      '<div data-unicode-verse="ਸਾਰਗ ਮਹਲਾ ੫ ॥" class="gurlipi-reading-mode"><span>swrg </span><span>mhlw </span><span>5 </span><span>]</span></div>';
    const words = document.querySelectorAll('span');

    expect(copy(select(document.querySelector('.gurlipi-reading-mode') as Element))).toBe(
      'ਸਾਰਗ ਮਹਲਾ ੫ ॥'
    );
    expect(copy(select(words[0], words[1]))).toBe('ਸਾਰਗ ਮਹਲਾ');
  });

  it('copies the whole pankti when its words cannot be matched up', () => {
    // Larivaar: no spaces between the words.
    document.body.innerHTML =
      '<div data-unicode-verse="ਆਦਿ ਸਚੁ ॥"><div class="gurlipi larivaar"><span>Awid</span><span>scu</span><span>]</span></div></div>';
    const words = document.querySelectorAll('span');

    expect(copy(select(words[0]))).toBe('ਆਦਿ ਸਚੁ ॥');
  });
});
