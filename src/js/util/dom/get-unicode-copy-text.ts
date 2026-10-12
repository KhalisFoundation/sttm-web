const LINE_SELECTOR = '[data-unicode-verse]';
const GURLIPI_SELECTOR = '.gurlipi, .gurlipi-reading-mode';
const BLOCK_TAGS = /^(DIV|P|BLOCKQUOTE|LI|UL|OL|SECTION|ARTICLE|H[1-6]|BR)$/;

interface SelectionLike {
  isCollapsed: boolean;
  rangeCount: number;
  getRangeAt(index: number): Range;
}

const toElement = (node: Node | null): Element | null => {
  if (!node) {
    return null;
  }
  return node.nodeType === Node.ELEMENT_NODE
    ? (node as Element)
    : node.parentElement;
};

// The element holding a line's GurbaniLipi text: the line itself in reading
// mode, a child otherwise.
const gurlipiOf = (line: Element): Element | null =>
  line.matches(GURLIPI_SELECTOR) ? line : line.querySelector(GURLIPI_SELECTOR);

/**
 * The unicode for the part of a line the range covers. GurbaniLipi and unicode
 * words line up one to one, so the selected words are picked by position; a
 * half-selected word counts as selected.
 */
const getSelectedUnicode = (line: Element, range: Range): string => {
  const gurlipi = gurlipiOf(line);
  const unicode = (line.getAttribute('data-unicode-verse') || '').trim();

  if (!gurlipi || !unicode) {
    return '';
  }

  const selected = document.createRange();
  selected.selectNodeContents(gurlipi);
  const before = document.createRange();
  before.selectNodeContents(gurlipi);
  before.collapse(true);

  if (range.compareBoundaryPoints(Range.START_TO_START, selected) > 0) {
    selected.setStart(range.startContainer, range.startOffset);
    before.setEnd(range.startContainer, range.startOffset);
  }
  if (range.compareBoundaryPoints(Range.END_TO_END, selected) < 0) {
    selected.setEnd(range.endContainer, range.endOffset);
  }

  const selectedText = selected.toString();
  if (!selectedText.trim()) {
    return '';
  }

  const start = before.toString().length;
  const end = start + selectedText.length;
  const unicodeWords = unicode.split(/\s+/);
  const selectedIndexes: number[] = [];
  let wordCount = 0;

  (gurlipi.textContent || '').replace(/\S+/g, (word, offset: number) => {
    if (offset < end && offset + word.length > start) {
      selectedIndexes.push(wordCount);
    }
    wordCount += 1;
    return word;
  });

  // Larivaar and similar displays don't split into the same words.
  if (wordCount !== unicodeWords.length || selectedIndexes.length === 0) {
    return unicode;
  }

  return unicodeWords
    .slice(selectedIndexes[0], selectedIndexes[selectedIndexes.length - 1] + 1)
    .join(' ');
};

// jsdom has no innerText; this keeps one block per line the same way.
const getBlockText = (node: Node): string => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent || '';
  }
  const text = Array.from(node.childNodes).map(getBlockText).join('');
  return BLOCK_TAGS.test((node as Element).tagName || '') ? `\n${text}\n` : text;
};

// The text a copy of this markup would produce, one block per line.
const getCopiedText = (container: HTMLElement): string => {
  container.style.cssText = 'position:fixed;left:-99999px;top:0;';
  document.body.appendChild(container);
  const text =
    typeof container.innerText === 'string'
      ? container.innerText
      : getBlockText(container);
  document.body.removeChild(container);

  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
};

/**
 * When Gurbani is shown in ASCII/GurbaniLipi, native copy grabs those glyphs
 * (#1802). Returns the selection's text with the GurbaniLipi parts swapped for
 * unicode and everything else (transliterations, translations) kept as
 * selected.
 *
 * Returns null, leaving the native copy untouched, when Unicode mode is on,
 * nothing is selected, or the selection has no GurbaniLipi in it.
 */
export const getUnicodeCopyText = ({
  unicodeMode,
  selection,
}: {
  unicodeMode: boolean;
  selection: SelectionLike | null;
}): string | null => {
  if (
    unicodeMode ||
    !selection ||
    selection.isCollapsed ||
    !selection.rangeCount
  ) {
    return null;
  }

  let range: Range;
  try {
    range = selection.getRangeAt(0);
  } catch {
    return null;
  }

  const scope = toElement(range.commonAncestorContainer);
  if (!scope) {
    return null;
  }

  // The whole selection sits inside one line.
  const ownLine = scope.closest(LINE_SELECTOR);
  if (ownLine) {
    return getSelectedUnicode(ownLine, range) || null;
  }

  const lines = Array.from(scope.querySelectorAll(LINE_SELECTOR)).filter(
    (line) => range.intersectsNode(line)
  );
  const unicodeParts = lines.map((line) => getSelectedUnicode(line, range));

  if (!unicodeParts.some(Boolean)) {
    return null;
  }

  const container = document.createElement('div');
  container.appendChild(range.cloneContents());
  const copiedLines = Array.from(container.querySelectorAll(LINE_SELECTOR));

  // The copy should mirror the selection line for line; if it doesn't, let
  // the browser copy rather than guess.
  if (copiedLines.length !== lines.length) {
    return null;
  }

  copiedLines.forEach((copiedLine, index) => {
    const gurlipi = gurlipiOf(copiedLine);
    if (gurlipi) {
      gurlipi.textContent = unicodeParts[index];
    }
  });

  return getCopiedText(container) || null;
};
