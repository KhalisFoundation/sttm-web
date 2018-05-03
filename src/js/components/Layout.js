import React from 'react';
import Header from './Header';
import GenericError, { SachKaur } from './GenericError';
import PropTypes from 'prop-types';
import { DEFAULT_PAGE_TITLE, TEXTS } from '../constants';
import { connect } from 'react-redux';
import {
  DARK_MODE_CLASS_NAME,
  ONLINE_COLOR,
  OFFLINE_COLOR,
} from '../../../common/constants';
import { setOnlineMode } from '../features/actions';

class Layout extends React.PureComponent {
  static defaultProps = {
    isHome: false,
    title: DEFAULT_PAGE_TITLE,
  };

  static propTypes = {
    title: PropTypes.string,
    online: PropTypes.bool,
    children: PropTypes.node.isRequired,
    darkMode: PropTypes.bool.isRequired,
    defaultQuery: PropTypes.string,
    isHome: PropTypes.bool,
    isAng: PropTypes.bool,
    setOnlineMode: PropTypes.func.isRequired,
  };

  render() {
    const {
      online,
      children,
      isAng = false,
      isHome = false,
      ...props
    } = this.props;

    if (window !== undefined) {
      const $metaColor = document.querySelector('meta[name="theme-color"]');

      if ($metaColor) {
        $metaColor.setAttribute(
          'content',
          online ? ONLINE_COLOR : OFFLINE_COLOR
        );
      }
    }

    return online ? (
      <React.Fragment>
        <Header
          defaultQuery={this.props.defaultQuery}
          isHome={isHome}
          isAng={isAng}
          {...props}
        />
        {children}
      </React.Fragment>
    ) : (
      <div className="content-root">
        <GenericError
          title={TEXTS.OFFLINE}
          description={TEXTS.OFFLINE_DESCRIPTION}
          image={SachKaur}
        />
      </div>
    );
  }

  updateTheme() {
    document.body.classList[this.props.darkMode ? 'add' : 'remove'](
      DARK_MODE_CLASS_NAME
    );
  }

  componentDidMount() {
    window.addEventListener('online', this.onOnline);
    window.addEventListener('offline', this.onOffline);
    document.title = this.props.title;
    this.updateTheme();
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.onOnline);
    window.removeEventListener('offline', this.onOffline);
  }

  onOnline = () => this.props.setOnlineMode(true);
  onOffline = () => this.props.setOnlineMode(false);

  componentDidUpdate() {
    this.updateTheme();
  }
}

export default connect(({ online, darkMode }) => ({ online, darkMode }), {
  setOnlineMode,
})(Layout);
