import React from 'react';
import Header from './Header';
import Banner from './Banner';
import GenericError, { SachKaur, BalpreetSingh } from './GenericError';
import PropTypes from 'prop-types';
import { DEFAULT_PAGE_TITLE, TEXTS } from '../constants';
import { connect } from 'react-redux';
import {
  DARK_MODE_CLASS_NAME,
  ONLINE_COLOR,
  OFFLINE_COLOR,
} from '../../../common/constants';
import { ACTIONS, errorEvent } from '../util/analytics';
import { setOnlineMode } from '../features/actions';
import ScrollToTop from './ScrollToTop';
import throttle from 'lodash.throttle';

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
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
      .isRequired,
    defaultQuery: PropTypes.string,
    isHome: PropTypes.bool,
    isController: PropTypes.bool,
    isAng: PropTypes.bool,
    setOnlineMode: PropTypes.func.isRequired,
  };

  state = {
    error: null,
    showScrollToTop: false,
  };

  componentDidCatch(error) {
    const newState = {
      error,
      errorProps: {
        title: TEXTS.GENERIC_ERROR,
        description: TEXTS.GENERIC_ERROR_DESCRIPTION,
        image: BalpreetSingh,
      },
    };

    switch (error.message) {
      case TEXTS.TIMEOUT_ERROR: {
        newState.errorProps.title = TEXTS.TIMEOUT_ERROR;
        newState.errorProps.description = TEXTS.TIMEOUT_ERROR_DESCRIPTION;
        break;
      }
    }

    this.setState(newState);

    errorEvent({
      action: ACTIONS.GENERIC_ERROR,
      label: JSON.stringify(error),
    });
    // eslint-disable-next-line no-console
    console.error({ error });
  }

  render() {
    const {
      online,
      children,
      isAng = false,
      isHome = false,
      isController = false,
      location: { pathname = '/' } = {},
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

    return online || pathname !== '/' ? (
      <React.Fragment>
        <Banner />
        <Header
          defaultQuery={this.props.defaultQuery}
          isHome={isHome}
          isAng={isAng}
          isController={isController}
          {...props}
        />
        {this.state.error ? (
          <GenericError {...this.state.errorProps} />
        ) : (
            children
          )}
        {this.state.showScrollToTop && <ScrollToTop />}
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
    window.addEventListener('scroll', this.onScroll, { passive: true });
    document.title = this.props.title;
    this.updateTheme();
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.onOnline);
    window.removeEventListener('offline', this.onOffline);
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = throttle(() => {
    this.setState(({ showScrollToTop }) => {
      let newValue = showScrollToTop;
      if (window.scrollY > window.innerHeight / 2) {
        newValue = true;
      } else {
        newValue = false;
      }

      return newValue === showScrollToTop
        ? null
        : { showScrollToTop: newValue };
    });
  }, 500);

  onOnline = () => this.props.setOnlineMode(true);

  onOffline = () => this.props.setOnlineMode(false);

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.darkMode !== this.props.darkMode) {
      this.updateTheme();
    }

    if (prevState.error !== null && this.state.error !== null) {
      this.setState({ error: null });
    }
  }
}

export default connect(
  ({ online, darkMode }) => ({ online, darkMode }),
  {
    setOnlineMode,
  }
)(Layout);
