type FavouriteVerse = {
  verseId?: string | number;
  verse?: {
    unicode?: string;
    gurmukhi?: string;
  };
};

export const getFavouriteVerseOptions = (gurbaniVerses: unknown) => {
  if (!Array.isArray(gurbaniVerses)) {
    return [];
  }

  return (gurbaniVerses as FavouriteVerse[])
    .filter((verse) => verse && verse.verse && verse.verseId != null)
    .map((verse) => ({
      label: verse.verse.unicode || verse.verse.gurmukhi || String(verse.verseId),
      value: verse.verseId,
    }));
};
