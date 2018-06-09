import React from 'react';
import PropTypes from 'prop-types';

export default class Doodle extends React.PureComponent {
  static propTypes = {
    href: PropTypes.string,
    src: PropTypes.string,
  };
  render() {
    const { href, src } = this.props;
    return (
      <a
        className="doodle"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`/assets/images/doodles/${src}`} />
      </a>
    );
  }
}
