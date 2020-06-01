import React, { ChangeEvent } from 'react';

interface IAutoScrollControlState {
  isScrolling: boolean;
  scrollingSpeed: number;
}


export class AutoScrollControl extends React.PureComponent<{}, IAutoScrollControlState> {

  static maxScrollingSpeed = 100;
  static maxScrollPixelMovement = 6;
  _maxScrollPossible!: number;
  _nextScrollPosition!: number;
  _sliding!: boolean;

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
    console.log(this._sliding, "sliding..")
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

  startScroll = () => {
    this.setState(() => {
      return {
        ...this.state,
        isScrolling: true,
      }
    })
    this._maxScrollPossible = document.documentElement.scrollHeight - window.innerHeight;
    this._nextScrollPosition = window.scrollY;

    window.addEventListener('scroll', this.handleAutoScroll);
    requestAnimationFrame(this.handleAutoScroll);
  }

  removeScroll = () => {
    this.setState(() => {
      return {
        ...this.state,
        isScrolling: false
      }
    });
    window.removeEventListener('scroll', this.handleAutoScroll);
  }

  handleAutoScroll = () => {
    // console.log(window.scrollY, window.innerHeight, 'window .inner height..')
    const scrollY = window.scrollY;
    if (this.state.isScrolling) {
      if (scrollY >= this._maxScrollPossible) {
        this.removeScroll();
      }

      const movement = Math.floor((this.state.scrollingSpeed / 100) * AutoScrollControl.maxScrollPixelMovement);
      const newScrollPosition = (scrollY + movement) === scrollY ? scrollY + movement : scrollY + 1;

      // console.log(scrollY, this._nextScrollPosition, this._maxScrollPossible, ".....")
      if (this._nextScrollPosition === scrollY) {
        // console.log(newScrollPosition, this.state.scrollingSpeed, movement, "..........")
        window.scrollTo({ left: 0, top: newScrollPosition, behavior: 'smooth' });

        this._nextScrollPosition = newScrollPosition;

        requestAnimationFrame(this.handleAutoScroll);
      }
    }
  }

  componentDidMount = () => {
    // console.log(document.documentElement, this._maxScrollPossible, window.innerHeight);
    window.addEventListener("touchmove", this.removeScroll);
    window.addEventListener("wheel", this.removeScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.startScroll);
    window.removeEventListener("wheel", this.removeScroll);
    window.removeEventListener("touchmove", this.removeScroll);
  };

  render() {
    const { isScrolling, scrollingSpeed } = this.state;
    return (
      <div className="autoScrollControl">
        <button onClick={this.toggleAutoScrollState} className="autoScrollControlBtn">
          {isScrolling ? 'Pause' : 'Start'}
        </button>
        <label>
          Change Speed
          <input
            id="changeSpeed"
            type="range"
            min="1"
            step="1"
            onInput={this.handleScrollSpeedChange}
            max={AutoScrollControl.maxScrollingSpeed}
            value={scrollingSpeed} />
        </label>
      </div>
    )
  }
}
