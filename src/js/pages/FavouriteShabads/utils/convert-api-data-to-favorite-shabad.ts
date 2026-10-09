const convertApiDataToFavoriteShabad = (apiShabadData: any) => {
  const verseId = apiShabadData.verses.find(v=> v.verseId === apiShabadData.verseId)
  const favouriteShabad = {
    ...apiShabadData.shabadInfo,
    ...(verseId ?? apiShabadData.verses[0]),
      comment: apiShabadData.comment,
      createdAt: apiShabadData.createdAt,
  };
  return favouriteShabad;
};

export default convertApiDataToFavoriteShabad;
