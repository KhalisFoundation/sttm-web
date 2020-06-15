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
    lineHeight: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    centerAlignGurbani: PropTypes.bool.isRequired,
    showFullScreen: PropTypes.bool,
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

  createParagraphedGurbani = () => {
    const paragraphedGurbani = {};
    const { gurbani } = this.props;
    gurbani.forEach(shabad => {
      if (!paragraphedGurbani[shabad.paragraph]) {
        paragraphedGurbani[shabad.paragraph] = [];
      }

      paragraphedGurbani[shabad.paragraph].push(shabad);
    })

    return paragraphedGurbani;
  }

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

  // showShare = e => {
  //   const currentShare = document.querySelector('.showShare');
  //   if (currentShare) {
  //     currentShare.classList.remove('showShare');
  //   }
  //   const selectedDiv = e.currentTarget;
  //   if (window.getSelection().toString()) {
  //     const shareDiv = selectedDiv.querySelector('.share');
  //     shareDiv.classList.add('showShare');
  //   }
  // };

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

  getBaniLine = shabad => {
    const {
      larivaarAssist,
      larivaar,
      unicode,
      fontSize,
      lineHeight,
      fontFamily,
      highlight,
      showFullScreen,
    } = this.props;

    return (
      <BaaniLine
        text={shabad.verse}
        unicode={unicode}
        shouldHighlight={showFullScreen ? false : highlight === parseInt(getVerseId(shabad), 10)}
        larivaar={larivaar}
        larivaarAssist={larivaarAssist}
        fontSize={fontSize}
        lineHeight={lineHeight}
        fontFamily={fontFamily}
        visraam={shabad.visraam}
      />
    )
  }
  getTransliterations = shabad => {
    const {
      transliterationLanguages,
      fontSize,
    } = this.props;

    return transliterationLanguages.map(language => (
      <Transliteration
        fontSize={fontSize}
        key={getVerseId(shabad) + language}>
        {transliterationMap[language](shabad)}
      </Transliteration>
    ));
  }
  getActions = shabad => {
    const {
      type
    } = this.props;

    const disabledActions = ['ang', 'hukamnama']
      .includes(type) ? ['tweet'] : ['openShabad', 'tweet'];

    return (
      <Actions
        disabledActions={disabledActions}
        shabad={shabad}
        onFacebookClick={this.onFacebookClick(shabad)}
        onCopyClick={this.onCopyClick(shabad)}
      />
    )
  }

  getTransliterationForLanguage = (shabad, language) => {
    const {
      fontSize,
    } = this.props;

    return (
      <Transliteration
        fontSize={fontSize}
        key={getVerseId(shabad) + language}>
        {transliterationMap[language](shabad)}
      </Transliteration>
    )
  }
  getTranslationForLanguage = (shabad, language) => {
    const {
      unicode,
      fontSize,
    } = this.props;
    console.log(language, "language ")
    return (
      <Translation
        fontSize={fontSize}
        key={getVerseId(shabad) + language}
        type={language}
        {...Translation.getTranslationProps({
          translationMap,
          language,
          shabad,
          unicode,
        })}
      />
    )
  }

  getTranslations = shabad => {
    const {
      unicode,
      fontSize,
      translationLanguages,
    } = this.props;

    return translationLanguages.map(language => (
      <Translation
        fontSize={fontSize}
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
  }

  createShabadLine = (shabad, textToRender) => {
    const { highlight } = this.props;
    return (
      <div
        key={getVerseId(shabad)}
        id={`line-${getVerseId(shabad)}`}
        className="line"
        onMouseDown={this.removeSelection}
        ref={node =>
          highlight === parseInt(getVerseId(shabad), 10)
            ? (this.$highlightedBaaniLine = node)
            : null
        }
      >
        {textToRender}
      </div>
    )
  }
  createVersedGurbani = () => {
    const { gurbani } = this.props;
    const versedGurbani = {};

    gurbani.forEach((shabad, idx) => {
      versedGurbani[idx] = [];
      versedGurbani[idx].push(shabad);
    })

    return versedGurbani;
  }

  normalizeGurbani = () => {
    const { paragraphMode } = this.props;
    if (paragraphMode) {
      return this.createParagraphedGurbani();
    }

    return this.createVersedGurbani();
  }

  createMixedViewMarkup = () => {
    const {
      paragraphMode,
      translationLanguages,
      transliterationLanguages,
    } = this.props;

    const normalizedGurbani = this.normalizeGurbani();
    const paragraphModeClass = paragraphMode ? 'paragraph-mode' : '';
    const mixedViewBaaniClass = 'mixed-view-baani';

    return (
      <div className={`${mixedViewBaaniClass} ${paragraphModeClass}`}>
        {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
          <div key={idx} className={`${mixedViewBaaniClass}-wrapper ${paragraphModeClass}`}>
            <div className={`${mixedViewBaaniClass}-paragraph ${paragraphModeClass}`}>
              {shabads.map(shabad => this.createShabadLine(shabad, this.getBaniLine(shabad)))}
            </div>
            <div className={`${mixedViewBaaniClass}-transliteration ${paragraphModeClass}`}>
              {transliterationLanguages.map(language =>
                <div
                  key={language}
                  className={`${mixedViewBaaniClass}-translation-${language} ${paragraphModeClass}`} >
                  {shabads.map(shabad => this.createShabadLine(shabad, this.getTransliterationForLanguage(shabad, language)))}
                </div>
              )}
            </div>
            <div className={`${mixedViewBaaniClass}-translation ${paragraphModeClass}`}>
              {translationLanguages.map(language =>
                <div
                  key={language}
                  className={`${mixedViewBaaniClass}-translation-${language} ${paragraphModeClass}`} >
                  {shabads.map(shabad => this.createShabadLine(shabad, this.getTranslationForLanguage(shabad, language)))}
                </div>
              )}
            </div>
            <div className={`${mixedViewBaaniClass}-actions ${paragraphModeClass}`}>
              {shabads.map(shabad => this.createShabadLine(shabad, this.getActions(shabad)))}
            </div>
          </div>
        ))}
      </div>
    )
  }
  createFullScreenMarkup = () => {
    const {
      gurbani,
      highlight,
    } = this.props;

    return (
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
              {this.getBaniLine(shabad)}
              {this.getTransliterations(shabad)}
              {this.getTranslations(shabad)}
              {this.getActions(shabad)}
            </div> : ''
        ))}
      </div>
    );
  }
  createSplitViewMarkup = () => {
    const {
      paragraphMode,
      translationLanguages,
      transliterationLanguages,
      unicode,
      fontSize,
      highlight,
    } = this.props;

    const normalizedGurbani = this.normalizeGurbani();
    const paragraphModeClass = paragraphMode ? 'paragraph-mode' : '';
    const splitViewBaaniClass = 'split-view-baani';

    return (
      <div className={`${splitViewBaaniClass} ${paragraphModeClass}`}>
        <div className={`${splitViewBaaniClass}-wrapper ${paragraphModeClass}`}>
          {Object.entries(normalizedGurbani).map(([idx, shabads]) =>
            <div className={`${splitViewBaaniClass}-paragraph ${paragraphModeClass}`} key={idx}>
              {shabads.map(shabad =>
                (<div
                  key={getVerseId(shabad)}
                  className="line"
                  ref={node =>
                    highlight === parseInt(getVerseId(shabad), 10)
                      ? (this.$highlightedBaaniLine = node)
                      : null
                  }
                >
                  {this.getBaniLine(shabad)}
                  {this.getActions(shabad)}
                </div>
                ))}
            </div>
          )}
        </div>
        {
          transliterationLanguages.map(language => {
            return (
              <div
                key={language}
                className={`${splitViewBaaniClass}-wrapper ${paragraphModeClass}`}>
                {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
                  <div
                    className={`${splitViewBaaniClass}-transliteration ${paragraphModeClass}`}
                    key={idx}>
                    {
                      shabads.map(shabad =>
                        <Transliteration fontSize={fontSize} key={getVerseId(shabad)}>
                          {transliterationMap[language](shabad)}
                        </Transliteration>)
                    }
                  </div>
                ))}
              </div>)
          })
        }
        {
          translationLanguages.map(language => (
            <div
              key={language}
              className={`${splitViewBaaniClass}-wrapper ${paragraphModeClass}`}>
              {Object.entries(normalizedGurbani).map(([idx, shabads]) => (
                <div
                  key={idx}
                  className={`${splitViewBaaniClass}-translation ${paragraphModeClass}`}
                >
                  {
                    shabads.map(shabad =>
                      <Translation
                        fontSize={fontSize}
                        key={getVerseId(shabad)}
                        type={language}
                        {...Translation.getTranslationProps({
                          translationMap,
                          language,
                          shabad,
                          unicode,
                        })}
                      />)
                  }
                </div>))}
            </div>))}
      </div>)
  }
  getMarkup = () => {
    const {
      splitView,
      showFullScreen,
    } = this.props;

    if (showFullScreen) {
      return this.createFullScreenMarkup();
    } else if (splitView) {
      return this.createSplitViewMarkup();
    }

    return this.createMixedViewMarkup();
  }
  render() {
    const {
      centerAlignGurbani,
      showFullScreen,
    } = this.props;

    return (
      <div
        className={`${SHABAD_CONTENT_CLASSNAME} ${
          centerAlignGurbani || showFullScreen ? ' center-align' : ''
          }`}
      >
        {this.getMarkup()}
      </div>
    );
  }
}
