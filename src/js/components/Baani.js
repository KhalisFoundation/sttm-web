import React from 'react';
import PropTypes from 'prop-types';
import Actions from './BaaniLineActions';
import Translation from './Translation';
import Transliteration from './Transliteration';
import BaaniLine from './BaaniLine';
import { clickEvent, ACTIONS } from '../util/analytics';
import { TEXTS, SHABAD_CONTENT_CLASSNAME } from '.././constants';
import { copyToClipboard, showToast, shortenURL } from '../util';

import { translationMap, transliterationMap, getVerseId } from '@/util/api/shabad';

/**
 *
 *
 * @export
 * @class Baani
 * @extends {React.PureComponent}
 */
export default class Baani extends React.PureComponent {
  static defaultProps = {
    highlight: null,
  };

  static propTypes = {
    gurbani: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['shabad', 'ang', 'hukamnama', 'sync']).isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    highlight: PropTypes.number,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    centerAlignGurbani: PropTypes.bool.isRequired,
    showFullScreen: PropTypes.bool,
    onPanktiClick: PropTypes.func,
  };

  getShareLine = shabad => {
    return [
      shabad.verse.unicode,
      ...this.props.transliterationLanguages.map(language =>
        transliterationMap[language](shabad)
      ),
      ...this.props.translationLanguages.map(language =>
        translationMap[language](shabad)
      ),
    ].join('\n');
  };

  onCopyClick = shabad => () =>
    copyToClipboard(this.getShareLine(shabad))
      .then(() => showToast(TEXTS.GURBAANI_COPIED))
      .then(() =>
        clickEvent({
          action: ACTIONS.LINE_SHARER,
          label: 'copy-line',
        })
      )
      .catch(() => showToast(TEXTS.COPY_FAILURE));

  onFacebookClick = shabad => () => {
    clickEvent({
      action: ACTIONS.LINE_SHARER,
      label: 'facebook',
    });
    const text = this.getShareLine(shabad) + '\n#sttm';
    window.open(
      `https://www.facebook.com/sharer/sharer.php?t=${encodeURIComponent(
        text
      )}&u=${encodeURIComponent(shortenURL())}`,
      '_blank',
      'noreferrer noopener'
    );
  };

  /*onTweetClick = shabad => () => {
    clickEvent({
      action: ACTIONS.LINE_SHARER,
      label: 'twitter',
    });
    let tweet = this.getShareLine(shabad);
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
  };*/

  _scrollToHiglight = () => {
    if (this.$highlightedBaaniLine) {
      if ('offsetTop' in this.$highlightedBaaniLine) {
        const { offsetTop, offsetHeight } = this.$highlightedBaaniLine;

        requestAnimationFrame(() =>
          window.scrollTo(0, offsetTop - offsetHeight)
        );
      }
    }
  };

  showShare = e => {
    const currentShare = document.querySelector('.showShare');
    if (currentShare) {
      currentShare.classList.remove('showShare');
    }
    const selectedDiv = e.currentTarget;
    if (window.getSelection().toString()) {
      const shareDiv = selectedDiv.querySelector('.share');
      shareDiv.classList.add('showShare');
    }
  };

  removeSelection = () => {
    window.getSelection().removeAllRanges();
  };

  componentDidMount() {
    this._scrollToHiglight();
  }

  componentDidUpdate(prevProps) {
    if (this.props.highlight !== prevProps.highlight) {
      this._scrollToHiglight();
    }
  }

  render() {
    const {
      gurbani,
      splitView,
      translationLanguages,
      type,
      transliterationLanguages,
      larivaarAssist,
      larivaar,
      unicode,
      fontSize,
      fontFamily,
      highlight,
      centerAlignGurbani,
      showFullScreen,
      onPanktiClick,
    } = this.props;

    const disabledActions = ['ang', 'hukamnama'].includes(type)
      ? ['tweet']
      : ['openShabad', 'tweet'];

    const getBaniLine = shabad => (
      <BaaniLine
        text={shabad.verse}
        unicode={unicode}
        shouldHighlight={showFullScreen ? false : highlight === parseInt(getVerseId(shabad), 10)}
        larivaar={larivaar}
        larivaarAssist={larivaarAssist}
        fontSize={fontSize}
        fontFamily={fontFamily}
        onPanktiClick={onPanktiClick}
        visraam={shabad.visraam}
      />
    );

    const getTransliterations = shabad => transliterationLanguages.map(language => (
      <Transliteration key={getVerseId(shabad) + language}>
        {transliterationMap[language](shabad)}
      </Transliteration>
    ));

    const getActions = shabad => (
      <Actions
        disabledActions={disabledActions}
        shabad={shabad}
        onFacebookClick={this.onFacebookClick(shabad)}
        onCopyClick={this.onCopyClick(shabad)}
      />
    );

    const getTranslations = shabad => translationLanguages.map(language => (
      <Translation
        key={getVerseId(shabad) + language}
        type={language}
        {...Translation.getTranslationProps({
          translationMap,
          language,
          shabad,
          unicode,
        })}
      />
    ));

    const mixedViewMarkup = (
      <div className="mixed-view-baani">
        {gurbani.map(shabad => (
          <div
            key={getVerseId(shabad)}
            id={`line-${getVerseId(shabad)}`}
            className="line"
            onMouseUp={this.showShare}
            onMouseDown={this.removeSelection}
            ref={node =>
              highlight === parseInt(getVerseId(shabad), 10)
                ? (this.$highlightedBaaniLine = node)
                : null
            }
            onClick={() => onPanktiClick(getVerseId(shabad))}
          >
            {getBaniLine(shabad)}
            {getTransliterations(shabad)}
            {getTranslations(shabad)}
            {getActions(shabad)}
          </div>
        ))}
      </div>
    );

    const fullScreenMarkup = (
      <div className="full-screen-baani">
        {gurbani.map(shabad => (
          highlight === parseInt(getVerseId(shabad), 10) ?
            <div
              key={getVerseId(shabad)}
              id={`line-${getVerseId(shabad)}`}
              className="line"
              onMouseUp={this.showShare}
              onMouseDown={this.removeSelection}
            >
              {getBaniLine(shabad)}
              {getTransliterations(shabad)}
              {getTranslations(shabad)}
              {getActions(shabad)}
            </div> : ''
        ))}
      </div>
    );

    const splitViewMarkup = (
      <div className="split-view-baani">
        <div className="split-view-baani-wrapper">
          {gurbani.map(shabad => (
            <div
              key={getVerseId(shabad)}
              className="line"
              ref={node =>
                highlight === parseInt(getVerseId(shabad), 10)
                  ? (this.$highlightedBaaniLine = node)
                  : null
              }
            >
              {getBaniLine(shabad)}
              {getActions(shabad)}
            </div>
          ))}
        </div>
        {transliterationLanguages.map(language => (
          <div key={language} className="split-view-baani-wrapper">
            {gurbani.map(shabad => (
              <Transliteration key={getVerseId(shabad)}>
                {transliterationMap[language](shabad)}
              </Transliteration>
            ))}
          </div>
        ))}
        {translationLanguages.map(language => (
          <div key={language} className="split-view-baani-wrapper">
            {gurbani.map(shabad => (
              <Translation
                key={getVerseId(shabad)}
                type={language}
                {...Translation.getTranslationProps({
                  translationMap,
                  language,
                  shabad,
                  unicode,
                })}
              />
            ))}
          </div>
        ))}
      </div>
    );

    const getMarkup = () => {
      if (showFullScreen) {
        return fullScreenMarkup;
      } else if (splitView) {
        return splitViewMarkup;
      } else {
        return mixedViewMarkup;
      }
    }

    return (
      <div
        className={`${SHABAD_CONTENT_CLASSNAME} ${
          centerAlignGurbani || showFullScreen ? ' center-align' : ''
          }`}
      >
        {getMarkup()}
      </div>
    );
  }
}
