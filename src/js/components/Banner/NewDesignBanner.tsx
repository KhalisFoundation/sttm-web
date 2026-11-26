import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from './Banner';
import {
  NEW_DESIGN_HOST,
  newDesignPath,
  rememberNewDesign,
} from '../../util/design-preference';

const SESSION_STORAGE_KEY = 'newDesignBannerDismissed';

const getIsDismissed = () => {
  try {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const NewDesignBanner = () => {
  const [isDismissed, setIsDismissed] = useState(getIsDismissed);
  // Open the page being viewed in the new design, not its home page.
  const location = useLocation();

  if (isDismissed) return null;

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    } catch {
      // ignore storage errors, still dismiss for this render
    }
    setIsDismissed(true);
  };

  return (
    <Banner
      banner={{
        message: 'A new SikhiToTheMax experience is here — faster, cleaner, and powered by Khalis AI.',
        link: `${NEW_DESIGN_HOST}${newDesignPath(location)}`,
        label: 'Try the new design',
        type: '3',
        classes: { notification: 'notification-new-design' },
      }}
      onCrossIconClick={handleDismiss}
      // Opting in here must remember the choice too, or the old site never
      // redirects. Same tab, like the home page's "Try it now" link (#151).
      onLinkClick={rememberNewDesign}
      sameTab
    />
  );
};

export default NewDesignBanner;
