import React, { ChangeEvent } from 'react';

interface IAutoScrollControlState {
  isScrolling: boolean;
  scrollingSpeed: number;
}

export class AutoScrollControl extends React.PureComponent<{}, IAutoScrollControlState> {

  static maxScrollingSpeed = 100;
  static minScrollPixelMovement = 0.5;
  static maxScrollPixelMovement = 2;
  _maxScrollPossible!: number;
  _nextScrollPosition!: number;
  _sliding!: boolean;
  _interval!: any;

  constructor(props: Readonly<{}>) {
    super(props)

    this.state = {
      isScrolling: false,
      scrollingSpeed: 50,
    }
  }

  handleScrollSpeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number(e.currentTarget.value);

    if (!this._sliding) {
      requestAnimationFrame(() => {
        this.setState(
          () => ({ ...this.state, scrollingSpeed: newSpeed }),
          () => { this._sliding = false })
      });
      this._sliding = true;
    }
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
    const { isScrolling, scrollingSpeed } = this.state;
    if (isScrolling) {
      const scrollY = document.documentElement.scrollTop;

      if (scrollY >= this._maxScrollPossible) {
        this.removeScroll();
      }

      // We are having minimum scroll per pixel + adding the extra dynamic pixel movement based on slider value.
      let movement = (AutoScrollControl.minScrollPixelMovement + ((scrollingSpeed / 100) * (AutoScrollControl.maxScrollPixelMovement - AutoScrollControl.minScrollPixelMovement)));
      movement = parseFloat(movement.toFixed(2));

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

    return (
      <div className="autoScrollControl">
        <button onClick={this.toggleAutoScrollState} className="autoScrollControlBtn">
          {isScrolling ? 'Pause' : 'Start'}
        </button>
        <div className="autoScrollControlSpeed">
          <label>
            Change Speed
          <input
              title={scrollingSpeed.toString()}
              id="changeSpeed"
              type="range"
              min="1"
              step="1"
              onInput={this.handleScrollSpeedChange}
              max={AutoScrollControl.maxScrollingSpeed}
              value={scrollingSpeed} />
          </label>
          <span className="autoScrollControlSpeedValue">{scrollingSpeed}</span>
        </div>
      </div>
    )
  }
}
