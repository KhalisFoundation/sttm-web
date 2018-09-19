import React from 'react';
import Header from '@/components/Header';
import GenericError from '@/components/GenericError';
import { DEFAULT_PAGE_TITLE, TEXTS } from '@/constants';
import { connect } from 'react-redux';
import {
  DARK_MODE_CLASS_NAME,
  ONLINE_COLOR,
  OFFLINE_COLOR,
} from '../../../../common/constants';
import { ACTIONS, errorEvent } from '@/util/analytics';
import { setOnlineMode } from '@/features/actions';
import ScrollToTop from '@/components/ScrollToTop';
import throttle from 'lodash.throttle';
import { Store } from '@/features/types';

type LayoutState = {
  error: any;
  errorProps: { title: string; description: string; image: string } | null;
  showScrollToTop: boolean;
};

type LayoutProps = {
  title: string;
  online: boolean;
  children: React.ReactType;
  darkMode: boolean;
  location: { pathname: string };
  defaultQuery: string;
  isHome: boolean;
  isAng: boolean;
  setOnlineMode: (value: boolean) => void;
};

class Layout extends React.PureComponent<LayoutProps, LayoutState> {
  public static defaultProps = {
    isHome: false,
    title: DEFAULT_PAGE_TITLE,
  };

  public state = {
    error: null,
    errorProps: null,
    showScrollToTop: false,
  };

  public onScroll = throttle(() => {
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

  public componentDidCatch(error: any) {
    const newState = {
      error,
      errorProps: {
        title: TEXTS.GENERIC_ERROR,
        description: TEXTS.GENERIC_ERROR_DESCRIPTION,
        image: GenericError.BalpreetSingh,
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
    // tslint:disable-next-line no-console
    console.error({ error });
  }

  public render() {
    const {
      online,
      children,
      isAng = false,
      isHome = false,
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
        <Header
          defaultQuery={this.props.defaultQuery}
          isHome={isHome}
          isAng={isAng}
          {...props}
        />
        {this.state.error !== null && this.state.errorProps !== null ? (
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
          image={GenericError.SachKaur}
        />
      </div>
    );
  }

  public updateTheme() {
    document.body.classList[this.props.darkMode ? 'add' : 'remove'](
      DARK_MODE_CLASS_NAME
    );
  }

  public componentDidMount() {
    window.addEventListener('online', this.onOnline);
    window.addEventListener('offline', this.onOffline);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    document.title = this.props.title;
    this.updateTheme();
  }

  public componentWillUnmount() {
    window.removeEventListener('online', this.onOnline);
    window.removeEventListener('offline', this.onOffline);
    window.removeEventListener('scroll', this.onScroll);
  }

  public onOnline = () => this.props.setOnlineMode(true);

  public onOffline = () => this.props.setOnlineMode(false);

  public componentDidUpdate(prevProps: LayoutProps, prevState: LayoutState) {
    if (prevProps.darkMode !== this.props.darkMode) {
      this.updateTheme();
    }

    if (prevState.error !== null && this.state.error !== null) {
      this.setState({ error: null });
    }
  }
}

export default connect(
  ({ online, darkMode }: Store) => ({ online, darkMode }),
  {
    setOnlineMode,
  }
)(Layout);
