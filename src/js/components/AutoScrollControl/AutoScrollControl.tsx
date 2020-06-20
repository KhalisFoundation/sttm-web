import React from 'react';
import { connect } from 'react-redux';
import { Range } from 'react-range';

import { toFixedFloat } from '../../util/numbers';
import { Pause, Play } from "../../components/Icons/controls";
import { setAutoScrolling } from '@/features/actions';

interface IReduxStateAsProps {
  isAutoScrolling?: boolean;
  autoScrollMode?: boolean;
}
interface IReduxDispatchProps {
  setAutoScrolling?: (action: boolean) => {}
}

interface IAutoScrollControlState {
  isScrolling: boolean;
  scrollingSpeed: number[];
}

// Visible controls isControlsVisible will have all the controls visible all the time.
// Hidden controls controlsState will have all the controls hidden by default and shown only when playing
type HideSliderScreenSize = 'never' | 'mobile' | 'tablet' | 'desktop';
interface IAutoScrollControlProps extends IReduxDispatchProps, IReduxStateAsProps {
  hideSliderScreenSize: HideSliderScreenSize;
  isControlsAlwaysVisible: boolean;
  isBackgroundTransparent: boolean;
}

class AutoScrollControl extends React.PureComponent<IAutoScrollControlProps, IAutoScrollControlState> {

  static maxScrollingSpeed = 100;
  static minScrollingSpeed = 1;
  static minScrollPixelMovement = 0.5;
  static maxScrollPixelMovement = 2;
  _maxScrollPossible!: number;
  _nextScrollPosition!: number;
  _sliding!: boolean;
  _interval!: number;

  static defaultProps = {
    isBackgroundTransparent: false,
    isControlsAlwaysVisible: true,
    hideSliderScreenSize: 'never',
  }

  constructor(props: Readonly<IAutoScrollControlProps>) {
    super(props)

    this.state = {
      isScrolling: false,
      scrollingSpeed: [50],
    }
  }

  getHideSliderClass = () => {
    const { hideSliderScreenSize } = this.props;
    if (hideSliderScreenSize === 'never') return '';

    return `hide-${hideSliderScreenSize}`;
  }

  handleScrollSpeedChange = (newSpeed: number[]) => {
    if (!this._sliding) {
      requestAnimationFrame(() => {
        this.setState(
          () => ({ ...this.state, scrollingSpeed: newSpeed }),
          () => { this._sliding = false })
      });
      this._sliding = true;
    }
  }

  setSpeed = (operation: string) => () => {
    const [scrollingSpeed] = this.state.scrollingSpeed;
    let scrollingSpeedToSet: number = 0;

    if (operation === 'increment')
      scrollingSpeedToSet = Math.min(scrollingSpeed + 10, AutoScrollControl.maxScrollingSpeed)
    else
      scrollingSpeedToSet = Math.max(scrollingSpeed - 10, AutoScrollControl.minScrollingSpeed);

    this.handleScrollSpeedChange([scrollingSpeedToSet]);
  }

  toggleAutoScrollState = () => {
    if (this.state.isScrolling) {
      this.removeScroll();
    } else {
      this.startScroll();
    }
  }

  clearScrollInterval = () => {
    cancelAnimationFrame(this._interval)
  }

  startScroll = () => {
    this.setState(() => ({ ...this.state, isScrolling: true }),
      () => {
        this.props.setAutoScrolling && this.props.setAutoScrolling(true);
        this._maxScrollPossible = document.documentElement.scrollHeight - window.innerHeight;
        this._nextScrollPosition = document.documentElement.scrollTop;
        this._interval = requestAnimationFrame(this.handleAutoScroll);
      })
  }

  handleScrollbarClick = (e: MouseEvent) => {
    const isScrollbarClicked = window.innerWidth >= e.pageX && e.pageX >= document.body.scrollWidth;
    if (isScrollbarClicked) {
      this.removeScroll();
    }
  }

  removeScroll = () => {
    this.setState(() => ({ ...this.state, isScrolling: false }),
      () => {
        this.props.setAutoScrolling && this.props.setAutoScrolling(false);
        this.clearScrollInterval()
      });
  }

