import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Banner from './Banner/Banner';
import GenericError, { SachKaur, BalpreetSingh } from './GenericError';
import PropTypes from 'prop-types';
import { DEFAULT_PAGE_TITLE, LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN, TEXTS } from '../constants';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import {
  DARK_MODE_CLASS_NAME,
  ONLINE_COLOR,
  OFFLINE_COLOR,
} from '../../../common/constants';
import { ACTIONS, errorEvent } from '../util/analytics';
import { setOnlineMode, closeSettingsPanel } from '../features/actions';
import { FloatingActions } from './FloatingActions';
import MultipleShabadsDisplay from './MultipleShabadsDisplay';

import { addVisraamClass, isShowFullscreenRoute, isShowAutoScrollRoute, isShowSettingsRoute, getQueryParams, isFalsy } from '../util';
import { AddFavouriteShabadModal } from './Modals';

class Layout extends React.PureComponent {
  static defaultProps = {
    isHome: false,
    title: DEFAULT_PAGE_TITLE
  };

  static propTypes = {
    title: PropTypes.string,
    online: PropTypes.bool,
    children: PropTypes.node.isRequired,
    darkMode: PropTypes.bool.isRequired,
    autoScrollMode: PropTypes.bool.isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired})
      .isRequired,
    defaultQuery: PropTypes.string,
    isHome: PropTypes.bool,
    isController: PropTypes.bool,
    isAng: PropTypes.bool,
    multipleShabads: PropTypes.array,
    showMultiViewPanel: PropTypes.bool,
    showPinSettings: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    setOnlineMode: PropTypes.func.isRequired,
    closeSettingsPanel: PropTypes.func,
    history: PropTypes.object 
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
      autoScrollMode,
      showMultiViewPanel,
      showPinSettings,
      isModalOpen,
      location: { pathname = '/' } = {},      
      ...props
    } = this.props;
    
    const isShowFullScreen = isShowFullscreenRoute(pathname);
    const isShowAutoScroll = isShowAutoScrollRoute(pathname) && autoScrollMode;
    const isShowSettings = isShowSettingsRoute(location.pathname)

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
        {isModalOpen && <AddFavouriteShabadModal />}
        <div className={`pusher ${showMultiViewPanel ? 'enable' : ''} pin-settings ${showPinSettings ? 'active' : ''}`}>
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
        </div>
        <MultipleShabadsDisplay />  

        <FloatingActions
          isShowAutoScroll={isShowAutoScroll}
          isShowFullScreen={isShowFullScreen}
          isShowScrollToTop={this.state.showScrollToTop}
          showPinSettings={showPinSettings} 
          isShowSettings={isShowSettings} />

        <Footer showPinSettings={showPinSettings}/>
      </React.Fragment>
    ) : (
        <>
          <div className="content-root">
            <GenericError
              title={TEXTS.OFFLINE}
              description={TEXTS.OFFLINE_DESCRIPTION}
              image={SachKaur} />
          </div>
          <Footer showPinSettings={showPinSettings} />
        </>  
      )
  }

  updateTheme() {
    document.body.classList[this.props.darkMode ? 'add' : 'remove'](
      DARK_MODE_CLASS_NAME
    );
  }

  processAuth() {
    const {location, history} = this.props
    const {
      token, logout
    } = getQueryParams(location.search);
    // @TODO: use redux to control state of session user
    if(!isFalsy(token)) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN, token)
      history.push('/')
    }
    // @TODO: use redux to remove user sesssion
    if(logout === 'success') {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN)
      history.push('/')
    }
    return;
  }

  componentDidMount() {
    if(location.pathname!=="/hukamnama" && location.pathname!=="/shabad" && location.pathname!=="/search"){
      this.props.closeSettingsPanel();
    }
    this.processAuth();
    window.addEventListener('online', this.onOnline);
    window.addEventListener('offline', this.onOffline);
    window.addEventListener('scroll', this.onScroll, { passive: true });

    document.title = this.props.title;
    this.updateTheme();
    addVisraamClass();
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
  ({ online, darkMode, autoScrollMode, showMultiViewPanel, showPinSettings, isModalOpen }) => ({ online, darkMode, autoScrollMode, showMultiViewPanel, showPinSettings, isModalOpen }),
  {
    setOnlineMode,
    closeSettingsPanel,
  }
)(Layout);
