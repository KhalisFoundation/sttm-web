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
    this.setState({ isFullScreen: !this.state.isFullScreen })
  };

  handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.body.classList.add('fullscreen-view');
    } else {
      document.body.classList.remove('fullscreen-view');
    }
  }

  componentDidMount() {
    document.querySelector('html').addEventListener('fullscreenchange', this.handleFullScreen);
  }

  componentWillUnmount() {
    document.querySelector('html').removeEventListener('fullscreenchange', this.handleFullScreen);
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
