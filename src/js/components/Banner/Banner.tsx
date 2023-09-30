import React from 'react';
import CrossIcon from '../Icons/Times';
import { Link } from 'react-router-dom';
import { useFetchData } from '@/hooks';

const Banner = () => {
  const url = "https://sttm.s3.us-west-2.amazonaws.com/urgent-message.json";

  const {
    isFetchingData: isFetchingBannerMessage,
    data: bannerMessage,
  } = useFetchData(url);

  const lastSeen = sessionStorage.getItem("bannerMessage");
  const updateLastSeen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.parentElement?.remove();
    sessionStorage.setItem("bannerMessage", "seen");
  };

  if (isFetchingBannerMessage || !bannerMessage.active || lastSeen === 'seen') {
    return null
  }

  return (
    <div className="banner-container">
      <div className={`notification type-${bannerMessage.data.type}`}>
        <div className='banner-text-container'>
          <div className="banner-text">
            <span className="banner-title">{bannerMessage.data.message}</span>
          </div>
          {bannerMessage.data?.label &&
            <button className={`banner-link-button type-${bannerMessage.data.type}`}>
              <Link
                className="banner-link-button-text"
                to={{ pathname: `https://${bannerMessage.data?.link}` }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {bannerMessage.data?.label}
              </Link>
            </button>}
        </div>
        <button className="banner-cross-bg" onClick={(e) => updateLastSeen(e)}>
          <CrossIcon className="banner-cross" />
        </button>
      </div>
    </div>
  )
}

export default Banner;
