import React from 'react';
import { connect } from 'react-redux';
import { Range } from 'react-range';

import { toFixedFloat } from '../../util/numbers';
import { Pause, Play, Loop } from '../../components/Icons/controls';
import { setAutoScrolling } from '@/features/actions';

interface IReduxStateAsProps {
  isAutoScrolling?: boolean;
}
interface IReduxDispatchProps {
  setAutoScrolling?: (action: boolean) => {};
}

interface IAutoScrollControlState {
  isScrolling: boolean;
  scrollingSpeed: number[];
  autoScrollLoopMode: boolean;
}

// Hidden controls controlsState will have all the controls hidden by default and shown only when playing
// Visible controls isControlsVisible will have all the controls visible all the time.
type HideSliderScreenSize = 'never' | 'mobile' | 'tablet' | 'desktop';
interface IAutoScrollControlProps
  extends IReduxDispatchProps,
    IReduxStateAsProps {
  hideSliderScreenSize: HideSliderScreenSize;
  isControlsAlwaysVisible: boolean;
  isBackgroundTransparent: boolean;
  isLoadingAng: boolean;
}

class AutoScrollControl extends React.PureComponent<
  IAutoScrollControlProps,
  IAutoScrollControlState
> {
  static maxScrollingSpeed = 100;
  static minScrollingSpeed = 1;
  // static lowerSpeedThreshHold = 0.4;
  // static higherSpeedThreshHold = 1.2;
  static thresHold = 3.33;
  _maxScrollPossible: number = 0;
  _nextScrollPosition: number = 0;
  _sliding: boolean = false;
  _interval: number = 0;
  _isFirefoxAgent: boolean = false;

  static defaultProps = {
    isBackgroundTransparent: false,
    isControlsAlwaysVisible: true,
    hideSliderScreenSize: 'never',
  };

  constructor(props: Readonly<IAutoScrollControlProps>) {
    super(props);

    this.state = {
      isScrolling: this.props.isAutoScrolling || false,
      scrollingSpeed: [30],
      autoScrollLoopMode: false,
    };
  }

  getHideSliderClass = () => {
    const { hideSliderScreenSize } = this.props;
    if (hideSliderScreenSize === 'never') return '';

    return `hide-${hideSliderScreenSize}`;
  };

  handleScrollSpeedChange = (newSpeed: number[]) => {
    if (!this._sliding) {
      requestAnimationFrame(() => {
        this.setState(
          (state) => ({ ...state, scrollingSpeed: newSpeed }),
          () => {
            this._sliding = false;
          }
        );
      });
      this._sliding = true;
    }
  };

  setSpeed = (operation: string) => () => {
    const [scrollingSpeed] = this.state.scrollingSpeed;
    let newScrollingSpeed: number = 0;

    if (operation === 'increment')
      newScrollingSpeed = Math.min(
        scrollingSpeed + 10,
        AutoScrollControl.maxScrollingSpeed
      );
    else
      newScrollingSpeed = Math.max(
        scrollingSpeed - 10,
        AutoScrollControl.minScrollingSpeed
      );

    this.handleScrollSpeedChange([newScrollingSpeed]);
  };

  toggleAutoScrollState = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.isAutoScrolling) {
      this.removeScroll();
    } else {
      this.startScroll();
    }
  };

  handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  clearScrollInterval = () => {
    cancelAnimationFrame(this._interval);
  };

  startScroll = () => {
    this.props.setAutoScrolling && this.props.setAutoScrolling(true);
    this._nextScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    this._setMaxScrollPossible();
    this._interval = requestAnimationFrame(this.handleAutoScroll);
  };

  handleScrollbarClick = (e: MouseEvent) => {
    const isScrollbarClicked =
      window.innerWidth >= e.pageX && e.pageX >= document.body.scrollWidth;
    if (isScrollbarClicked) {
      e.preventDefault();
      e.stopPropagation();
      this.removeScroll();
    }
  };

  removeScroll = () => {
    this.props.setAutoScrolling && this.props.setAutoScrolling(false);
    this.clearScrollInterval();
  };

  _setMaxScrollPossible = () => {
    this._maxScrollPossible =
      document.documentElement.scrollHeight - window.innerHeight;
  };

  handleAutoScroll = () => {
    if (this.props.isAutoScrolling) {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollY >= this._maxScrollPossible && !this.props.isLoadingAng) {
        this._setMaxScrollPossible();
        const isMaxScrollCrossed = this._maxScrollPossible >= scrollY;
        if (isMaxScrollCrossed) {
          this.removeScroll();
          if (this.state.autoScrollLoopMode) {
            window.scrollTo(0, 0);
            setTimeout(() => {
              this.startScroll();
            }, 1000);
          }
        }
      }

      const [scrollingSpeed] = this.state.scrollingSpeed;
      const movement = toFixedFloat(
        0.1 + (scrollingSpeed / 100) * AutoScrollControl.thresHold,
        2
      );

      // Update next position and scroll
      this._nextScrollPosition = scrollY + movement;
      window.scrollTo(0, Math.round(this._nextScrollPosition));

      this._interval = requestAnimationFrame(this.handleAutoScroll);
    }
  };

  setAutoScrollModeDOMChanges = (isShown: boolean) => {
    const body = document.body;
    if (isShown) {
      body.classList.add('autoscroll-mode');
    } else {
      body.classList.remove('autoscroll-mode');
    }
  };

  addListeners = () => {
    window.addEventListener('mousedown', this.handleScrollbarClick);
    window.addEventListener('touchmove', this.removeScroll);
    window.addEventListener('wheel', this.removeScroll);
  };

  removeListeners = () => {
    window.removeEventListener('mousedown', this.handleScrollbarClick);
    window.removeEventListener('wheel', this.removeScroll);
    window.removeEventListener('touchmove', this.removeScroll);
  };

  componentDidMount = () => {
    this.addListeners();

    this._isFirefoxAgent = navigator.userAgent.indexOf('Firefox') > -1;

    // For now, once this component mounts we are in autoscroll-mode.
    this.setAutoScrollModeDOMChanges(true);
  };

  componentWillUnmount = () => {
    this.clearScrollInterval();
    this.removeListeners();

    //Force this to remove the autoscroll-mode class from the body.
    this.setAutoScrollModeDOMChanges(false);
  };
  toggleAutoScrollLoopMode = () => {
    this.setState({ autoScrollLoopMode: !this.state.autoScrollLoopMode });
  };
  render() {
    const { scrollingSpeed, autoScrollLoopMode } = this.state;
    const hideSliderClass = this.getHideSliderClass();
    const {
      isBackgroundTransparent,
      isAutoScrolling,
      isControlsAlwaysVisible,
    } = this.props;
    const autoScrollControlBgClass = isBackgroundTransparent
      ? 'backgroundTransparent'
      : '';
    const isShowControls = isControlsAlwaysVisible || isAutoScrolling;

    return (
      <div className={`autoScrollControl ${autoScrollControlBgClass}`}>
        <div className="autoScrollControlSpeed">
          <div
            className={`autoScrollControlGroup ${
              isShowControls ? 'visible' : 'hidden'
            }`}
          >
            <label className="autoScrollControlSliderLabel">
              Speed {`(${scrollingSpeed})`}
            </label>
            <div className="autoScrollControlSlider">
              <button
                onClick={this.toggleAutoScrollLoopMode}
                className={`autoScrollLoopModeBtn ${
                  autoScrollLoopMode ? 'on' : ''
                }`}
              >
                <Loop />
              </button>
              <button
                className="autoScrollControlDecreaseSpeed"
                onClick={this.setSpeed('decrement')}
              >
                {' '}
                -{' '}
              </button>
              <Range
                step={1}
                min={AutoScrollControl.minScrollingSpeed}
                max={AutoScrollControl.maxScrollingSpeed}
                onChange={this.handleScrollSpeedChange}
                values={scrollingSpeed}
                renderTrack={({ props, children }) => (
                  <div
                    className={`autoScrollControlSliderTrack ${hideSliderClass}`}
                    {...props}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    className={`autoScrollControlSliderThumb ${hideSliderClass}`}
                    {...props}
                  />
                )}
              />
              <button
                className="autoScrollControlIncreaseSpeed"
                onClick={this.setSpeed('increment')}
              >
                {' '}
                +{' '}
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={this.toggleAutoScrollState}
          className="autoScrollControlPlayBtn"
        >
          {isAutoScrolling ? (
            <Pause onClick={this.handleIconClick} />
          ) : (
            <Play onClick={this.handleIconClick} />
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ isAutoScrolling, isLoadingAng }: any) => ({
  isAutoScrolling,
  isLoadingAng,
});

const mapDispatchToProps: IReduxDispatchProps = {
  setAutoScrolling,
};

// TODO: finding fix for proper typing this
export default connect<
  {},
  {},
  IAutoScrollControlProps,
  IAutoScrollControlState
>(
  mapStateToProps as any,
  mapDispatchToProps
)(AutoScrollControl as any);
