import React from 'react';
import { showToast, copyToClipboard, shortenURL } from '../util';
import { TEXTS } from '../constants';
import { clickEvent, ACTIONS } from '../util/analytics';
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

export default function ShareButtons() {
  // TODO: Use array to generate this DOM

  return (
    <div id="share-menu">
      <ul className="share-buttons">
        <li>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.sikhitothemax.org&t="
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
            onClick={handleFacebook}
          >
            <FacebookIcon />
            <span className="sr-only">Share on Facebook</span>
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/intent/tweet?source=http%3A%2F%2Fsttm.ws&text=:%20http%3A%2F%2Fsttm.ws&via=khalisfound"
            target="_blank"
            rel="noopener noreferrer"
            title="Tweet"
            onClick={handleTwitter}
          >
            <TwitterIcon />
            <span className="sr-only">Tweet</span>
          </a>
        </li>
        <li className="show-on-mobile">
          <a
            href="whatsapp://send?text=http%3A%2F%2Fsttm.ws"
            data-action="share/whatsapp/share"
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Whatsapp"
            onClick={handleWhatsapp}
          >
            <WhatsAppIcon />
            <span className="sr-only">Share on Whatsapp</span>
          </a>
        </li>
        <li>
          <a
            href="http://www.reddit.com/submit?url=http%3A%2F%2Fsttm.ws&title: "
            target="_blank"
            rel="noopener noreferrer"
            title="Submit to Reddit"
            onClick={handleReddit}
          >
            <RedditIcon />
            <span className="sr-only">Submit to Reddit</span>
          </a>
        </li>
        <li>
          <a
            href="http://www.tumblr.com/share?v=3&u=http%3A%2F%2Fsttm.ws&t=&s="
            target="_blank"
            rel="noopener noreferrer"
            title="Post to Tumblr"
            onClick={handleTumblr}
          >
            <TumblrIcon />
            <span className="sr-only">Post to Tumblr</span>
          </a>
        </li>
        <li>
          <a
            href="http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fsttm.ws&description="
            target="_blank"
            rel="noopener noreferrer"
            title="Pin it"
            onClick={handlePinterest}
          >
            <PinterestIcon />
            <span className="sr-only">Pin it</span>
          </a>
        </li>
        <li>
          <a
            href="mailto:?subject=&body=:%20http%3A%2F%2Fsttm.ws"
            target="_blank"
            rel="noopener noreferrer"
            title="Share via email"
            onClick={handleEmail}
          >
            <EnvelopeIcon />
            <span className="sr-only">Share via email</span>
          </a>
        </li>
        <li>
          <a id="copy-short-url" className="copy" onClick={copyShortUrl}>
            <ClipboardIcon />
            <span className="sr-only">Copy URL</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
