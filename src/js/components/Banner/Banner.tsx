import React from 'react';
import CrossIcon from '../Icons/Times';
import { Link } from 'react-router-dom';

type Props = {
  banner?: {
    type: string;
    message: string;
    label?: string;
    link?: string;
  },
  onCrossIconClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Banner = (props: Props) => {
  const banner = props.banner;
  return (
    <div className="banner-container">
      <div className={`notification type-${banner?.type}`}>
        <div className='banner-text-container'>
          <div className="banner-text">
            <span className="banner-title">{banner?.message}</span>
          </div>
          {banner?.label &&
            <button className={`banner-link-button type-${banner?.type}`}>
              <Link
                className="banner-link-button-text"
                to={{ pathname: `https://${banner?.link}` }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {banner?.label}
              </Link>
            </button>}
        </div>
        <button className="banner-cross-bg" onClick={(e) => props.onCrossIconClick?.(e)}>
          <CrossIcon className="banner-cross" />
        </button>
      </div>
    </div>
  )
}

export default Banner;