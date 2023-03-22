const convertApiDataToFavoriteShabad = (apiShabadData: any) => {
  const favouriteShabad = {
    ...apiShabadData.shabadInfo,
    ...apiShabadData.verses[0],
      comment: apiShabadData.comment,
      createdAt: apiShabadData.created_at,
  };
  return favouriteShabad;
};

export default convertApiDataToFavoriteShabad;
