import React from 'react';
import PropTypes from 'prop-types';


const Doodle = props => (
  <a className="doodle" href={props.href} target="_blank" rel="noopener">
    <img src={`/assets/images/doodles/${props.src}`} />
  </a>
);

Doodle.propTypes = {
  href: PropTypes.string,
  src: PropTypes.string
}

export default Doodle;
