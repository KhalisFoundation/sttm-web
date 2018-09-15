import React from 'react';
import PropTypes from 'prop-types';
import { pageView } from '@/util/analytics';
import { TEXTS } from '@/constants';

export default class NotFound extends React.PureComponent {
  public static defaultProps = {
    url: location.href,
  };
  public static propTypes = {
    url: PropTypes.string.isRequired,
  };
  public render() {
    const { url } = this.props;
    return (
      <div className="error-message row" id="content-root">
        <div>
          <h1 id="error-code">404</h1>
          <div id="error-msg">{TEXTS.PAGE_NOT_FOUND_MESSAGE}</div>
          <div id="error-desc">{TEXTS.URL_NOT_FOUND(url)}</div>
        </div>
        <div>
          <img
            src="/assets/images/404.png"
            alt="Image of Sikh Man smiling at you"
          />
        </div>
      </div>
    );
  }
  public componentDidMount() {
    pageView(`/404?from=${this.props.url}`);
  }
}
