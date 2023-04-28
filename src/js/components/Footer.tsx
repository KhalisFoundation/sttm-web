import React from 'react';

interface IProps {
  showPinSettings: boolean;
}

const Footer: React.FC = (props: IProps) => {

  const { showPinSettings } = props;

  return (
    <footer className={`footer-background ${showPinSettings ? 'pin-settings-footer' : ''}`}>
      <div className="footer row">
        <ul className="version">
          <li>
            <a
              href="https://github.com/KhalisFoundation/sttm-web/releases"
              target="_blank"
              rel="noopener noreferrer"
            >v{process.env.npm_package_version}</a>
          </li>
        </ul>
        <ul className="menu footer-menu">
          <li>
            <a
              href="http://support.khalisfoundation.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Help
            </a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a
              href="http://support.khalisfoundation.org/support/tickets/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feedback
            </a>
          </li>
          <li>
            <a href="/terms-of-service">Legal</a>
          </li>
          <li>
            <a
              href="https://khalisfoundation.org/donate/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate
            </a>
          </li>
          <li>
            <span className="footer-seperator">|</span>
          </li>
          <li>
            <a
              className="download-icon"
              target="_blank"
              rel="noopener noreferrer"
              href="https://khalisfoundation.org/portfolio/sikhitothemax/"
            >
              <img src="/assets/images/app-desktop.png" alt="Desktop icon" />
            </a>
          </li>
          <li>
            <a
              className="download-icon"
              target="_blank"
              rel="noopener noreferrer"
              href="https://apps.apple.com/us/app/sikhitothemax/id1370303478"
            >
              <img src="/assets/images/app-ios.png" alt="iOS icon" />
            </a>
          </li>
          <li>
            <a
              className="download-icon"
              target="_blank"
              rel="noopener noreferrer"
              href="https://play.google.com/store/apps/details?id=com.nest.sttm&hl=en_US"
            >
              <img src="/assets/images/app-android.png" alt="Android icon" />
            </a>
          </li>
        </ul>
        <div className="copyright">
          Copyright © <span id="year">{new Date().getFullYear()}</span> Khalis Foundation
          <span>, SikhiToTheMax Trademark SHARE Charity, UK</span>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
