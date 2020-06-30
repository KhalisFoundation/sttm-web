import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import throttle from 'lodash.throttle';

import ShabadControls from './ShabadControlsv2';
import ShareButtons, { supportedMedia as _s } from './ShareButtons';

import {
  setFontSize,
  setTranslationFontSize,
  setTransliterationFontSize,
  setLineHeight,
  setTranslationLanguages,
  setTransliterationLanguages,
  resetDisplayOptions,
  resetFontOptions,
  toggleAdvancedOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleSplitViewOption,
  toggleDarkMode,
  toggleAutoScrollMode,
  toggleParagraphMode,
  toggleVisraams,
  setVisraamSource,
  setVisraamStyle,
  changeFont,
  toggleCenterAlignOption,
} from '../features/actions';

export const supportedMedia = _s;

class Controls extends React.Component {
  state = {
    showBorder: false,
    lastScrollPos: 0,
    showControls: true
  };

  componentDidMount() {
    this.mounted = true;
    this.lastScroll = 0;
    this.showAdvancedOptions = this.props.showAdvancedOptions;
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('scroll', this.scrollListener, {
      passive: true,
    });
  }

  scrollListener = throttle(() => {
    this.originalWrapperBottom = this.$wrapper.offsetTop + this.$wrapper.offsetHeight;
    // console.log(this.$wrapper.style.position, window.scrollY, '> original wrapper botttom <')
    const controlsOffset = this.$wrapper.style.position === 'sticky' ? this.$wrapper.offsetTop : this.originalWrapperBottom;
    if (window.scrollY >= controlsOffset) {
      this.$wrapper.style.opacity = '0';
      this.$wrapper.style.position = 'sticky';
      if (this.mounted && this.state.showBorder === false) {
        this.setState({ showBorder: true });
      }

      const { showAdvancedOptions } = this.props;
      const currentScroll = this.originalWrapperBottom;

      if (this.showAdvancedOptions !== showAdvancedOptions) {
        this.showAdvancedOptions = showAdvancedOptions;
        this.lastScroll = currentScroll;
        window.scrollBy({
          top: -2,
        })
        return;
      }

      this.setState(prevState => {
        if (this.lastScroll >= currentScroll) {
          this.$wrapper.style.opacity = '1';
          this.lastScroll = currentScroll;
          return {
            ...prevState,
            showControls: true
          };
        }

        this.$wrapper.style.opacity = '0';
        this.lastScroll = currentScroll;
        return {
          ...prevState,
          showControls: false
        };
      });
    } else {
      this.$wrapper.style.position = 'static';
      if (this.mounted && this.state.showBorder === true) {
        this.setState({ showBorder: false });
      }
    }
  }, 100);

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
      <>
        <ShareButtons {...this.props} />
        <div
          id="controls-wrapper"
          className={classNames}
          ref={this.setRef}
        >
          <ShabadControls {...this.props} />

        </div>
      </>
    );
  }
}

// TODO: Take exactly what we need.
const stateToProps = state => state;

const dispatchToProps = {
  setFontSize,
  setTranslationFontSize,
  setTransliterationFontSize,
  setTranslationLanguages,
  setTransliterationLanguages,
  resetDisplayOptions,
  resetFontOptions,
  toggleAdvancedOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleSplitViewOption,
  toggleParagraphMode,
  toggleDarkMode,
  toggleAutoScrollMode,
  toggleVisraams,
  setLineHeight,
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
