import React from 'react';
import { connect } from 'react-redux';

import FullscreenIcon from '../../Icons/FullscreenIcon';
import { setFullScreenMode } from '../../../features/actions';
interface IFullScreenProps {
  setFullScreenMode: (payload: boolean) => {}
}

interface IFullScreenState {
  isFullScreen: boolean
}

class FullScreen extends React.PureComponent<IFullScreenProps, IFullScreenState> {

  state = {
    isFullScreen: false,
  }

  $htmlNode = document.querySelector('html');

  handleClick = () => {
    this.setState({ isFullScreen: !this.state.isFullScreen });
  };

  handleFullScreen = () => {
    this.setState({ isFullScreen: document.fullscreen || document.webkitIsFullScreen });
  }

  componentDidMount() {
    this.setState({ isFullScreen: document.fullscreen || document.webkitIsFullScreen || false });
    document.addEventListener('fullscreenchange', this.handleFullScreen);
  }

  componentDidUpdate() {
    const html = this.$htmlNode;
    const { setFullScreenMode } = this.props;
    if (this.state.isFullScreen) {
      document.body.classList.add('fullscreen-view');
      html.requestFullscreen && html.requestFullscreen();
      html.webkitRequestFullscreen && html.webkitRequestFullscreen();
      setFullScreenMode(true);
    } else {
      document.fullscreen && document.exitFullscreen();
      document.body.classList.remove('fullscreen-view');
      setFullScreenMode(false);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.handleFullScreen);
  }

  render() {
    const { isFullScreen } = this.state;
    return (
      <div className="fab scroll-to-top fullscreen" onClick={this.handleClick}>
        <FullscreenIcon state={isFullScreen} />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps: any = {
  setFullScreenMode
}

export default connect(mapStateToProps, mapDispatchToProps)(FullScreen);