  handleAutoScroll = () => {
    if (this.state.isScrolling) {
      const scrollY = document.documentElement.scrollTop;

      if (scrollY >= this._maxScrollPossible) {
        this.removeScroll();
      }

      const [scrollingSpeed] = this.state.scrollingSpeed;

      // We are having minimum scroll per pixel + adding the extra dynamic pixel movement based on slider value.
      const movement = toFixedFloat((AutoScrollControl.minScrollPixelMovement +
        ((scrollingSpeed / 100) *
          (AutoScrollControl.maxScrollPixelMovement - AutoScrollControl.minScrollPixelMovement))), 2);

      // Only allow the scrolling if we have surpassed previous scrolls
      if (scrollY >= Math.floor(this._nextScrollPosition)) {
        this._nextScrollPosition += movement;
        window.scrollTo({ left: 0, top: this._nextScrollPosition, behavior: 'smooth' });
      }

      this._interval = requestAnimationFrame(this.handleAutoScroll);
    }
  }

  setAutoScrollModeDOMChanges = (isShown: boolean) => {
    const body = document.body;
    if (isShown) {
      body.classList.add('autoscroll-mode');
    } else {
      body.classList.remove('autoscroll-mode');
    }
  }

  addListeners = () => {
    window.addEventListener("mousedown", this.handleScrollbarClick);
    window.addEventListener("touchmove", this.removeScroll);
    window.addEventListener("wheel", this.removeScroll);
  }

  removeListeners = () => {
    window.removeEventListener("mousedown", this.handleScrollbarClick);
    window.removeEventListener("wheel", this.removeScroll);
    window.removeEventListener("touchmove", this.removeScroll);
  }

  componentDidMount = () => {
    this.addListeners();
    this.setAutoScrollModeDOMChanges(this.props.autoScrollMode);
  }

  componentDidUpdate = (prevProps: IAutoScrollControlProps) => {
    if (prevProps.autoScrollMode !== this.props.autoScrollMode) {
      this.setAutoScrollModeDOMChanges(this.props.autoScrollMode);
    }

    if (prevProps.isAutoScrolling !== this.props.isAutoScrolling) {
      if (this.props.isAutoScrolling !== this.state.isScrolling) {
        if (this.props.isAutoScrolling)
          this.startScroll()

        this.removeScroll();
      }
    }
  }

  componentWillUnmount = () => {
    console.log('RUNNING ?')
    this.clearScrollInterval();
    this.removeListeners();

    //Force this to remove the autoscroll-mode class from the body.
    this.setAutoScrollModeDOMChanges(false);
  };

  render() {
    const { isScrolling, scrollingSpeed } = this.state;
    const { isBackgroundTransparent, isControlsAlwaysVisible } = this.props;
    const hideSliderClass = this.getHideSliderClass();
    const autoScrollControlBgClass = isBackgroundTransparent ? 'backgroundTransparent' : '';
    const isShowControls = isControlsAlwaysVisible || isScrolling;

    return (
      <div className={`autoScrollControl ${autoScrollControlBgClass}`}>
        <div className="autoScrollControlSpeed">
          <div className={`autoScrollControlGroup ${isShowControls ? 'visible' : 'hidden'}`}>
            <label className="autoScrollControlSliderLabel">
              Speed
            </label>
            <div className="autoScrollControlSlider">
              <button
                className="autoScrollControlDecreaseSpeed"
                onClick={this.setSpeed('decrement')}> - </button>
              <Range
                step={1}
                min={AutoScrollControl.minScrollingSpeed}
                max={AutoScrollControl.maxScrollingSpeed}
                onChange={this.handleScrollSpeedChange}
                values={scrollingSpeed}
                renderTrack={({ props, children }) => (
                  <div
                    className={`autoScrollControlSliderTrack ${hideSliderClass}`}
                    style={{
                      ...props.style,
                    }}
                    {...props}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div className={`autoScrollControlSliderThumb ${hideSliderClass}`}
                    style={{
                      ...props.style,
                    }}
                    {...props}
                  />
                )}
              />
              <button
                className="autoScrollControlIncreaseSpeed"
                onClick={this.setSpeed('increment')}> + </button>
            </div>
          </div>
        </div>
        <button
          onClick={this.toggleAutoScrollState}
          className="autoScrollControlPlayBtn">
          {isScrolling ? <Pause /> : <Play />}
        </button>
      </ div >
    )
  }
}

const mapStateToProps = ({ isAutoScrolling, autoScrollMode }: any) => ({ isAutoScrolling, autoScrollMode })

const mapDispatchToProps: IReduxDispatchProps = {
  setAutoScrolling
}

// TODO: finding fix for proper typing this
export default connect<{}, {}, IAutoScrollControlProps, IAutoScrollControlState>(mapStateToProps as any, mapDispatchToProps)(AutoScrollControl as any);
