import React from 'react';
import { Redirect } from 'react-router-dom';

import { clickEvent, ACTIONS, errorEvent } from '@/util/analytics';
import { showToast, copyToClipboard } from '@/util';
import Controls, { supportedMedia } from '../Controls';
import FootNav from '../FootNav';
import Meta from '../Meta';
import ProgressBar from '../ProgressBar';
import Baani from '../Baani';
import { TEXTS, SHABAD_CONTENT_CLASSNAME } from '@/constants';
import { Gurbani, ShabadTypes } from '@/types';
import { State } from '@/features/types';

export interface IShabadContentProps extends State {
  random: boolean;
  nav: {};
  gurbani: Gurbani;
  type: ShabadTypes;
  highlight?: number;
  controlProps: {
    disableSplitView: boolean;
    disableParagraphView: boolean;
  };
  hideMeta: boolean;
  hideControls: boolean;
  info: {
    id?: string;
    source: {
      id?: string;
      pageno?: string;
    };
  };
}

export default class ShabadContent extends React.PureComponent<
  IShabadContentProps
> {
  public static defaultProps = {
    random: false,
    nav: {},
    hideControls: false,
    hideMeta: false,
  };

  public state = {
    progress: 0,
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
          </div>
        </div>
        <ProgressBar percent={this.state.progress} />
      </React.Fragment>
    );
  }

  public scrollListener = () => {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const maxY =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = parseFloat((y / maxY).toPrecision(2));
      this.setState({ progress });
    });
  };

  public componentDidMount() {
    addEventListener('scroll', this.scrollListener, { passive: true });
    this.scrollListener();
  }

  public componentWillUnmount() {
    removeEventListener('scroll', this.scrollListener);
  }

  public handleCopyAll = () => {
    const $dom = document.querySelector(`.${SHABAD_CONTENT_CLASSNAME}`);

    if ($dom === null || $dom.textContent === null) {
      return;
    }

    return Promise.resolve($dom.textContent)
      .then(copyToClipboard)
      .then(() => showToast(TEXTS.GURBAANI_COPIED))
      .then(() => clickEvent({ action: ACTIONS.SHARE, label: 'copy-all' }))
      .catch(({ message: label = '' } = {}) =>
        errorEvent({ action: 'copy-all-failure', label })
      );
  };

  public handleEmbed = () => {
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
}
