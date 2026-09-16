export const getMahankoshWordUrl = (apiUrl: string, word: unknown): string => {
  if (typeof word !== 'string') {
    return '';
  }

  const query = word.trim();

  if (!query) {
    return '';
  }

  return `${apiUrl}kosh/word/${encodeURIComponent(query)}`;
};
