import React from 'react';
import Banner from './Banner';

const ShabadavaliBanner = () => {

  const {
    isFetchingData: isFetchingBannerMessage,
    data: bannerData,
  } = {
    isFetchingData: false,
    data: {
      active: true,
      data: {
        message: "Help us preserve the Punjabi language! Donate on Dasvandh Network and double your impact with matching!",
        link: "dvnetwork.org/learnpunjabi",
        label: "Donate now",
        type: "3",
      }
    }
  };

  const lastSeen = sessionStorage.getItem("bannerMessage");
  const updateLastSeen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.parentElement?.remove();
    sessionStorage.setItem("bannerMessage", "seen");
  };

  if (isFetchingBannerMessage || !bannerData.active || !bannerData.data || lastSeen === 'seen') {
    return null
  }

  return (
    <Banner 
      banner={bannerData.data}
      onCrossIconClick={updateLastSeen}
    />
  )
}

export default ShabadavaliBanner;
