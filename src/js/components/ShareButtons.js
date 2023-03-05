import React from 'react';
import PropTypes from 'prop-types';

import { showToast, copyToClipboard, shortenURL, isKeyExists, multiviewFormattedShabad } from '../util';
import { TEXTS } from '../constants';
import { clickEvent, ACTIONS } from '../util/analytics';
import { delay, isFalsy } from '../util/misc';
import ShareIcon from './Icons/Share';
import EmbedIcon from './Icons/Embed';
import CopyAllIcon from './Icons/CopyAll';
import WhatsAppIcon from './Icons/WhatsApp';
import ClipboardIcon from './Icons/Clipboard';
import PrinterIcon from './Icons/Printer';
import { RandomIcon } from './Icons/RandomIcon';
import { GearsIcon } from './Icons/CustomIcons';
import MultiViewButton from '@/components/MultiViewButton';
import { ShabadButtonWrapper } from './ShabadButtonWrapper';
import { FavouriteShabadButton } from './FavouriteShabadButton';

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

export const supportedMedia = ['favouriteShabad', 'addShabad', 'multiView', 'random', 'settings', 'print', 'copyAll', 'embed', 'whatsapp', 'copy'];

class ShareButtons extends React.PureComponent {
  constructor(props) {
    super()
    this.formattedShabad = {}
    this.onClickSettings = this.onClickSettings.bind(this);
    const { highlight, gurbani } = props;
    if (!isFalsy(gurbani) && gurbani.length) {
      const selectedShabad = highlight ? (gurbani?.find(({ verseId }) => verseId === highlight) ?? gurbani[0]) : gurbani[0]
      this.formattedShabad = multiviewFormattedShabad(selectedShabad)
    }
  }
  static defaultProps = {
    media: ['whatsapp', 'copy'],
  };

  static propTypes = {
    location: PropTypes.object,
    media: PropTypes.arrayOf(PropTypes.oneOf(supportedMedia)),
    onEmbedClick: PropTypes.func,
    onCopyAllClick: PropTypes.func,
    toggleSettingsPanel: PropTypes.func,
    closeMultiViewPanel: PropTypes.func,
    closePinSettings: PropTypes.func,
    showMultiViewPanel: PropTypes.bool,
    showPinSettings: PropTypes.bool,
    highlight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    gurbani: PropTypes.array,
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

  onClickSettings(e) {
    e.preventDefault();
    const { toggleSettingsPanel, closeMultiViewPanel, showMultiViewPanel, showPinSettings, closePinSettings } = this.props
    if (showMultiViewPanel) {
      closeMultiViewPanel()
      delay(600).then(() => toggleSettingsPanel())
      return
    }
    if (showPinSettings) {
      closePinSettings();
    }
    toggleSettingsPanel()
  }

  componentWillUnmount() {
    this.formattedShabad = {}
  }

  render() {
    const { media, onEmbedClick, onCopyAllClick, gurbani } = this.props;

    if (media.length === 0) {
      return null;
    }

    // TODO: Use array to generate this DOM
    const mediaMap = {
      embed: (
        <li key={0} className="show-on-desktop">
          <button onClick={onEmbedClick} aria-label="copy embedding code">
            <EmbedIcon />
          </button>
        </li>
      ),
      copyAll: (
        <li key={1}>
          <button onClick={onCopyAllClick} aria-label="copy all gurbani">
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
          <label htmlFor="copy-short-url-text" id="copy-short-url" className="copy" onClick={copyShortUrl}>
            <input
              id="copy-short-url-text"
              className="short-url-input"
              type="text"
              value={shortenURL()}
              readOnly
            />
            <ClipboardIcon className="short-url-icon" />
            <span className="sr-only">Copy URL</span>
          </label>
        </li>
      ),
      print: (
        <li key={4}>
          <button id="print-shabad" onClick={window.print}>
            <PrinterIcon />
            <span className="sr-only">Print Shabad</span>
          </button>
        </li>
      ),
      settings: (
        <li key={5}>
          <button id="settings-icon" onClick={this.onClickSettings}>
            <GearsIcon />
            <span className="show-on-desktop">Display</span>
          </button>
        </li>
      ),
      multiView: (
        <li key={6}>
          <MultiViewButton width="1.0em" />
        </li>
      ),
      addShabad: (
        <li key={7}>
          {
            isKeyExists(this.formattedShabad, 'shabadId')
            && (<ShabadButtonWrapper shabad={this.formattedShabad} />)
          }
        </li>
      ),
      random: (
        <li key={8}>
          <button onClick={() => window.location.href = '/random'}>
            <RandomIcon />
            <span className="show-on-desktop">Random</span>
          </button>
        </li>
      ),
       favouriteShabad: (
        <li key={9}>
          {
            <FavouriteShabadButton shabad={this.formattedShabad} gurbani={gurbani} />
          }
        </li>
      ),
    };

    if (window !== undefined && 'share' in window.navigator) {
      return (
        <div id="controls-menu">
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
      <div id="controls-menu">
        <ul className="share-buttons">{media.map(item => mediaMap[item])}</ul>
      </div>
    );
  }
}

export default ShareButtons;
