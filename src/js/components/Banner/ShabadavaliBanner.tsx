import React from 'react';
import Banner from './Banner';

const ShabadavaliBanner = () => {
  const bannerData = {
    message: "Help us preserve the Punjabi language! Donate on Dasvandh Network and double your impact with matching!",
    link: "dvnetwork.org/learnpunjabi",
    label: "Donate now",
    type: "3",
  };

  const lastSeen = sessionStorage.getItem("shbdvliBannerMsg");
  const updateLastSeen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.parentElement?.remove();
    sessionStorage.setItem("shbdvliBannerMsg", "seen");
  };

  if (!bannerData || lastSeen === 'seen') {
    return null
  }

  return (
    <Banner 
      banner={bannerData}
      onCrossIconClick={updateLastSeen}
    />
  )
}

export default ShabadavaliBanner;
