import React from 'react';
import CrossIcon from '../Icons/Times';

const Banner: React.FC = () => {
  const response = {
    active: true,
    data: {
      message: 'Website is down',
      type: 1
    }
  }
  const lastSeen = sessionStorage.getItem("urgentMessage");
  const updateLastSeen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.parentElement.remove();
    sessionStorage.setItem("urgentMessage", "seen");
  };


  if (!response.active || lastSeen === 'seen') {
    return null
  }

  return (
    <div className="banner">
      <div className={`notification type-${response.data.type}`}>
        <div className="banner-text">
          <span className="banner-title">{response.data.message}</span>
        </div>
        <button className="banner-cross-bg" onClick={(e) => updateLastSeen(e)}>
          <CrossIcon className="banner-cross" />
        </button>
      </div>
    </div>
  )
}

export default Banner;
