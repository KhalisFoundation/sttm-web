import React from 'react';
import PropTypes from 'prop-types';
import { showToast, copyToClipboard, shortenURL } from '@/util';
import { TEXTS } from '@/constants';
import { clickEvent, ACTIONS } from '@/util/analytics';
import ShareIcon from '@/components/Icons/Share';
import EmbedIcon from '@/components/Icons/Embed';
import CopyAllIcon from '@/components/Icons/CopyAll';
import WhatsAppIcon from '@/components/Icons/WhatsApp';
import ClipboardIcon from '@/components/Icons/Clipboard';

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

export default class ShareButtons extends React.PureComponent {
  static supportedMedia = ['copyAll', 'embed', 'whatsapp', 'copy'];

  static defaultProps = {
    media: ['whatsapp', 'copy'],
  };

  static propTypes = {
    media: PropTypes.arrayOf(PropTypes.oneOf(ShareButtons.supportedMedia)),
    onEmbedClick: PropTypes.func,
    onCopyAllClick: PropTypes.func,
  };

  static handleShare = () =>
    navigator.share({
      title: document.title,
      description: document
        .querySelector('meta[name="description"]')
        .getAttribute('content'),
      url: shortenURL(),
    });

  render() {
    const { media, onEmbedClick, onCopyAllClick } = this.props;

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
    } else {
      return (
        <div id="share-menu">
          <ul className="share-buttons">{media.map(item => mediaMap[item])}</ul>
        </div>
      );
    }
  }
}
