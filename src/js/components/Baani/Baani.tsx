import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import { clickEvent, ACTIONS } from '@/util/analytics';
import { TEXTS, SHABAD_CONTENT_CLASSNAME } from '@/constants';
import { copyToClipboard, showToast, shortenURL } from '@/util';

import { IStore } from '@/features/types';
import { IShabadTypes, IGurbani, IShabad } from '@/types';

import { transliterationMap, translationMap } from './helpers';
import Mixed from './types/Mixed';

// This is rarely used, so let's not make majority of our users pay for it.
const Split = React.lazy(() => import('./types/Split'));

export interface IBaaniProps
  extends Pick<
    IStore,
    | 'splitView'
    | 'translationLanguages'
    | 'transliterationLanguages'
    | 'larivaarAssist'
    | 'larivaar'
    | 'unicode'
    | 'fontSize'
  > {
  gurbani: IGurbani;
  type: IShabadTypes;
  highlight?: number;
}

export default class Baani extends React.PureComponent<IBaaniProps> {
  public static defaultProps = {
    highlight: null,
  };

  private $highlightedBaaniLine = React.createRef<HTMLDivElement>();

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

  private scrollToHiglight = () => {
    if (this.$highlightedBaaniLine.current) {
      if ('offsetTop' in this.$highlightedBaaniLine.current) {
        const { offsetTop, offsetHeight } = this.$highlightedBaaniLine.current;

        requestAnimationFrame(() =>
          window.scrollTo(0, offsetTop - offsetHeight)
        );
      }
    }
  };

  public getShareLine = (shabad: IShabad) => {
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

  public onCopyClick = (shabad: IShabad) => () =>
    copyToClipboard(this.getShareLine(shabad))
      .then(() => showToast(TEXTS.GURBAANI_COPIED))
      .then(() =>
        clickEvent({
          action: ACTIONS.LINE_SHARER,
          label: 'copy-line',
        })
      )
      .catch(() => showToast(TEXTS.COPY_FAILURE));

  public onFacebookClick = (shabad: IShabad) => () => {
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

  public componentDidMount() {
    this.scrollToHiglight();
  }

  public componentDidUpdate(prevProps: IBaaniProps) {
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

    const disabledActions = ['ang', 'hukamnama'].includes(type)
      ? ['tweet']
      : ['openshabad', 'tweet'];

    const Component = splitView ? Split : Mixed;

    return (
      <div className={SHABAD_CONTENT_CLASSNAME}>
        <Suspense fallback={null}>
          <Component
            disabledActions={disabledActions}
            fontSize={fontSize}
            gurbani={gurbani}
            highlight={highlight}
            innerRef={this.$highlightedBaaniLine}
            unicode={unicode}
            transliterationLanguages={transliterationLanguages}
            translationLanguages={translationLanguages}
            onFacebookClick={this.onFacebookClick}
            onCopyClick={this.onCopyClick}
            larivaarAssist={larivaarAssist}
            larivaar={larivaar}
          />
        </Suspense>
      </div>
    );
  }
}
