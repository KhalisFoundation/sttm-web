const convertApiDataToFavoriteShabad = (apiShabadData: any) => {
  const favouriteShabad = {
    ...apiShabadData.shabadInfo,
    ...apiShabadData.verses[0],
  };

  console.log(apiShabadData, favouriteShabad, 'API SHABAD DATA...');

  return favouriteShabad;
};

export default convertApiDataToFavoriteShabad;
