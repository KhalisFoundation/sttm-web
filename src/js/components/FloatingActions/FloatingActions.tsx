import React from 'react';

import { AutoScrollControl } from '../AutoScrollControl';
import ScrollToTop from './ScrollToTop';
import FullScreen from './FullScreen';

interface IFloatingActionsProps {
  isShowAutoScroll?: boolean
  isShowScrollToTop?: boolean
  isShowFullScreen?: boolean
}

export class FloatingActions extends React.PureComponent<IFloatingActionsProps, {}> {
  static defaultProps = {
    isShowAutoScroll: true,
    isShowScrollToTop: true,
    isShowFullScreen: true
  }

  constructor(props: Readonly<IFloatingActionsProps>) {
    super(props);
  }

  render() {
    const {
      isShowFullScreen,
      isShowScrollToTop,
      isShowAutoScroll
    } = this.props;
    const isShowIcons = isShowScrollToTop || isShowFullScreen;
    const isShowNothing = !isShowFullScreen && !isShowAutoScroll && !isShowScrollToTop

    if (isShowNothing) return null;

    return (
      <div className="floatingActions">
        {isShowAutoScroll && <AutoScrollControl mode="hidden-controls" isBackgroundTransparent />}
        {isShowIcons && <div className="floatingActionsIcons">
          {isShowScrollToTop && <div className="floatingActionsControl">
            <ScrollToTop />
          </div>}
          {isShowFullScreen && <div className="floatingActionsControl">
            <FullScreen />
          </div>}
        </div>}
      </div>
    )
  }
}