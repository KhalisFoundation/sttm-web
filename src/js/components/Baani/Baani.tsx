import React from 'react';
import PropTypes from 'prop-types';
import Actions from '@/components/BaaniLineActions';
import Translation from '@/components/Translation';
import Transliteration from '@/components/Transliteration';
import BaaniLine from '@/components/BaaniLine';
import { copyToClipboard, showToast, shortenURL } from '@/util';
import { clickEvent, ACTIONS } from '@/util/analytics';
import { TEXTS, SHABAD_CONTENT_CLASSNAME } from '@/constants';

const transliterationMap = {
  english: shabad => shabad.transliteration,
};

const translationMap = {
  spanish: shabad => shabad.translation.spanish,
  english: shabad => shabad.translation.english.ssk,
  punjabi: shabad => ({
    ...shabad.translation.punjabi.bms,
    toString: () => shabad.translation.punjabi.bms.unicode,
  }),
};

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
    type: PropTypes.oneOf(['shabad', 'ang', 'hukamnama']).isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    highlight: PropTypes.number,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
  };

  getShareLine = shabad => {
    return [
      shabad.gurbani.unicode,
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

  onTweetClick = shabad => () => {
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
  };

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
            {transliterationLanguages.map(language => (
              <Transliteration key={shabad.id + language}>
                {transliterationMap[language](shabad)}
              </Transliteration>
            ))}

            {translationLanguages.map(language => (
              <Translation
                key={shabad.id + language}
                type={language}
                {...Translation.getTranslationProps({
                  translationMap,
                  language,
                  shabad,
                  unicode,
                })}
              />
            ))}

            <Actions
              disabledActions={
                ['ang', 'hukamnama'].includes(type) ? [] : ['openShabad']
              }
              shabad={shabad}
              onTweetClick={this.onTweetClick(shabad)}
              onCopyClick={this.onCopyClick(shabad)}
            />

            <br />
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

              <Actions
                disabledActions={
                  ['ang', 'hukamnama'].includes(type) ? [] : ['openShabad']
                }
                shabad={shabad}
                onTweetClick={this.onTweetClick(shabad)}
                onCopyClick={this.onCopyClick(shabad)}
              />
            </div>
          ))}
        </div>
        {transliterationLanguages.map(language => (
          <div key={language} className="split-view-baani-wrapper">
            {gurbani.map(({ shabad }) => (
              <Transliteration key={shabad.id}>
                {transliterationMap[language](shabad)}
              </Transliteration>
            ))}
          </div>
        ))}
        {translationLanguages.map(language => (
          <div key={language} className="split-view-baani-wrapper">
            {gurbani.map(({ shabad }) => (
              <Translation
                key={shabad.id}
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

    return (
      <div className={SHABAD_CONTENT_CLASSNAME}>
        {splitView ? splitViewMarkup : mixedViewMarkup}
      </div>
    );
  }
}
