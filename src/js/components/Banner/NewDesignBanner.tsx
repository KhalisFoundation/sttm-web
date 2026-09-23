import React, { useState } from 'react';
import Banner from './Banner';
import { rememberNewDesign } from '../../util/design-preference';

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
        link: 'next.sikhitothemax.org',
        label: 'Try the new design',
        type: '3',
        classes: { notification: 'notification-new-design' },
      }}
      onCrossIconClick={handleDismiss}
      // Opting in here must remember the choice too, or the old site never
      // redirects (same as the home page's "Try it now" link, #151).
      onLinkClick={rememberNewDesign}
    />
  );
};

export default NewDesignBanner;
