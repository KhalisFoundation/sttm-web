import React from 'react';
import PropTypes from 'prop-types';
import Chevron from '@/components//Icons/Chevron';

/**
 *
 *
 * @export
 * @class ScrollToTop
 * @extends {React.PureComponent}
 */
export default class ScrollToTop extends React.PureComponent {
  static defaultProps = {
    disableSmoothScrollingAt: 6000,
  };

  /**
   * @typedef {object} ScrollToTopProps
   * @property {number} [disableSmoothScrollingAt=4000]
   *
   * @static
   * @memberof ScrollToTop
   */
  static propTypes = {
    disableSmoothScrollingAt: PropTypes.number,
  };

  /**
   * handles click event
   *
   * @memberof ScrollToTop
   */
  handleClick = () => {
    const prevValue = document.body.style.scrollBehavior;
    // If user has scrolled for 4000 pixels, smooth scrolling would take a lot of time
    if (window.scrollY > this.props.disableSmoothScrollingAt) {
      document.body.style.scrollBehavior = document.documentElement.style.scrollBehavior =
        'auto';
    }
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        document.body.style.scrollBehavior = document.documentElement.style.scrollBehavior = prevValue;
      });
    });
  };

  render() {
    return (
      <div className="scroll-to-top" onClick={this.handleClick}>
        <Chevron direction={Chevron.DIRECTIONS.TOP} />
      </div>
    );
  }
}
