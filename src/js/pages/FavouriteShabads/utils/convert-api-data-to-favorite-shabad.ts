const convertApiDataToFavoriteShabad = (apiShabadData: any) => {
  const verseId = apiShabadData.verses.find(v=> v.verseId === apiShabadData.verse_id)
  const favouriteShabad = {
    ...apiShabadData.shabadInfo,
    ...(verseId ?? apiShabadData.verses[0]),
      comment: apiShabadData.comment,
      createdAt: apiShabadData.created_at,
  };
  return favouriteShabad;
};

export default convertApiDataToFavoriteShabad;
