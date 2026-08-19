const GURLIPI_SELECTOR = '.gurlipi, .gurlipi-reading-mode';

const unicodeFromNode = (node: Node | null): string | null => {
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

  const line = element.closest('[data-unicode-verse]');
  const unicode = line && line.getAttribute('data-unicode-verse');

  return unicode || null;
};

/**
 * When Gurbani is shown in ASCII/GurbaniLipi, native copy grabs those
 * glyphs. Return the pankti's unicode instead (#1802).
 */
export const getUnicodeCopyText = ({
  unicodeMode,
  selectionAnchorNode,
  selectionFocusNode = null,
}: {
  unicodeMode: boolean;
  selectionAnchorNode: Node | null;
  selectionFocusNode?: Node | null;
}): string | null => {
  if (unicodeMode) {
    return null;
  }

  return (
    unicodeFromNode(selectionAnchorNode) ||
    unicodeFromNode(selectionFocusNode)
  );
};
