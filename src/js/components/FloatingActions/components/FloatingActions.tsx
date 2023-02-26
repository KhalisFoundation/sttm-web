import React from 'react';

import AutoScrollControl from '../../AutoScrollControl';
import ScrollToTop from './ScrollToTop';
import FullScreen from './FullScreen';
import DisplaySettingsButton from '@/components/DisplaySettingsButton';

interface IFloatingActionsProps {
  isShowAutoScroll?: boolean;
  isShowScrollToTop?: boolean;
  isShowFullScreen?: boolean;
  isShowSettings: boolean;
  showPinSettings: boolean;
}

export class FloatingActions extends React.PureComponent<IFloatingActionsProps, {}> {
  static defaultProps = {
    isShowAutoScroll: true,
    isShowScrollToTop: true,
    isShowFullScreen: true,
    isShowSettings: false,
    showPinSettings: false,
  }

  constructor(props: Readonly<IFloatingActionsProps>) {
    super(props);
  }

  render() {
    const {
      isShowFullScreen,
      isShowScrollToTop,
      isShowAutoScroll,
      isShowSettings,
      showPinSettings,
    } = this.props;
    const isShowIcons = isShowScrollToTop || isShowFullScreen;
    const isShowNothing = !isShowFullScreen && !isShowAutoScroll && !isShowScrollToTop
    const isLastIcon = [isShowScrollToTop, isShowFullScreen, isShowAutoScroll]
      .filter(isShowEntry => isShowEntry).length === 1;
    const lastIconStyles = isLastIcon ? { margin: 0 } : {};
    
    if (isShowNothing) return null;

    return (
      <div className={`floatingActions ${showPinSettings ? 'pin-settings-floating-icons' : ''}`}>
        {isShowAutoScroll &&
          <AutoScrollControl
            hideSliderScreenSize="mobile"
            isControlsAlwaysVisible={false}
            isBackgroundTransparent />}
        {isShowIcons &&
          <div className="floatingActionsIcons">
            {isShowScrollToTop &&
              <div
                style={lastIconStyles}
                className="floatingActionsControl">
                <ScrollToTop />
              </div>}
            {isShowFullScreen &&
              <div
                style={lastIconStyles}
                className="floatingActionsControl">
                <FullScreen />
              </div>}
            {isShowScrollToTop &&
              <div style={lastIconStyles} className="floatingActionsControl">
                <DisplaySettingsButton isShowSettings={isShowSettings} />
              </div>
            }
          </div>}
      </div>
    )
  }
}