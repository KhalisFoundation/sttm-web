import React from 'react';
import FullscreenIcon from './Icons/FullscreenIcon';

/**
 *
 *
 * @export
 * @class FullScreen
 * @extends {React.PureComponent}
 */
export default class FullScreen extends React.PureComponent {

  state = {
    isFullScreen: false,
  }

  handleClick = () => {
    this.state.isFullScreen ?
      document.exitFullscreen() :
      document.querySelector('html').requestFullscreen();
  };

  handleFullScreen = () => {
    document.body.classList[document.fullscreen ? 'add' : 'remove']('fullscreen-view');
    this.setState({ isFullScreen: document.fullscreen });
  }

  componentDidMount() {
    this.setState({ isFullScreen: document.fullscreen });
    document.addEventListener('fullscreenchange', this.handleFullScreen);
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.handleFullScreen);
  }

  render() {
    const { isFullScreen } = this.state;
    return (
      <div className="scroll-to-top fullscreen" onClick={this.handleClick}>
        <FullscreenIcon state={isFullScreen} />
      </div>
    );
  }
}
