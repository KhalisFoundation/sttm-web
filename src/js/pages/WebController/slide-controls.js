import React from 'react';

export default class SlideControls extends React.PureComponent {
  render() {
    return (
      <div className="control-section" id="slide-container">
        <div className="slide-type" id="anand-slide">
          <p>Anand Sahib (Bhog)</p>
        </div>
        <div className="slide-type" id="waheguru-slide">
          <p className="gurbani-font">vwihgurU</p>
        </div>
        <div className="slide-type" id="moolmantra-slide">
          <p>Mool Mantra</p>
        </div>
        <div className="slide-type" id="blank-slide">
          <p>Blank Slide</p>
        </div>
      </div>
    );
  }

}