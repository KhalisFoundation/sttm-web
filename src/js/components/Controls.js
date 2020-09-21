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
  setLarivaarAssistStrength,
  resetDisplayOptions,
  resetFontOptions,
  toggleAdvancedOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleSplitViewOption,
  toggleDarkMode,
  toggleSehajPaathMode,
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
    this.lastScroll = 0;
    this.isChangeInControls = false;

    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showAdvancedOptions !== this.props.showAdvancedOptions) {
      this.isChangeInControls = true;
      this.lastScroll = this.$wrapper.offsetTop;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener, {
      passive: true,
    });
  }

  resetControlStyles = () => {
    this.lastScroll = 0;
    this.$wrapper.style.transform = '';
    this.$wrapper.style.position = '';
    this.$wrapper.style.opacity = '';
  }

  applyControlStyles = (isShowWrapper) => {

    if (isShowWrapper) {
      this.$wrapper.style.opacity = 1;
    } else {
      this.$wrapper.style.opacity = 0;
    }

    const oldOffsetTop = this.$wrapper.offsetTop;
    this.$wrapper.style.position = 'sticky';

    // since we are doing position sticky so top offset gonna change.
    this.lastScroll = oldOffsetTop;
  }

  scrollListener = throttle(() => {
    const { fullScreenMode } = this.props;
    if (!fullScreenMode) {
      const controlsOffsetTop = this.$wrapper.offsetTop;
      const controlsHeight = this.$wrapper.offsetHeight;
      const controlsBottom = controlsOffsetTop + controlsHeight;
      const controlsOffset = this.$wrapper.style.position === 'sticky' ? controlsOffsetTop : controlsBottom;

      if (window.scrollY >= controlsOffset) {
        this.$wrapper.style.opacity = 0;

        if (this.isChangeInControls) {
          this.isChangeInControls = false;
          this.$wrapper.style.opacity = 1;
          return;
        }

        return this.setState(prevState => {
          // We are moving in up direction
          if (this.lastScroll >= controlsOffsetTop) {
            this.applyControlStyles(true);

            return {
              ...prevState,
              showBorder: true,
              showControls: true
            };
          }

          // We are moving in downward direction
          this.applyControlStyles(false);
          return {
            ...prevState,
            showBorder: false,
            showControls: false
          };
        });
      }
    }
    // Reset state.
    this.resetControlStyles();
    return this.setState(prevState => ({
      ...prevState,
      showBorder: false,
      showControls: true
    }))

  }, 100);

  setRef = node => (this.$wrapper = node);

  render() {
    const { showBorder, showControls } = this.state;
    const classNames = cx({
      'no-select': true,
      'with-border': showBorder,
    });

    const controlStyles = showControls ?
      {
        transform: '',
      } :
      {
        transform: 'rotateX(90deg) perspective(500px)'
      }

    return (
      <>
        <ShareButtons {...this.props} />
        <div
          style={controlStyles}
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
  setLarivaarAssistStrength,
  resetDisplayOptions,
  resetFontOptions,
  toggleAdvancedOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
  toggleTranslationOptions,
  toggleTransliterationOptions,
  toggleSplitViewOption,
  toggleParagraphMode,
  toggleSehajPaathMode,
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
