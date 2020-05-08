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

  $htmlNode = document.querySelector('html');

  handleClick = () => {
    this.setState({ isFullScreen: !this.state.isFullScreen });
  };

  handleFullScreen = () => {
    this.setState({ isFullScreen: document.fullscreen });
  }

  componentDidMount() {
    this.setState({ isFullScreen: document.fullscreen });
    document.addEventListener('fullscreenchange', this.handleFullScreen);
  }

  componentDidUpdate() {
    const html = this.$htmlNode;
    if (this.state.isFullScreen) {
      document.body.classList['add']('fullscreen-view');
      html.requestFullscreen && html.requestFullscreen();
      html.webkitRequestFullscreen && html.webkitRequestFullscreen();
    } else {
      document.fullscreen && document.exitFullscreen();
      document.body.classList['remove']('fullscreen-view');
    }
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
