import React from 'react';

import AutoScrollControl from '../../AutoScrollControl';
import ScrollToTop from './ScrollToTop';
import FullScreen from './FullScreen';
import DisplaySettingsButton from '@/components/DisplaySettingsButton';
import AIButton from './AIButton';

interface Props {
  onIconButtonClick?: () => {},
  isShowAutoScroll?: boolean;
  isShowScrollToTop?: boolean;
  isShowFullScreen?: boolean;
  isShowSettings?: boolean;
  isShowAI?: boolean;
  isNoFloat?: boolean;
  iconPosition?: 'Top' | 'Bottom';
  iconShadow?: 'show' | 'hide';
  customization?: {
    iconClassName?: string;
  }
  CustomIcon?: React.FC | React.ReactNode;
  customIconProps?: React.ComponentProps<any>;
  showPinSettings?: boolean;
  onAIClick?: () => void;
  isAIActive?: boolean;
}

export const FloatingActions = (props: Props) => {
  const {
    isShowFullScreen,
    isShowScrollToTop,
    isShowAutoScroll,
    isShowSettings,
    isShowAI,
    showPinSettings,
    onAIClick,
    isAIActive,
  } = props;
  const isShowIcons = isShowScrollToTop || isShowFullScreen || isShowAI
  const isShowNothing = !isShowFullScreen && !isShowAutoScroll && !isShowScrollToTop && !isShowAI && !Boolean(props.CustomIcon);
  const isLastIcon = [isShowScrollToTop, isShowFullScreen, isShowAI]
    .filter(isShowEntry => isShowEntry).length === 1;
  const lastIconStyles = isLastIcon ? { margin: 0 } : {};
  if (isShowNothing) return null;
  return (
    <div className={`floatingActions floatingActions${props.iconPosition ?? 'Bottom'} ${showPinSettings ? 'pin-settings-floating-icons' : ''} ${props.iconShadow === 'hide' ? 'no-shadow' : ''} ${props.customization?.iconClassName ?? ''} ${props.isNoFloat ? 'no-float' : ''}`}>
      {props.CustomIcon ?
        <button className='floatingActionsTopIcon' onClick={props.onIconButtonClick}>
          <props.CustomIcon {...props.customIconProps} />
        </button>
        :
        <>
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
              {isShowAI &&
                <div
                  style={lastIconStyles}
                  className="floatingActionsControl">
                  <AIButton
                    onClick={onAIClick || (() => {})}
                    isActive={isAIActive || false}
                  />
                </div>}
              {isShowScrollToTop &&
                <div style={lastIconStyles} className="floatingActionsControl">
                  <DisplaySettingsButton isShowSettings={isShowSettings} />
                </div>
              }
            </div>
          }
        </>}
    </div>
  )
}

export default FloatingActions;
