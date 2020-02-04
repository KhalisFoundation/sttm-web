import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import ShabadControls from './ShabadControls';
import ShareButtons, { supportedMedia as _s } from './ShareButtons';
import {
  setFontSize,
  setTranslationLanguages,
  setTransliterationLanguages,
  resetDisplayOptions,
  resetFontOptions,
  toggleDisplayOptions,
  toggleFontOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleSplitViewOption,
  toggleDarkMode,
  toggleVisraams,
  setVisraamSource,
  setVisraamStyle,
  changeFont,
  toggleCenterAlignOption,
} from '../features/actions';

export const supportedMedia = _s;

class Controls extends React.PureComponent {
  state = {
    showBorder: false,
    lastScrollPos: 0,
    showControls: true
  };

  componentDidMount() {
    this.mounted = true;
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('scroll', this.scrollListener, {
      passive: true,
    });
  }

  scrollListener = () => {
    if (window.scrollY >= this.$wrapper.offsetTop) {
      if (this.mounted && this.state.showBorder === false) {
        this.setState({ showBorder: true });
      }

      const currentScroll = this.$wrapper.offsetTop;
      const { showDisplayOptions, showFontOptions } = this.props;
      this.setState(prevState => {
        const { showControls, lastScrollPos } = prevState;

        if (lastScrollPos >= currentScroll) {
          return {
            lastScrollPos: currentScroll,
            showControls: !showControls
              ? true
              : showControls
          };
        }
        return {
          lastScrollPos: currentScroll,
          showControls: showControls &&
            !showDisplayOptions &&
            !showFontOptions ?
            false :
            showControls
        };
      });
    } else {
      if (this.mounted && this.state.showBorder === true) {
        this.setState({ showBorder: false });
      }
    }
  };

  setRef = node => (this.$wrapper = node);

  render() {
    const { showBorder, showControls } = this.state;
    const classNames = cx({
      'no-select': true,
      'with-border': showBorder,
      'show-controls': showControls,
      'hide-controls': !showControls,
    });
    return (
      <div
        id="controls-wrapper"
        className={classNames}
        ref={this.setRef}
      >
        <ShareButtons {...this.props} />
        <ShabadControls {...this.props} />
      </div>
    );
  }
}

// TODO: Take exactly what we need.
const stateToProps = state => state;

const dispatchToProps = {
  setFontSize,
  setTranslationLanguages,
  setTransliterationLanguages,
  resetDisplayOptions,
  resetFontOptions,
  toggleDisplayOptions,
  toggleFontOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleSplitViewOption,
  toggleDarkMode,
  toggleVisraams,
  setVisraamSource,
  setVisraamStyle,
  changeFont,
  toggleCenterAlignOption,
};

// TODO: Connect individual components instead of all controls.
export default connect(
  stateToProps,
  dispatchToProps
)(Controls);
