const GURLIPI_SELECTOR = '.gurlipi, .gurlipi-reading-mode';

interface SelectionLike {
  anchorNode: Node | null;
  focusNode: Node | null;
  isCollapsed: boolean;
  rangeCount: number;
  getRangeAt(index: number): Range;
}

const gurbaniLineFromNode = (node: Node | null): Element | null => {
  if (!node) {
    return null;
  }

  const element =
    node.nodeType === Node.TEXT_NODE
      ? node.parentElement
      : (node as Element);

  if (!element || typeof element.closest !== 'function') {
    return null;
  }

  if (!element.closest(GURLIPI_SELECTOR)) {
    return null;
  }

  return element.closest('[data-unicode-verse]');
};

/**
 * When Gurbani is shown in ASCII/GurbaniLipi, native copy grabs those
 * glyphs. Return the selected panktis' unicode instead (#1802).
 *
 * Returns null (leaving the native copy untouched) when Unicode mode is on,
 * nothing is visibly selected, or the selection does not start or end inside
 * a GurbaniLipi line - e.g. copies of translations.
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

  const startLine = gurbaniLineFromNode(selection.anchorNode);
  const endLine = gurbaniLineFromNode(selection.focusNode);

  if (!startLine && !endLine) {
    return null;
  }

  let range: Range;
  try {
    range = selection.getRangeAt(0);
  } catch {
    return null;
  }

  const ancestor = range.commonAncestorContainer;
  const scope =
    ancestor.nodeType === Node.TEXT_NODE
      ? ancestor.parentElement
      : (ancestor as Element);

  const selectedLines = scope
    ? Array.from(scope.querySelectorAll('[data-unicode-verse]')).filter(
        (line) => range.intersectsNode(line)
      )
    : [];

  if (selectedLines.length === 0) {
    const fallbackLine = startLine || endLine;
    return fallbackLine
      ? fallbackLine.getAttribute('data-unicode-verse')
      : null;
  }

  const seen = new Set<string>();
  const parts: string[] = [];
  for (const line of selectedLines) {
    const unicode = line.getAttribute('data-unicode-verse');
    if (unicode && !seen.has(unicode)) {
      seen.add(unicode);
      parts.push(unicode);
    }
  }

  return parts.length > 0 ? parts.join('\n') : null;
};
