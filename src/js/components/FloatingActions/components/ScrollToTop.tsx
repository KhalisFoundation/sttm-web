import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAutoScrolling } from '../../../features/actions';
import Chevron from '../../Icons/Chevron';

/**
 *
 *
 * @export
 * @class ScrollToTop
 * @extends {React.PureComponent}
 */
class ScrollToTop extends React.PureComponent {
  static defaultProps = {
    disableSmoothScrollingAt: 6000,
  };

  /**
   * @typedef {object} ScrollToTopProps
   * @property {number} [disableSmoothScrollingAt=4000]
   * @property {Func} [setAutoScrolling]
   *
   * @static
   * @memberof ScrollToTop
   */
  static propTypes = {
    setAutoScrolling: PropTypes.func,
    disableSmoothScrollingAt: PropTypes.number,
  };

  /**
   * handles click event
   *
   * @memberof ScrollToTop
   */
  handleClick = () => {
    const prevValue = document.body.style.scrollBehavior;
    const { setAutoScrolling } = this.props;

    // Stop the autoscrolling when we are doing scroll to top
    setAutoScrolling(false);

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
      <div className="fab scroll-to-top" onClick={this.handleClick}>
        <Chevron direction={Chevron.DIRECTIONS.TOP} />
      </div>
    );
  }
}

// TODO: Take exactly what we need.
const stateToProps = () => ({});

const dispatchToProps = {
  setAutoScrolling,
};


export default connect(stateToProps, dispatchToProps)(ScrollToTop)
