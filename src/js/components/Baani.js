import React from 'react';
import PropTypes from 'prop-types';
import Translation from './Translation';
import Transliteration from './Transliteration';
import BaaniLine from './BaaniLine';
import { TEXTS } from '.././constants';
import { copyToClipboard, showToast, shortenURL } from '../util';

export default class Baani extends React.PureComponent {
  static defaultProps = {
    highlight: null,
  };

  static propTypes = {
    gurbani: PropTypes.array.isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    highlight: PropTypes.number,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
  };

  _getShabadLine = el =>
    [...el.parentNode.parentNode.querySelectorAll('div, blockquote')]
      .filter(
        e =>
          getComputedStyle(e).visibility !== 'hidden' &&
          getComputedStyle(e).display !== 'none'
      ) // filter hidden ones
      .map(child => (child.querySelector('div.unicode') || child).innerText) // get innerText
      .filter(text => text) // filter empty strings
      .join('\n'); // join them by new line

  onCopyClick = ({ currentTarget }) =>
    copyToClipboard(this._getShabadLine(currentTarget))
      .then(() => showToast(TEXTS.GURBAANI_COPIED))
      .catch(() => showToast(TEXTS.COPY_FAILURE));

  onTweetClick = ({ currentTarget }) => {
    let tweet = this._getShabadLine(currentTarget);
    const shortURL = `\n${shortenURL()}`;
    if (tweet.length + shortURL.length > 274) {
      tweet = `${tweet.substring(0, 272 - shortURL.length)}…`;
    }
    tweet += shortURL;
    tweet += ' #sttm';
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`,
      '_blank'
    );
  };

  componentDidMount() {
    if (this.$highlightedBaaniLine) {
      if ('offsetTop' in this.$highlightedBaaniLine) {
        const { offsetTop, offsetHeight } = this.$highlightedBaaniLine;

        requestAnimationFrame(() =>
          window.scrollTo(0, offsetTop - offsetHeight)
        );
      }
    }
  }

  render() {
    const {
      gurbani,
      splitView,
      translationLanguages,
      transliterationLanguages,
      larivaarAssist,
      larivaar,
      unicode,
      fontSize,
      highlight,
    } = this.props;

    const mixedViewMarkup = (
      <div className="mixed-view-baani">
        {gurbani.map(({ shabad }) => (
          <div
            key={shabad.id}
            id={`line-${shabad.id}`}
            className="line"
            ref={node =>
              highlight === parseInt(shabad.id, 10)
                ? (this.$highlightedBaaniLine = node)
                : null
            }
          >
            <BaaniLine
              text={shabad.gurbani}
              unicode={unicode}
              shouldHighlight={highlight === parseInt(shabad.id, 10)}
              larivaar={larivaar}
              larivaarAssist={larivaarAssist}
              fontSize={fontSize}
            />
            {transliterationLanguages.includes('english') && (
              <Transliteration>{shabad.transliteration}</Transliteration>
            )}
            {translationLanguages.includes('punjabi') && (
              <Translation
                type="punjabi"
                unicode={unicode}
                text={shabad.translation.punjabi.bms}
              />
            )}
            {translationLanguages.includes('english') && (
              <Translation type="english">
                {shabad.translation.english.ssk}
              </Translation>
            )}
            {translationLanguages.includes('spanish') && (
              <Translation type="spanish">
                {shabad.translation.spanish}
              </Translation>
            )}

            <div className="share">
              <a className="copy" onClick={this.onCopyClick}>
                <i className="fa fa-fw fa-clipboard" />
              </a>
              <a className="twitter" onClick={this.onTweetClick}>
                <i className="fa fa-fw fa-twitter" />
              </a>
              {/* <a className="facebook"><i className="fa fa-fw fa-facebook" /></a> */}
            </div>
          </div>
        ))}
      </div>
    );

    const splitViewMarkup = (
      <div className="split-view-baani">
        <div className="split-view-baani-wrapper">
          {gurbani.map(({ shabad }) => (
            <div
              key={shabad.id}
              className="line"
              ref={node =>
                highlight === parseInt(shabad.id, 10)
                  ? (this.$highlightedBaaniLine = node)
                  : null
              }
            >
              <BaaniLine
                text={shabad.gurbani}
                unicode={unicode}
                shouldHighlight={highlight === parseInt(shabad.id, 10)}
                larivaar={larivaar}
                larivaarAssist={larivaarAssist}
                fontSize={fontSize}
              />
              <div className="share">
                <a className="copy">
                  <i className="fa fa-fw fa-clipboard" />
                </a>
                <a className="twitter">
                  <i className="fa fa-fw fa-twitter" />
                </a>
                {/* <a className="facebook"><i className="fa fa-fw fa-facebook" /></a> */}
              </div>
            </div>
          ))}
        </div>
        {transliterationLanguages.includes('english') && (
          <div className="split-view-baani-wrapper">
            {gurbani.map(({ shabad }) => (
              <Transliteration key={shabad.id}>
                {shabad.transliteration}
              </Transliteration>
            ))}
          </div>
        )}
        {translationLanguages.includes('punjabi') && (
          <div className="split-view-baani-wrapper">
            {gurbani.map(({ shabad }) => (
              <Translation
                type="punjabi"
                key={shabad.id}
                unicode={unicode}
                text={shabad.translation.punjabi.bms}
              />
            ))}
          </div>
        )}
        {translationLanguages.includes('english') && (
          <div className="split-view-baani-wrapper">
            {gurbani.map(({ shabad }) => (
              <Translation type="english" key={shabad.id}>
                {shabad.translation.english.ssk}
              </Translation>
            ))}
          </div>
        )}
        {translationLanguages.includes('spanish') && (
          <div className="split-view-baani-wrapper">
            {gurbani.map(({ shabad }) => (
              <Translation type="spanish" key={shabad.id}>
                {shabad.translation.spanish}
              </Translation>
            ))}
          </div>
        )}
      </div>
    );

    return (
      <div className="shabad-content">
        {splitView ? splitViewMarkup : mixedViewMarkup}
      </div>
    );
  }
}
