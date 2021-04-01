import React from 'react';
import PropTypes from 'prop-types';

import { showToast, copyToClipboard, shortenURL } from '../util';
import { TEXTS } from '../constants';
import { clickEvent, ACTIONS } from '../util/analytics';
import ShareIcon from './Icons/Share';
import EmbedIcon from './Icons/Embed';
import CopyAllIcon from './Icons/CopyAll';
import WhatsAppIcon from './Icons/WhatsApp';
import ClipboardIcon from './Icons/Clipboard';
import PrinterIcon from './Icons/Printer';
import { GearsIcon } from './Icons/CustomIcons';

const handleWhatsapp = () => {
  clickEvent({ action: ACTIONS.SHARE, label: 'whatsapp' });
  window.open(
    `whatsapp://send?text=${encodeURIComponent(
      shortenURL()
    )}%20${encodeURIComponent(document.title)}`
  );
  return false;
};

const copyShortUrl = () =>
  copyToClipboard(shortenURL())
    .then(() => showToast(TEXTS.LINK_COPIED))
    .then(() =>
      clickEvent({
        action: ACTIONS.COPY_SHORT_URL,
        label: shortenURL(),
      })
    )
    .catch(() => showToast(TEXTS.COPY_FAILURE));

export const supportedMedia = ['settings', 'print', 'copyAll', 'embed', 'whatsapp', 'copy'];

class ShareButtons extends React.PureComponent {
  static defaultProps = {
    media: ['whatsapp', 'copy'],
  };

  static propTypes = {
    location: PropTypes.object,
    media: PropTypes.arrayOf(PropTypes.oneOf(supportedMedia)),
    onEmbedClick: PropTypes.func,
    onCopyAllClick: PropTypes.func,
    toggleSettingsPanel: PropTypes.func,
    settingIdRef: PropTypes.object
  };

  static handleShare = () => {
    clickEvent({ action: ACTIONS.SHARE, label: 'web-share' });

    navigator.share({
      title: document.title,
      description: document
        .querySelector('meta[name="description"]')
        .getAttribute('content'),
      url: shortenURL(),
    });
  };

  render() {
    const { media, onEmbedClick, onCopyAllClick, toggleSettingsPanel, settingIdRef } = this.props;

    if (media.length === 0) {
      return null;
    }


    // TODO: Use array to generate this DOM

    const mediaMap = {
      embed: (
        <li key={0} className="show-on-desktop">
          <button onClick={onEmbedClick}>
            <EmbedIcon />
          </button>
        </li>
      ),
      copyAll: (
        <li key={1}>
          <button onClick={onCopyAllClick}>
            <CopyAllIcon />
          </button>
        </li>
      ),
      whatsapp: (
        <li key={2} className="show-on-mobile">
          <a title="Share on Whatsapp" onClick={handleWhatsapp}>
            <WhatsAppIcon />
            <span className="sr-only">Share on Whatsapp</span>
          </a>
        </li>
      ),
      copy: (
        <li key={3}>
          <a id="copy-short-url" className="copy" onClick={copyShortUrl}>
            <input
              className="short-url-input"
              type="text"
              value={shortenURL()}
              readOnly
            />
            <ClipboardIcon className="short-url-icon" />
            <span className="sr-only">Copy URL</span>
          </a>
        </li>
      ),
      print: (
        <li key={4}>
          <a id="print-shabad" onClick={window.print}>
            <PrinterIcon />
            <span className="sr-only">Print Shabad</span>
          </a>
        </li>
      ),
      settings: (
        <li key={5}>
          <a id="settings-icon" ref={settingIdRef} onClick={toggleSettingsPanel}>
            <GearsIcon />
            <span className="show-on-desktop settings-text-desktop">Settings</span>
          </a>
        </li>
      ),
    };

    if (window !== undefined && 'share' in window.navigator) {
      return (
        <div id="share-menu">
          <ul className="share-buttons">
            <li>
              <a title="Open Share Dialog" onClick={ShareButtons.handleShare}>
                <ShareIcon />
                <span className="sr-only">Open Share Dialog</span>
              </a>
              {media.map(item => (item === 'whatsapp' ? null : mediaMap[item]))}
            </li>
          </ul>
        </div>
      );
    }

    return (
      <div id="share-menu">
        <ul className="share-buttons">{media.map(item => mediaMap[item])}</ul>
      </div>
    );
  }
}

export default ShareButtons;
