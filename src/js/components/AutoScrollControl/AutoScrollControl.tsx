import React from 'react';
import { Range } from 'react-range';
import { toFixedFloat } from '../../util/numbers';
import { Pause, Play } from "../../components/Icons/controls";

interface IAutoScrollControlState {
  isScrolling: boolean;
  scrollingSpeed: number[];
}

interface IAutoScrollControlProps {
  isBackgroundTransparent: boolean;
}

export class AutoScrollControl extends React.PureComponent<IAutoScrollControlProps, IAutoScrollControlState> {


  static maxScrollingSpeed = 100;
  static minScrollingSpeed = 1;
  static minScrollPixelMovement = 0.5;
  static maxScrollPixelMovement = 2;
  _maxScrollPossible!: number;
  _nextScrollPosition!: number;
  _sliding!: boolean;
  _interval!: any;

  static defaultProps = {
    isBackgroundTransparent: false
  }

  constructor(props: Readonly<IAutoScrollControlProps>) {
    super(props)

    this.state = {
      isScrolling: false,
      scrollingSpeed: [50],
    }
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
    switch (operation) {
      case 'increment': scrollingSpeedToSet = Math.min(scrollingSpeed + 10, AutoScrollControl.maxScrollingSpeed)
        break;
      case 'decrement': scrollingSpeedToSet = Math.max(scrollingSpeed - 10, AutoScrollControl.minScrollingSpeed);
        break;
    }
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
    this.setState(() => {
      return {
        ...this.state,
        isScrolling: true,
      }
    }, () => {
      this._maxScrollPossible = document.documentElement.scrollHeight - window.innerHeight;
      this._nextScrollPosition = document.documentElement.scrollTop;
      this._interval = requestAnimationFrame(this.handleAutoScroll);
    })
  }

  removeScroll = () => {
    this.setState(() => ({ ...this.state, isScrolling: false }), this.clearScrollInterval);
  }

  handleAutoScroll = () => {
    if (this.state.isScrolling) {
      const scrollY = document.documentElement.scrollTop;

      if (scrollY >= this._maxScrollPossible) {
        this.removeScroll();
      }

      const [scrollingSpeed] = this.state.scrollingSpeed;
      // We are having minimum scroll per pixel + adding the extra dynamic pixel movement based on slider value.
      let movement = (AutoScrollControl.minScrollPixelMovement +
        ((scrollingSpeed / 100) * (AutoScrollControl.maxScrollPixelMovement - AutoScrollControl.minScrollPixelMovement)));
      movement = toFixedFloat(movement, 2);

      if (scrollY >= Math.floor(this._nextScrollPosition)) {
        this._nextScrollPosition += movement;
        window.scrollTo({ left: 0, top: this._nextScrollPosition, behavior: 'smooth' });
      }

      this._interval = requestAnimationFrame(this.handleAutoScroll);
    }
  }

  addListeners = () => {
    window.addEventListener("touchmove", this.removeScroll);
    window.addEventListener("wheel", this.removeScroll);
  }

  removeListeners = () => {
    window.removeEventListener("wheel", this.removeScroll);
    window.removeEventListener("touchmove", this.removeScroll);
  }

  componentDidMount = () => {
    this.addListeners();
  }

  componentWillUnmount = () => {
    this.clearScrollInterval();
    this.removeListeners();
  };

  render() {
    const { isScrolling, scrollingSpeed } = this.state;
    const { isBackgroundTransparent } = this.props;

    return (
      <div className={`autoScrollControl ${isBackgroundTransparent ? 'backgroundTransparent' : ''}`}>
        <div className="autoScrollControlSpeed">

          <div className="autoScrollControlGroup">
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
                    className="autoScrollControlSliderTrack"
                    {...props}
                    style={{
                      ...props.style,
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div className="autoScrollControlSliderThumb"
                    {...props}
                    style={{
                      ...props.style,
                    }}
                  />
                )}
              />
              <button
                className="autoScrollControlIncreaseSpeed"
                onClick={this.setSpeed('increment')}> + </button>
            </div>
          </div>
          {/* <span className="autoScrollControlSpeedValue">{scrollingSpeed}</span> */}
        </div>
        <button
          onClick={this.toggleAutoScrollState}
          className="autoScrollControlPlayBtn">
          {isScrolling ? <Pause /> : <Play />}
        </button>
      </ div>
    )
  }
}
