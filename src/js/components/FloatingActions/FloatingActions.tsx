import React from 'react';

import { AutoScrollControl } from '../AutoScrollControl';
import ScrollToTop from './ScrollToTop';
import FullScreen from './FullScreen';

export class FloatingActions extends React.PureComponent {
  render() {
    return (
      <div className="floatingActions">
        <AutoScrollControl isBackgroundTransparent />
        <div className="floatingActionsIcons">
          <div className="floatingActionsControl">
            <FullScreen />
          </div>
          <div className="floatingActionsControl">
            <ScrollToTop />
          </div>
        </div>
      </div>
    )
  }
}