import React from 'react';
import { useFetchData } from '@/hooks';
import Banner from './Banner';

const BASE_URL = "https://sttm.s3.us-west-2.amazonaws.com/urgent-message.json";

const MainPageBanner = () => {

  const {
    isFetchingData: isFetchingBannerMessage,
    data: bannerData,
  } = useFetchData(BASE_URL);

  const lastSeen = sessionStorage.getItem("bannerMessage");
  const updateLastSeen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.parentElement?.remove();
    sessionStorage.setItem("bannerMessage", "seen");
  };

  if (isFetchingBannerMessage || !bannerData.active || lastSeen === 'seen') {
    return null
  }

  return (
    <Banner 
      banner={bannerData.data}
      onCrossIconClick={updateLastSeen}
    />
  )
}

export default MainPageBanner;
