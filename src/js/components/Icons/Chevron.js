import React from 'react';
import PropTypes from 'prop-types';

const getRotationStyles = direction => {
  const { TOP, LEFT, RIGHT, BOTTOM } = Chevron.DIRECTIONS;
  let transform = '';

  switch (direction) {
    case TOP: {
      transform = `rotate(90deg)`;
      break;
    }
    case LEFT: {
      transform = `rotate(0deg)`;
      break;
    }
    case RIGHT: {
      transform = `rotate(180deg)`;
      break;
    }
    case BOTTOM: {
      transform = `rotate(-90deg)`;
      break;
    }
  }

  return {
    OTransform: transform,
    WebkitTransform: transform,
    MozTransform: transform,
    transform,
  };
};

const Chevron = ({
  direction = Chevron.DIRECTIONS.LEFT,
  style = {},
  className = '',
  ...props
}) => (
  <svg
    style={{
      ...style,
      ...getRotationStyles(direction),
    }}
    viewBox="0 0 320 512"
    width="1em"
    height="1em"
    className={`chevron ${className}`}
    {...props}
  >
    <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
  </svg>
);

Chevron.DIRECTIONS = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3,
};

Chevron.propTypes = {
  direction: PropTypes.oneOf([0, 1, 2, 3]),
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Chevron;
