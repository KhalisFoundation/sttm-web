import React from 'react';
import PropTypes from 'prop-types'

const Reset = ({
  className = '',
  ...props
}) => (
  <svg
    data-testid="reset"
    width="1em"
    height="1em"
    viewBox="0 0 925.82 1070.14"
    className={`reset ${className}`}
    {...props}
  >
    <g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M462.91,1070.14c255.66,0,462.91-207.25,462.91-462.91,0-255.4-206.83-462.49-462.13-462.91V0L146.13,222.62,463.69,445.23V300.82c168.87.42,305.64,137.44,305.64,306.41,0,169.22-137.19,306.41-306.42,306.41S156.5,776.45,156.5,607.23H0C0,862.89,207.25,1070.14,462.91,1070.14Z" /></g></g>
  </svg>
);

Reset.propTypes = {
  className: PropTypes.string
}

export default Reset;

