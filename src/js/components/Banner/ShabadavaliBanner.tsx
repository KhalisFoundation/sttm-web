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
        message: (
            <>
                Help preserve the Punjabi language by donating on <a href='https://dvnetwork.org/learnpunjabi'>dvnetwork.org/learnpunjabi</a>!{' '}
                Every dollar will be doubled = double impact!
            </>
        ),
        type: "2",
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
