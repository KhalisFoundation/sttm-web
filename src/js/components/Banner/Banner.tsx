import React from 'react';
import { Link } from 'react-router-dom';

import CrossIcon from '../Icons/Times';

export const updateLastSeen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.currentTarget.parentElement?.remove();
  sessionStorage.setItem("bannerMessage", "seen");
};

type Props = {
  banner: {
    type: string;
    message: string;
    label?: string;
    link?: string;
    classes?: {
      notification?: string;
    };
    disabled?: boolean;
  },
  onCrossIconClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Banner = (props: Props) => {
  const handleBannerCrossClick = props.onCrossIconClick ?? updateLastSeen;
  if (props.banner.disabled) return null;
  return (
    <div className="banner-container">
      <div className={`notification type-${props.banner.type} ${props.banner.classes?.notification}`}>
        <div className='banner-text-container'>
          <div className="banner-text">
            <span className="banner-title">{props.banner.message}</span>
          </div>
          {props.banner.label &&
            <button className={`banner-link-button type-${props.banner.type}`}>
              <Link
                className="banner-link-button-text"
                to={{ pathname: `https://${props.banner.link}` }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.banner.label}
              </Link>
            </button>}
        </div>
        <button className="banner-cross-bg" onClick={(e) => handleBannerCrossClick(e)}>
          <CrossIcon className="banner-cross" />
        </button>
      </div>
    </div>
  )
}

export default Banner;