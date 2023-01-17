import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { pageView } from '../../util/analytics';
import { TEXTS } from '../../constants';
class NotFound extends React.PureComponent {
  static defaultProps = {
    url: location.href,
  };
  static propTypes = {
    url: PropTypes.string.isRequired,
    showCartoonifiedPages: PropTypes.bool,
  };
  render() {
    const { url, showCartoonifiedPages } = this.props;
    return (
      <div className="error-message row" id="content-root">
        <div>
          <h1 id="error-code">404</h1>
          <div id="error-msg">{TEXTS.PAGE_NOT_FOUND_MESSAGE}</div>
          <div id="error-desc">{TEXTS.URL_NOT_FOUND(url)}</div>
        </div>
        {showCartoonifiedPages && <div>
          <img
            src="/assets/images/404.png"
            alt="Image of Sikh Man smiling at you"
          />
        </div>}
      </div>
    );
  }
  componentDidMount() {
    pageView(`/404?from=${this.props.url}`);
  }
}

const mapStateToProps = state => ({ showCartoonifiedPages: state.showCartoonifiedPages })

export default connect(mapStateToProps)(NotFound);
