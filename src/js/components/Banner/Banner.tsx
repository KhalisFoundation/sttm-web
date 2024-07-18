import React from 'react';
import CrossIcon from '../Icons/Times';
import { Link } from 'react-router-dom';
import { useFetchData } from '@/hooks';

type Props = {
  banner?: {
    type: string;
    message: string;
  }
}

const BASE_URL = "https://sttm.s3.us-west-2.amazonaws.com/urgent-message.json";

const Banner = (props: Props) => {

  const {
    isFetchingData: isFetchingBannerMessage,
    data: bannerData,
  } = useFetchData(props.banner?.type ? '' : BASE_URL);

  const lastSeen = sessionStorage.getItem("bannerMessage");
  const updateLastSeen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.parentElement?.remove();
    sessionStorage.setItem("bannerMessage", "seen");
  };

  if (isFetchingBannerMessage || !bannerData.active || lastSeen === 'seen' || props.banner?.message) {
    return null
  }

  const banner = props.banner || bannerData;

  return (
    <div className="banner-container">
      <div className={`notification type-${banner.data.type}`}>
        <div className='banner-text-container'>
          <div className="banner-text">
            <span className="banner-title">{banner.data.message}</span>
          </div>
          {banner.data?.label &&
            <button className={`banner-link-button type-${banner.data.type}`}>
              <Link
                className="banner-link-button-text"
                to={{ pathname: `https://${banner.data?.link}` }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {banner.data?.label}
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
