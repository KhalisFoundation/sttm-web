const getFormattedShabads = (shabads, favShabads) => {
  const getFavShabad = (shabadId) => favShabads.find(shabad => shabad.shabadId === shabadId)
  const formattedShabads = shabads.map(shabad => {
    return {...shabad, ...getFavShabad(shabad.shabadInfo.shabadId)}
  })
  return formattedShabads;
};

export default getFormattedShabads;
