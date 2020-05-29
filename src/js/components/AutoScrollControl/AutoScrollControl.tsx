import React, { ChangeEvent } from 'react';

interface IAutoScrollControlState {
  isScrolling: boolean;
  scrollingSpeed: number;
}


export class AutoScrollControl extends React.PureComponent<{}, IAutoScrollControlState> {

  static maxScrollingSpeed = 100;
  static maxScrollPixelMovement = 10;

  constructor(props) {
    super(props)

    this.state = {
      isScrolling: true,
      scrollingSpeed: 50,
    }
  }

  handleScrollSpeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, ' new value')
    this.setState(() => {
      return {
        ...this.state,
        scrollingSpeed: parseInt(e.target.value, 10)
      }
    })
  }

  handleAutoScroll = () => {
    if (window.scrollY !== window.innerHeight) {
      const { scrollingSpeed } = this.state;
      let scrollY = window.scrollY;
      scrollY += (scrollingSpeed / 100) * AutoScrollControl.maxScrollPixelMovement

      window.scrollTo(0, scrollY);

      requestAnimationFrame(this.handleAutoScroll);
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleAutoScroll, { passive: true });
  }

  render() {
    const { isScrolling, scrollingSpeed } = this.state;
    return (
      <div className="autoScrollController">
        <button className="autoScrollControllerBtn">
          {isScrolling ? 'Pause' : 'Start'}
        </button>
        <label>
          Change Speed
          <input
            id="changeSpeed"
            type="range"
            min="0"
            step="1"
            max={AutoScrollControl.maxScrollingSpeed}
            value={scrollingSpeed} />
        </label>
      </div>
    )
  }
}
