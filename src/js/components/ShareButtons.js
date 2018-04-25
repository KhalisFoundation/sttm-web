import React from 'react';
import PropTypes from 'prop-types';
import { showToast, copyToClipboard, shortenURL } from '../util';
import { TEXTS } from '../constants';
import { clickEvent, ACTIONS } from '../util/analytics';
import EmbedIcon from './Icons/Embed';
import CursorIcon from './Icons/Cursor';
import FacebookIcon from './Icons/Facebook';
import TwitterIcon from './Icons/Twitter';
import PinterestIcon from './Icons/Pinterest';
import WhatsAppIcon from './Icons/WhatsApp';
import TumblrIcon from './Icons/Tumblr';
import RedditIcon from './Icons/Reddit';
import EnvelopeIcon from './Icons/Envelope';
import ClipboardIcon from './Icons/Clipboard';

const handleFacebook = () => {
  clickEvent({ action: ACTIONS.SHARE, label: 'facebook' });
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shortenURL()
    )}&t=${encodeURIComponent(shortenURL())}`
  );
  return false;
};

const handleTwitter = () => {
  clickEvent({ action: ACTIONS.SHARE, label: 'twitter' });
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      document.title
    )}:%20${encodeURIComponent(shortenURL())}`
  );
  return false;
};

const handleWhatsapp = () => {
  clickEvent({ action: ACTIONS.SHARE, label: 'whatsapp' });
  window.open(
    `whatsapp://send?text=${encodeURIComponent(
      shortenURL()
    )}%20${encodeURIComponent(document.title)}`
  );
  return false;
};

const handleReddit = () => {
  clickEvent({ action: ACTIONS.SHARE, label: 'reddit' });
  window.open(
    `http://www.reddit.com/submit?url=${encodeURIComponent(
      shortenURL()
    )}&title: ${encodeURIComponent(document.title)}`
  );
  return false;
};

const handleTumblr = () => {
  clickEvent({ action: ACTIONS.SHARE, label: 'tumblr' });
  window.open(
    `http://www.tumblr.com/share?v=3&u=${encodeURIComponent(
      shortenURL()
    )}&t=${encodeURIComponent(document.title)}`
  );
  return false;
};

const handlePinterest = () => {
  clickEvent({ action: ACTIONS.SHARE, label: 'pinterest' });
  window.open(
    `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      shortenURL()
    )}&description=${encodeURIComponent(document.title)}`
  );
  return false;
};

const handleEmail = () => {
  clickEvent({ action: ACTIONS.SHARE, label: 'email' });
  window.open(
    `mailto:?subject=${encodeURIComponent(
      document.title
    )}&body=${encodeURIComponent(shortenURL())}`
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

export const supportedMedia = [
  'embed',
  'selectAll',
  'copy',
  'facebook',
  'twitter',
  'reddit',
  'whatsapp',
  'tumblr',
  'pinterest',
  'email',
];

export default class ShareButtons extends React.PureComponent {
  static defaultProps = {
    media: [
      'copy',
      'facebook',
      'twitter',
      'reddit',
      'whatsapp',
      'tumblr',
      'pinterest',
      'email',
    ],
  };

  static propTypes = {
    media: PropTypes.arrayOf(PropTypes.oneOf(supportedMedia)),
    onEmbedClick: PropTypes.func,
    onSelectAllClick: PropTypes.func,
  };

  render() {
    const { media, onEmbedClick, onSelectAllClick } = this.props;

    // TODO: Use array to generate this DOM

    const mediaMap = {
      embed: (
        <li>
          <button onClick={onEmbedClick}>
            <EmbedIcon />
          </button>
        </li>
      ),
      selectAll: (
        <li>
          <button onClick={onSelectAllClick}>
            <CursorIcon />
          </button>
        </li>
      ),
      copy: (
        <li>
          <a id="copy-short-url" className="copy" onClick={copyShortUrl}>
            <ClipboardIcon />
            <span className="sr-only">Copy URL</span>
          </a>
        </li>
      ),
      facebook: (
        <li>
          <a title="Share on Facebook" onClick={handleFacebook}>
            <FacebookIcon />
            <span className="sr-only">Share on Facebook</span>
          </a>
        </li>
      ),
      twitter: (
        <li>
          <a title="Tweet" onClick={handleTwitter}>
            <TwitterIcon />
            <span className="sr-only">Tweet</span>
          </a>
        </li>
      ),
      whatsapp: (
        <li className="show-on-mobile">
          <a title="Share on Whatsapp" onClick={handleWhatsapp}>
            <WhatsAppIcon />
            <span className="sr-only">Share on Whatsapp</span>
          </a>
        </li>
      ),
      reddit: (
        <li>
          <a title="Submit to Reddit" onClick={handleReddit}>
            <RedditIcon />
            <span className="sr-only">Submit to Reddit</span>
          </a>
        </li>
      ),
      tumblr: (
        <li>
          <a title="Post to Tumblr" onClick={handleTumblr}>
            <TumblrIcon />
            <span className="sr-only">Post to Tumblr</span>
          </a>
        </li>
      ),
      pinterest: (
        <li>
          <a title="Pin it" onClick={handlePinterest}>
            <PinterestIcon />
            <span className="sr-only">Pin it</span>
          </a>
        </li>
      ),
      email: (
        <li>
          <a title="Share via email" onClick={handleEmail}>
            <EnvelopeIcon />
            <span className="sr-only">Share via email</span>
          </a>
        </li>
      ),
    };

    return (
      <div id="share-menu">
        <ul className="share-buttons">{media.map(item => mediaMap[item])}</ul>
      </div>
    );
  }
}
