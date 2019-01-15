import React from 'react';

import ShabadControls from '../ShabadControls';
import ShareButtons, { supportedMedia as _s } from '../ShareButtons';
import { IStore } from '@/features/types';

export const supportedMedia = _s;

export interface IControlsProps extends IStore {
  media: typeof supportedMedia;
  onCopyAllClick: () => void;
  onEmbedClick: () => void;
}

export default class Controls extends React.PureComponent<IStore> {
  public state = {
    showBorder: false,
  };

  private mounted = false;
  private $wrapper = React.createRef<HTMLDivElement>();

  private scrollListener = () => {
    if (this.$wrapper.current === null) {
      return;
    }

    if (window.scrollY >= this.$wrapper.current.offsetTop) {
      if (this.mounted && this.state.showBorder === false) {
        this.setState({ showBorder: true });
      }
    } else {
      if (this.mounted && this.state.showBorder === true) {
        this.setState({ showBorder: false });
      }
    }
  };

  public componentDidMount() {
    this.mounted = true;
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  public componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('scroll', this.scrollListener);
  }

  public render() {
    return (
      <div
        id="controls-wrapper"
        className={`no-select ${this.state.showBorder ? 'with-border' : ''}`}
        ref={this.$wrapper}
      >
        <ShareButtons {...this.props} />
        <ShabadControls {...this.props} />
      </div>
    );
  }
}
