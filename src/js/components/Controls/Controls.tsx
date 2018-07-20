import React from 'react';
import { connect } from 'react-redux';
import ShabadControls from '@/components/ShabadControls';
import ShareButtons from '@/components/ShareButtons';
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
  toggleUnicodeOption,
  toggleSplitViewOption,
  toggleDarkMode,
} from '@/features/actions';

class Controls extends React.PureComponent {
  state = {
    showBorder: false,
  };

  static supportedMedia = ShareButtons.supportedMedia;

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
    } else {
      if (this.mounted && this.state.showBorder === true) {
        this.setState({ showBorder: false });
      }
    }
  };

  setRef = node => (this.$wrapper = node);

  render() {
    return (
      <div
        id="controls-wrapper"
        className={`no-select ${this.state.showBorder ? 'with-border' : ''}`}
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
  toggleUnicodeOption,
  toggleSplitViewOption,
  toggleDarkMode,
};

// TODO: Connect individual components instead of all controls.
export default connect(
  stateToProps,
  dispatchToProps
)(Controls);
