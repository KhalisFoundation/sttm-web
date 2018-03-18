import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Actions extends React.PureComponent {
  static propTypes = {
    shabad: PropTypes.shape({
      id: PropTypes.string,
      shabadid: PropTypes.string,
    }),
    onCopyClick: PropTypes.func,
    onTweetClick: PropTypes.func,
  };

  render() {
    const { shabad, onCopyClick, onTweetClick } = this.props;
    return (
      <div className="share">
        <Link
          role="button"
          aria-label="Go to shabad"
          title="Go to shabad"
          to={`/shabad?id=${shabad.shabadid}&highlight=${shabad.id}`}
        >
          <i className="fa fa-fw fa-external-link-square" />
        </Link>
        <a
          className="copy"
          onClick={onCopyClick}
          role="button"
          aria-label="Copy to clipboard"
          title="Copy to clipboard"
        >
          <i className="fa fa-fw fa-clipboard" />
        </a>
        <a
          className="twitter"
          onClick={onTweetClick}
          role="button"
          aria-label="Tweet this line"
          title="Tweet this line"
        >
          <i className="fa fa-fw fa-twitter" />
        </a>
      </div>
    );
  }
}
