/**
 * Convert a translation/steek/transliteration value into clipboard-safe text.
 * Punjabi steeks are `{ unicode, gurmukhi }` objects; joining them produces
 * "[object Object]" (see #1834).
 */
export const toPlainShareText = (value: unknown): string => {
  if (value == null) {
    return '';
  }

  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (typeof value === 'object') {
    const record = value as { unicode?: unknown; gurmukhi?: unknown };

    if (typeof record.unicode === 'string' && record.unicode.trim()) {
      return record.unicode.trim();
    }

    if (typeof record.gurmukhi === 'string' && record.gurmukhi.trim()) {
      return record.gurmukhi.trim();
    }
  }

  return '';
};
