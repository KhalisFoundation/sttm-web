import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { isMobile, isAndroid, isIOS } from 'react-device-detect';
import { clickEvent, ACTIONS } from '../../util/analytics';

interface SmartBannerProps {
  title: string;
  author?: string;
  price?: string;
  iconApple?: string;
  iconGoogle?: string;
  buttonUrlApple?: string;
  buttonUrlGoogle?: string;
  closeText?: string;
  hideTtl?: number;
  hidePath?: string;
}

const SmartBanner: React.FC<SmartBannerProps> = ({
  title,
  author,
  price = 'FREE',
  iconApple,
  iconGoogle,
  buttonUrlApple,
  buttonUrlGoogle,
  closeText = 'Close',
  hideTtl,
  hidePath,
}) => {
  const [cookies, setCookie] = useCookies(['smartbanner_exited']);
  const [showBanner, setShowBanner] = useState(false);

  const getStoreUrlsFromMetaTags = () => {
    const appleMeta = document.querySelector('meta[name="apple-itunes-app"]');
    const googleMeta = document.querySelector('meta[name="google-play-app"]');

    let appleUrl = buttonUrlApple;
    let googleUrl = buttonUrlGoogle;

    if (!appleUrl && appleMeta?.getAttribute('content')) {
      const appId = appleMeta.getAttribute('content')?.replace('app-id=', '');
      if (appId) {
        appleUrl = `https://apps.apple.com/app/id${appId}`;
      }
    }

    if (!googleUrl && googleMeta?.getAttribute('content')) {
      const appId = googleMeta.getAttribute('content')?.replace('app-id=', '');
      if (appId) {
        googleUrl = `https://play.google.com/store/apps/details?id=${appId}`;
      }
    }

    return { appleUrl, googleUrl };
  };

  const getIconsFromMetaTags = () => {
    let appleIcon = iconApple;
    let googleIcon = iconGoogle;

    if (!appleIcon) {
      const appleTouchIcon = document.querySelector(
        'link[rel="apple-touch-icon"]'
      );
      if (appleTouchIcon?.getAttribute('href')) {
        appleIcon = appleTouchIcon.getAttribute('href') || undefined;
      }
    }

    if (!googleIcon) {
      const androidTouchIcon = document.querySelector(
        'link[rel="android-touch-icon"]'
      );
      if (androidTouchIcon?.getAttribute('href')) {
        googleIcon = androidTouchIcon.getAttribute('href') || undefined;
      }
    }

    return { appleIcon, googleIcon };
  };

  useEffect(() => {
    const shouldShowBanner = () => {
      if (!isMobile || cookies.smartbanner_exited === '1') return false;

      const { appleUrl, googleUrl } = getStoreUrlsFromMetaTags();

      if (isAndroid && !googleUrl) return false;
      if (isIOS && !appleUrl) return false;

      return true;
    };

    setShowBanner(shouldShowBanner());
  }, [cookies.smartbanner_exited, buttonUrlApple, buttonUrlGoogle]);

  const handleClose = () => {
    setShowBanner(false);

    const cookieOptions: any = {
      path: hidePath || '/',
    };

    if (hideTtl) {
      const expires = new Date();
      expires.setTime(expires.getTime() + hideTtl);
      cookieOptions.expires = expires;
    }

    setCookie('smartbanner_exited', '1', cookieOptions);
  };

  const handleInstall = () => {
    // Track smart banner install click
    clickEvent({
      action: ACTIONS.SMART_BANNER_INSTALL,
      label: `${platform}-${title}`,
    });

    console.log('Smart banner install clicked');
  };

  if (!showBanner) {
    return null;
  }

  const platform = isAndroid ? 'android' : 'ios';
  const { appleIcon, googleIcon } = getIconsFromMetaTags();
  const { appleUrl, googleUrl } = getStoreUrlsFromMetaTags();

  const icon = isAndroid ? googleIcon : appleIcon;
  const buttonUrl = isAndroid ? googleUrl : appleUrl;
  const buttonLabel = 'Download now';

  return (
    <div className={`smartbanner smartbanner--${platform}`}>
      <button
        className="smartbanner__exit"
        onClick={handleClose}
        title={closeText}
        aria-label={closeText}
      >
        ×
      </button>

      {icon && (
        <div
          className="smartbanner__icon"
          style={{ backgroundImage: `url(${icon})` }}
        />
      )}

      <div className="smartbanner__info">
        <div className="smartbanner__info__title">{title}</div>
        {author && <div className="smartbanner__info__author">{author}</div>}
        <div className="smartbanner__info__price">{price}</div>
      </div>

      <a
        href={buttonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="smartbanner__button"
        onClick={handleInstall}
        aria-label={buttonLabel}
      >
        <span className="smartbanner__button__label">{buttonLabel}</span>
      </a>
    </div>
  );
};

export default SmartBanner;
