import React from 'react';
import { Redirect } from 'react-router-dom';

import { clickEvent, ACTIONS, errorEvent } from '@/util/analytics';
import { showToast, copyToClipboard } from '@/util';

import { TEXTS, SHABAD_CONTENT_CLASSNAME } from '@/constants';

import Controls, { supportedMedia } from '@/components/Controls';
import FootNav from '@/components/FootNav';
import Meta from '@/components/Meta';
import ProgressBar from '@/components/ProgressBar';
import Baani from '@/components/Baani';
import RelatedShabads from '@/components/RelatedShabads';

import { IStore } from '@/features/types';
import { ShabadTypes, IKhajanaAPIResponse } from '@/types';

export interface IShabadContentProps extends IStore {
  gurbani: any[];
  highlight: number;
  type: ShabadTypes;
  info: IKhajanaAPIResponse['shabadinfo'];
  nav: IKhajanaAPIResponse['navigation'];
  hideMeta?: boolean;
  hideControls?: boolean;
  controlProps?: any;
  random?: boolean;
}

interface IShabadContentState {
  progress: number;
}

export default class ShabadContent extends React.PureComponent<
  IShabadContentProps,
  IShabadContentState
> {
  public static defaultProps = {
    random: false,
    hideControls: false,
    hideMeta: false,
    controlProps: {},
  };

  public state = {
    progress: 0,
  };

  private scrollListener = () => {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const maxY =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = parseFloat((y / maxY).toPrecision(2));
      this.setState({ progress });
    });
  };

  private handleCopyAll = () => {
    Promise.resolve(
      document.querySelector(`.${SHABAD_CONTENT_CLASSNAME}`)!.textContent
    )
      .then(copyToClipboard)
      .then(() => showToast(TEXTS.GURBAANI_COPIED))
      .then(() => clickEvent({ action: ACTIONS.SHARE, label: 'copy-all' }))
      .catch(({ message: label = '' } = {}) =>
        errorEvent({ action: 'copy-all-failure', label })
      );
  };

  private handleEmbed = () => {
    const { info, type } = this.props;

    clickEvent({ action: ACTIONS.SHARE, label: 'embed' });

    const attrs = [
      `data-sttm-height="500"`,
      `data-sttm-width="500"`,
      type === 'ang'
        ? `data-sttm-ang="${info.source.pageno}" data-sttm-source="${
            info.source.id
          }"`
        : `data-sttm-id="${info.id}"`,
    ].join(' ');

    Promise.resolve(
      `<div ${attrs}><a href="https://sttm.co/embed?id=${
        info.id
      }">SikhiToTheMax</a></div><script async src="https://sttm.co/embed.js"></script>`
    )
      .then(copyToClipboard)
      .then(() => showToast(TEXTS.EMBED_COPIED))
      .catch(() => showToast(TEXTS.EMBED_FAILURE));
  };

  public render() {
    const {
      props: {
        gurbani,
        nav,
        info,
        type,
        random,
        splitView,
        translationLanguages,
        transliterationLanguages,
        larivaarAssist,
        larivaar,
        highlight,
        unicode,
        fontSize,
      },
      handleEmbed,
      handleCopyAll,
    } = this;

    if (random) {
      return <Redirect to={`/shabad?id=${info.id}`} />;
    }

    return (
      <React.Fragment>
        {this.props.hideControls === false && (
          // @ts-ignore
          <Controls
            media={
              ['shabad', 'hukamnama', 'ang'].includes(type)
                ? supportedMedia
                : supportedMedia.filter(
                    m => ['embed', 'copyAll', 'copy'].includes(m) === false
                  )
            }
            onCopyAllClick={handleCopyAll}
            onEmbedClick={handleEmbed}
            {...this.props.controlProps}
          />
        )}
        {this.props.hideMeta === false && (
          <Meta
            info={info}
            nav={nav}
            type={type}
            translationLanguages={translationLanguages}
            transliterationLanguages={transliterationLanguages}
          />
        )}
        <div id="shabad" className="shabad display">
          <div className="shabad-container">
            <Baani
              type={type}
              gurbani={gurbani}
              splitView={splitView}
              unicode={unicode}
              highlight={highlight}
              larivaar={larivaar}
              fontSize={fontSize}
              larivaarAssist={larivaarAssist}
              translationLanguages={translationLanguages}
              transliterationLanguages={transliterationLanguages}
            />

            {this.props.hideMeta === false && (
              <FootNav info={info} type={type} nav={nav} />
            )}

            <RelatedShabads forShabadID={this.props.info.id} />
          </div>
        </div>
        <ProgressBar percent={this.state.progress} />
      </React.Fragment>
    );
  }

  public componentDidMount() {
    addEventListener('scroll', this.scrollListener, { passive: true });
    this.scrollListener();
  }

  public componentWillUnmount() {
    removeEventListener('scroll', this.scrollListener);
  }
}
