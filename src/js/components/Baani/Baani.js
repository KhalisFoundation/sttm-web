import { InView } from 'react-intersection-observer'
import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../BaaniLineActions';
import Translation from '../Translation';
import Transliteration from '../Transliteration';
import BaaniLine from '../BaaniLine';
import { TEXTS, SHABAD_CONTENT_CLASSNAME } from '@/constants';
import { copyToClipboard, showToast, shortenURL } from '@/util';
import { changeAng, prefetchAng } from './utils';

import {
  clickEvent,
  ACTIONS,
  translationMap,
  transliterationMap,
  getVerseId,
} from '@/util';

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
    ang: PropTypes.number,
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
    translationFontSize: PropTypes.number.isRequired,
    transliterationFontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    centerAlignGurbani: PropTypes.bool.isRequired,
    showFullScreen: PropTypes.bool,
    isParagraphMode: PropTypes.bool.isRequired,
    onBaaniLineClick: PropTypes.func,
  };
  getShareLine = shabad => {
    const availableTransliterations = this.getAvailableTransliterations();
    const availableTranslations = this.getAvailableTranslations();

    return [
      shabad.verse.unicode,
      ...availableTransliterations.map(language =>
        transliterationMap[language](shabad)
      ),
      ...availableTranslations.map(language =>
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
      const { top } = this.$highlightedBaaniLine.getBoundingClientRect();
      const newTopPosition = window.scrollY + top;
      requestAnimationFrame(() => window.scrollTo(0, newTopPosition));
    }
  };

  showSelectionOptions = e => {
    const currentShare = document.querySelector('.showShare');

    // Hides the active selection options panel
    if (currentShare) {
      currentShare.classList.remove('showShare');
    }
    const selectedDiv = e.currentTarget;

    // Show the active selection panel for current div.
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
      transliterationFontSize,
    } = this.props;

    return transliterationLanguages.map(language => (
      <Transliteration
        fontSize={transliterationFontSize}
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
      transliterationFontSize,
    } = this.props;

    return (
      <Transliteration
        fontSize={transliterationFontSize}
        key={getVerseId(shabad) + language}>
        {transliterationMap[language](shabad)}
      </Transliteration>
    )
  }
  getTranslationForLanguage = (shabad, language) => {
    const {
      unicode,
      translationFontSize
    } = this.props;
    return (
      <Translation
        fontSize={translationFontSize}
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
      translationFontSize,
      translationLanguages,
    } = this.props;

    return translationLanguages.map(language => (
      <Translation
        fontSize={translationFontSize}
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
  createShabadLine = (shabad, nodeToRender, isMatchHighlighted = false) => {
    const { highlight } = this.props;
    const verseId = parseInt(getVerseId(shabad), 10);
    const isHighlighted = highlight === verseId;
    const uniqueKey = `${verseId}-line`;

    return (
      <div
        key={uniqueKey}
        className="line"
        onMouseDown={this.removeSelection}
        ref={node =>
          isMatchHighlighted && isHighlighted
            ? (this.$highlightedBaaniLine = node)
            : null
        }
      >
        {nodeToRender}
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
    const { isParagraphMode } = this.props;
    if (isParagraphMode) {
      return this.createParagraphedGurbani();
    }

    return this.createVersedGurbani();
  }

  createMixedViewMarkup = () => {
    const {
      source,
      history,
      ang,
      onBaaniLineClick,
      isParagraphMode,
    } = this.props;


    const normalizedGurbani = this.normalizeGurbani();
    const paragraphModeClass = isParagraphMode ? 'paragraph-mode' : '';
    const mixedViewBaaniClass = 'mixed-view-baani';
    const availableTransliterations = this.getAvailableTransliterations();
    const availableTranslations = this.getAvailableTranslations();
    const totalParagraphs = Object.keys(normalizedGurbani).length - 1;
    return (
      <div className={`${mixedViewBaaniClass} ${paragraphModeClass}`}>
        {Object.entries(normalizedGurbani).map(([idx, shabads]) => {

          const isMiddleParagraph = idx == Math.ceil(totalParagraphs / 2);
          const isFirstParagraph = idx == totalParagraphs;
          const lastParagraphAttributes = isFirstParagraph ? {
            'data-middle-paragraph': true, 'data-ang': ang
          } : {}
          const firstParagraphAttributes = isMiddleParagraph ? {
            'data-first-paragraph': true, 'data-ang': ang
          } : {}
          // This is used for sehaj-paath mode, which don't have paragraph mode
          // so we can safely tell it to highlight first pankti as first pankti is equal to first paragraph
          const highlightVerseId = shabads[0].verseId;
          const Wrapper = isMiddleParagraph || isFirstParagraph ? InView : 'div';

          return (
            <Wrapper
              key={idx}
              {...firstParagraphAttributes}
              {...lastParagraphAttributes}
              onChange={isMiddleParagraph ? prefetchAng : changeAng({ history, source, ang })}
              onClick={onBaaniLineClick ? onBaaniLineClick(highlightVerseId) : undefined}
              onMouseUp={isParagraphMode ? undefined : this.showSelectionOptions} // In paragraph mode, we are currently not showing social Share
              onMouseDown={isParagraphMode ? undefined : this.removeSelection}
              className={`${mixedViewBaaniClass}-wrapper${paragraphModeClass}`}
            >
              <div
                className={`${mixedViewBaaniClass}-paragraph ${paragraphModeClass}`}>
                {shabads.map(shabad => this.createShabadLine(shabad, this.getBaniLine(shabad), true))}
              </div>
              <div
                className={`${mixedViewBaaniClass}-transliteration ${paragraphModeClass}`}>
                {availableTransliterations.map(language =>
                  <div
                    key={language}
                    className={`${mixedViewBaaniClass}-transliteration-${language} ${paragraphModeClass}`} >
                    {shabads.map(shabad => this.createShabadLine(shabad, this.getTransliterationForLanguage(shabad, language)))}
                  </div>
                )}
              </div>
              <div
                className={`${mixedViewBaaniClass}-translation ${paragraphModeClass}`}>
                {availableTranslations.map(language =>
                  <div
                    key={language}
                    className={`${mixedViewBaaniClass}-translation-${language} ${paragraphModeClass}`} >
                    {shabads.map(shabad => this.createShabadLine(shabad, this.getTranslationForLanguage(shabad, language)))}
                  </div>
                )}
              </div>
              {isParagraphMode ?
                null :
                <div
                  className={`${mixedViewBaaniClass}-actions ${paragraphModeClass}`}>
                  {shabads.map(shabad => this.createShabadLine(shabad, this.getActions(shabad)))}
                </div>}
            </Wrapper>)
        })}
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
              onMouseUp={this.showSelectionOptions}
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

  getAvailableTranslations = () => {
    const {
      translationLanguages,
      gurbani
    } = this.props;
    // Sundar-gutka baani have first verse as baani name
    const shabad = gurbani[1] || gurbani[0];
    const translatedShabad = {};

    translatedShabad.english = !!translationMap.english(shabad);
    translatedShabad.spanish = !!translationMap.spanish(shabad);
    translatedShabad.punjabi = !!translationMap.punjabi(shabad);

    return translationLanguages.filter(language => translatedShabad[language]) || [];
  }

  getAvailableTransliterations = () => {
    const {
      gurbani,
      transliterationLanguages
    } = this.props;

    // Sundar-gutka baani have first verse as baani name
    const shabad = gurbani[1] || gurbani[0];
    const transliteratedShabad = {};
    transliteratedShabad.english = !!transliterationMap.english(shabad);
    transliteratedShabad.hindi = !!transliterationMap.hindi(shabad);
    transliteratedShabad.shahmukhi = !!transliterationMap.shahmukhi(shabad);
    transliteratedShabad.IPA = !!transliterationMap.IPA(shabad);
    return transliterationLanguages.filter(language => transliteratedShabad[language]) || [];
  }
  createSplitViewMarkup = () => {
    const {
      isParagraphMode,
      unicode,
      fontSize,
      highlight,
    } = this.props;

    const normalizedGurbani = this.normalizeGurbani();
    const paragraphModeClass = isParagraphMode ? 'paragraph-mode' : '';
    const splitViewBaaniClass = 'split-view-baani';
    const availableTransliterations = this.getAvailableTransliterations();
    const availableTranslations = this.getAvailableTranslations();

    return (
      <div className={`${splitViewBaaniClass} ${paragraphModeClass}`}>
        <div className={`${splitViewBaaniClass}-wrapper ${paragraphModeClass}`}>
          {Object.entries(normalizedGurbani).map(([idx, shabads]) =>
            <div className={`${splitViewBaaniClass}-paragraph ${paragraphModeClass}`} key={idx}>
              {shabads.map(shabad =>
                (
                  <div
                    id={`line${getVerseId(shabad)}-line`}
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
          availableTransliterations.map(language => {
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
          availableTranslations.map(language => (
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
