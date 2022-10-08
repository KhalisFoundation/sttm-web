import React from 'react';
import CrossIcon from '../Icons/Times';
import { useFetchData } from '@/hooks';

const Banner: React.FC = () => {
  const url = "https://sttm.s3.us-west-2.amazonaws.com/urgent-message.json";

  const {
    isFetchingData: isFetchingBannerMessage,
    data: bannerMessage,
  } = useFetchData(url);

  const lastSeen = sessionStorage.getItem("bannerMessage");
  const updateLastSeen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.parentElement.remove();
    sessionStorage.setItem("bannerMessage", "seen");
  };

  if (isFetchingBannerMessage || !bannerMessage.active || lastSeen === 'seen') {
    return null
  }

  return (
    <div className="banner">
      <div className={`notification type-${bannerMessage.data.type}`}>
        <div className="banner-text">
          <span className="banner-title">{bannerMessage.data.message}</span>
        </div>
        <button className="banner-cross-bg" onClick={(e) => updateLastSeen(e)}>
          <CrossIcon className="banner-cross" />
        </button>
      </div>
    </div>
  )
}

export default Banner;
