import React from 'react';
import Actions from '@/components/BaaniLineActions';
import Translation from '@/components/Translation';
import Transliteration from '@/components/Transliteration';
import BaaniLine from '@/components/BaaniLine';
import { copyToClipboard, showToast, shortenURL } from '@/util';
import { clickEvent, ACTIONS } from '@/util/analytics';
import { TEXTS, SHABAD_CONTENT_CLASSNAME } from '@/constants';

const getRefProps = (highlight: number, shabad: Shabad, ref: any) =>
  highlight === parseInt(shabad.id, 10) ? { ref } : undefined;

const transliterationMap = {
  english: (shabad: Shabad) => shabad.transliteration,
};

const translationMap = {
  spanish: (shabad: Shabad) => shabad.translation.spanish,
  english: (shabad: Shabad) => shabad.translation.english.ssk,
  punjabi: (shabad: Shabad) => ({
    ...shabad.translation.punjabi.bms,
    toString: () => shabad.translation.punjabi.bms.unicode,
  }),
};

type BaaniProps = {
  gurbani: Gurbani;
  type: 'shabad' | 'ang' | 'hukamnama';
  splitView: boolean;
  translationLanguages: string[];
  transliterationLanguages: string[];
  larivaarAssist: boolean;
  highlight: number;
  larivaar: boolean;
  unicode: boolean;
  fontSize: number;
};

export default class Baani extends React.PureComponent<BaaniProps> {
  public static defaultProps = {
    highlight: null,
  };

  private $highlightedBaaniLine = React.createRef();

  private getShareLine = (shabad: Shabad) => {
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

  private onCopyClick = (shabad: Shabad) => () =>
    copyToClipboard(this.getShareLine(shabad))
      .then(() => showToast(TEXTS.GURBAANI_COPIED))
      .then(() =>
        clickEvent({
          action: ACTIONS.LINE_SHARER,
          label: 'copy-line',
        })
      )
      .catch(() => showToast(TEXTS.COPY_FAILURE));

  private onTweetClick = (shabad: Shabad) => () => {
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

  private scrollToHiglight = () => {
    const { current: element } = this.$highlightedBaaniLine;

    if (element) {
      if (element.offsetTop !== undefined) {
        const { offsetTop, offsetHeight } = element;

        requestAnimationFrame(() =>
          window.scrollTo(0, offsetTop - offsetHeight)
        );
      }
    }
  };

  public componentDidMount() {
    this.scrollToHiglight();
  }

  public componentDidUpdate(prevProps: BaaniProps) {
    if (this.props.highlight !== prevProps.highlight) {
      this.scrollToHiglight();
    }
  }

  public render() {
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
            {...getRefProps(highlight, shabad, this.$highlightedBaaniLine)}
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
              {...getRefProps(highlight, shabad, this.$highlightedBaaniLine)}
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
