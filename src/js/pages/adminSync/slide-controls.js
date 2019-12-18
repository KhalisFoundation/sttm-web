import React from 'react';

export default class SlideControls extends React.PureComponent {
  render() {
    return (
      <div className="control-section" id="slide-container">
        <div className="slide-type" id="blank-slide">
          <p>Blank slide</p>
        </div>
        <div className="slide-type" id="ceremonies-slide">
          <p>Ceremonies</p>
        </div>
        <div className="slide-type" id="dhanguru-slide">
          <p>Dhan guru</p>
        </div>
        <div className="slide-type" id="waheguru-slide">
          <p className="gurbani-font">vwihgurU</p>
        </div>
      </div>
    );
  }

}