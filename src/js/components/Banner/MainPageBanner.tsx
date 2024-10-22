import React from 'react';
import { useFetchData } from '@/hooks';
import Banner from './Banner';

interface Props {
  onCrossIconClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BASE_URL = "https://sttm.s3.us-west-2.amazonaws.com/urgent-message.json";
const lastSeen = sessionStorage.getItem("bannerMessage");

const MainPageBanner = (props: Props) => {
  const {
    isFetchingData: isFetchingBannerMessage,
    data: bannerData,
  } = useFetchData(BASE_URL);

  if (isFetchingBannerMessage || !bannerData.active || !bannerData.data || lastSeen === 'seen') {
    return null
  }

  return (
    <Banner
      banner={bannerData.data}
      onCrossIconClick={props.onCrossIconClick}
    />
  )
}

export default MainPageBanner;
