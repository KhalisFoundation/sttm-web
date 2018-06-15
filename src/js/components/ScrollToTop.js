import React from 'react';
import Chevron from './Icons/Chevron';

export default class ScrollToTop extends React.PureComponent {
  handleClick() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="scroll-to-top" onClick={this.handleClick}>
        <Chevron direction={Chevron.DIRECTIONS.TOP} />
      </div>
    );
  }
}
