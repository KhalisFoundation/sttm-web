import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CookiesProvider } from 'react-cookie';
import SmartBanner from '../SmartBanner/index';
import '@testing-library/jest-dom';

// Mock react-device-detect
jest.mock('react-device-detect', () => ({
  isMobile: true,
  isAndroid: true,
  isIOS: false,
}));

const renderWithCookies = (component: React.ReactElement) => {
  return render(<CookiesProvider>{component}</CookiesProvider>);
};

// Helper to setup meta tags
const setupMetaTags = (
  appleAppId?: string,
  googleAppId?: string,
  iconPath?: string
) => {
  // Remove existing meta tags
  document
    .querySelectorAll(
      'meta[name="apple-itunes-app"], meta[name="google-play-app"]'
    )
    .forEach((el) => el.remove());
  document
    .querySelectorAll(
      'link[rel="apple-touch-icon"], link[rel="android-touch-icon"]'
    )
    .forEach((el) => el.remove());

  if (appleAppId) {
    const meta = document.createElement('meta');
    meta.name = 'apple-itunes-app';
    meta.content = `app-id=${appleAppId}`;
    document.head.appendChild(meta);
  }

  if (googleAppId) {
    const meta = document.createElement('meta');
    meta.name = 'google-play-app';
    meta.content = `app-id=${googleAppId}`;
    document.head.appendChild(meta);
  }

  if (iconPath) {
    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = iconPath;
    document.head.appendChild(appleIcon);

    const androidIcon = document.createElement('link');
    androidIcon.rel = 'android-touch-icon';
    androidIcon.href = iconPath;
    document.head.appendChild(androidIcon);
  }
};

describe('SmartBanner', () => {
  beforeEach(() => {
    // Clear cookies before each test
    document.cookie =
      'smartbanner_exited=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

    // Setup default meta tags for testing
    setupMetaTags(
      '1393849213',
      'com.KhalisFoundation.AmritKeertan',
      '/assets/images/amrit-keertan-icon.png'
    );
  });

  afterEach(() => {
    // Clean up meta tags
    document
      .querySelectorAll(
        'meta[name="apple-itunes-app"], meta[name="google-play-app"]'
      )
      .forEach((el) => el.remove());
    document
      .querySelectorAll(
        'link[rel="apple-touch-icon"], link[rel="android-touch-icon"]'
      )
      .forEach((el) => el.remove());
  });

  it('renders on mobile Android device using meta tags', () => {
    renderWithCookies(<SmartBanner title="Test App" />);

    expect(screen.getByText('Test App')).toBeInTheDocument();
    expect(screen.getByText('Download now')).toBeInTheDocument();
  });

  it('shows app icon from meta tags when provided', () => {
    renderWithCookies(<SmartBanner title="Test App" />);

    const icon = document.querySelector('.smartbanner__icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle(
      'background-image: url(/assets/images/amrit-keertan-icon.png)'
    );
  });

  it('shows author when provided', () => {
    renderWithCookies(<SmartBanner title="Test App" author="Test Developer" />);

    expect(screen.getByText('Test Developer')).toBeInTheDocument();
  });

  it('shows custom price when provided', () => {
    renderWithCookies(<SmartBanner title="Test App" price="$2.99" />);

    expect(screen.getByText('$2.99')).toBeInTheDocument();
  });

  it('prioritizes props over meta tags', () => {
    renderWithCookies(
      <SmartBanner
        title="Test App"
        buttonUrlGoogle="https://play.google.com/store/apps/test"
        iconGoogle="https://example.com/custom-icon.png"
      />
    );

    const icon = document.querySelector('.smartbanner__icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle(
      'background-image: url(https://example.com/custom-icon.png)'
    );
  });

  it('does not render when no store URLs are available', () => {
    // Remove meta tags
    setupMetaTags();

    renderWithCookies(<SmartBanner title="Test App" />);

    expect(screen.queryByText('Test App')).not.toBeInTheDocument();
  });
});
