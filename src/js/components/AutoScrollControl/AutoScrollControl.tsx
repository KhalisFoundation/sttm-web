import React, { ChangeEvent } from 'react';

interface IAutoScrollControlState {
  isScrolling: boolean;
  scrollingSpeed: number;
}

export class AutoScrollControl extends React.PureComponent<{}, IAutoScrollControlState> {

  static maxScrollingSpeed = 100;
  static maxScrollPixelMovement = 25;
  static minScrollPixelMovement = 5;
  static minInterval = 10;
  static fps = 1000 / 40;
  _maxScrollPossible!: number;
  _nextScrollPosition!: number;
  _sliding!: boolean;
  // _then: number;
  // _isFirstIteration: boolean;
  _interval!: NodeJS.Timeout;


  constructor(props: Readonly<{}>) {
    super(props)

    this.state = {
      isScrolling: false,
      scrollingSpeed: 50,
    }
  }

  handleScrollSpeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value, ' new value')
    const newSpeed = ((e.currentTarget.value as unknown) as number);
    // console.log(this._sliding, "sliding..")
    if (!this._sliding) {
      requestAnimationFrame(() => {
        this.setState(() => { return { ...this.state, scrollingSpeed: newSpeed } }, () => {
          this._sliding = false;
        })
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
    clearInterval(this._interval)
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
      // this._then = Date.now();
      // this._isFirstIteration = true;
      // window.addEventListener('scroll', this.handleAutoScroll);
      this._interval = setInterval(this.handleAutoScroll, AutoScrollControl.fps);
    })
  }

  removeScroll = () => {
    this.setState(() => {
      return {
        ...this.state,
        isScrolling: false
      }
    }, this.clearScrollInterval);
    // window.removeEventListener('scroll', this.handleAutoScroll);
  }

  handleAutoScroll = () => {
    // console.log(window.scrollY, window.innerHeight, 'window .inner height..')
    if (this.state.isScrolling) {
      const scrollY = document.documentElement.scrollTop;
      if (scrollY >= this._maxScrollPossible) {
        this.removeScroll();
      }

      let movement = (AutoScrollControl.minScrollPixelMovement + ((this.state.scrollingSpeed / 100) * (AutoScrollControl.maxScrollPixelMovement - AutoScrollControl.minScrollPixelMovement))) / AutoScrollControl.fps;
      movement = Number(movement.toFixed(2));
      this._nextScrollPosition += movement;
      // const now = Date.now();
      // const elapsed = now - this._then;
      // console.log(movement, this._nextScrollPosition)
      // if (elapsed >= AutoScrollControl.minInterval || this._isFirstIteration) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      // this._then = now - (elapsed % AutoScrollControl.minInterval);
      window.scrollTo({ left: 0, top: this._nextScrollPosition, behavior: 'smooth' });
      // document.documentElement.scrollTop += movement < 0.5 ? 0.5 : movement;
      // console.log(newScrollPosition, this.state.scrollingSpeed, movement, "..........")
      // this._isFirstIteration = false;
      // requestAnimationFrame(this.handleAutoScroll);
      // }
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
    // console.log(document.documentElement, this._maxScrollPossible, window.innerHeight);
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
