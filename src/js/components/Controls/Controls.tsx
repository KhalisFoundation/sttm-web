import React from 'react';
import ShabadControls from '../ShabadControls';
import ShareButtons, { supportedMedia as _s } from '../ShareButtons';
import { State } from '@/features/types';
import { IShabadControlsProps } from '../ShabadControls/ShabadControls';

export const supportedMedia = _s;

export type IControlsProps = IShabadControlsProps;

export default class Controls extends React.PureComponent<IControlsProps> {
  public state = {
    showBorder: false,
  };

  private mounted = false;

  private $wrapperRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    this.mounted = true;
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  public componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('scroll', this.scrollListener);
  }

  public scrollListener = () => {
    if (this.$wrapperRef.current === null) {
      return;
    }

    if (window.scrollY >= this.$wrapperRef.current.offsetTop) {
      if (this.mounted && this.state.showBorder === false) {
        this.setState({ showBorder: true });
      }
    } else {
      if (this.mounted && this.state.showBorder === true) {
        this.setState({ showBorder: false });
      }
    }
  };

  public render() {
    return (
      <div
        id="controls-wrapper"
        className={`no-select ${this.state.showBorder ? 'with-border' : ''}`}
        ref={this.$wrapperRef}
      >
        <ShareButtons {...this.props} />
        <ShabadControls {...this.props} />
      </div>
    );
  }
}
