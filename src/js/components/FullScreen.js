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
    this.setState({ isFullScreen: !this.state.isFullScreen });
  };

  handleFullScreen = () => {
    this.setState({ isFullScreen: document.fullscreen || document.webkitIsFullScreen });
  }

  componentDidUpdate() {
    if (this.state.isFullScreen) {
      document.body.classList.remove('fullscreen-view');
      document.exitFullscreen();
    } else {
      document.body.classList.add('fullscreen-view');
      document.querySelector('html').requestFullscreen();
    }
  }

  componentDidMount() {
    this.setState({ isFullScreen: document.fullscreen || false });
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
