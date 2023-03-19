const convertApiDataToFavoriteShabad = (apiShabadData: any) => {
  const favouriteShabad = {
    ...apiShabadData.shabadInfo,
    ...apiShabadData.verses[0],
  };
  return favouriteShabad;
};

export default convertApiDataToFavoriteShabad;
