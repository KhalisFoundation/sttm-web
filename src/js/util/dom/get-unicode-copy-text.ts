const GURLIPI_SELECTOR = '.gurlipi, .gurlipi-reading-mode';

/**
 * When Gurbani is shown in ASCII/GurbaniLipi, native copy grabs those
 * glyphs. Return the pankti's unicode instead (#1802).
 */
export const getUnicodeCopyText = ({
  unicodeMode,
  selectionAnchorNode,
}: {
  unicodeMode: boolean;
  selectionAnchorNode: Node | null;
}): string | null => {
  if (unicodeMode || !selectionAnchorNode) {
    return null;
  }

  const element =
    selectionAnchorNode.nodeType === Node.TEXT_NODE
      ? selectionAnchorNode.parentElement
      : (selectionAnchorNode as Element);

  if (!element || typeof element.closest !== 'function') {
    return null;
  }

  if (!element.closest(GURLIPI_SELECTOR)) {
    return null;
  }

  const line = element.closest('[data-unicode-verse]');
  const unicode = line && line.getAttribute('data-unicode-verse');

  return unicode || null;
};
