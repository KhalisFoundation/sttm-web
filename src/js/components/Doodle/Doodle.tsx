import React from 'react';

type DoodleProps = {
  href: string;
  src: string;
};

export default class Doodle extends React.PureComponent<DoodleProps> {
  public render() {
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
