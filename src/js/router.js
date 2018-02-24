import React from 'react';
import PropTypes from 'prop-types';
import { redirectTo, getQueryParams, getParameterByName, throwError } from './util';
import RenderPromise from './components/RenderPromise';
import Header from './components/Header';
import Home from './pages/Home';

class Layout extends React.PureComponent {
  static defaultProps = {
    isHome: false,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    isHome: PropTypes.bool,
  };

  render() {
    const { children, isHome = false } = this.props;
    return (
      <React.Fragment>
        <Header isHome={isHome} />
        {children}
      </React.Fragment>
    );
  }
}

const routes = {
  ['terms-of-service'] () {
    document.title = 'Terms of Service - SikhiToTheMax';

    return (
      <Layout>
        <RenderPromise
          promise={() => import(/* webpackChunkName: "TermsOfService" */ './pages/TermsOfService')}
        >
          {
            ({ pending, resolved: { default: TermsOfService } = {}, rejected }) => (
              pending
                ? null
                : TermsOfService 
                  ? <TermsOfService />
                  : throwError(`We are having trouble in rendering this route.`, rejected)
            )
          }
        </RenderPromise>
      </Layout>
    );
  },

  ['404'] () {
    document.title = 'Page not found - SikhiToTheMax';

    return (
      <Layout>
        <RenderPromise
          promise={() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')}
        >
          {
            ({ pending, resolved: { default: NotFound } = {}, rejected }) => (
              pending
                ? null
                : NotFound 
                  ? <NotFound />
                  : throwError(`We are having trouble in rendering this route.`, rejected)
            )
          }
        </RenderPromise>
      </Layout>
    );
  },

  about() {
    document.title = 'About - SikhiToTheMax';

    return (
      <Layout>
        <RenderPromise
          promise={() => import(/* webpackChunkName: "About" */ './pages/About')}
        >
          {
            ({ pending, resolved: { default: About } = {}, rejected }) => (
              pending
                ? null
                : About 
                  ? <About />
                  : throwError(`We are having trouble in rendering this route.`, rejected)
            )
          }
        </RenderPromise>
      </Layout>
    );
  },

  ang() {
    document.title = 'Ang/Page Viewer - SikhiToTheMax';
    const [ang, source] = ['ang', 'source'].map(v => getParameterByName(v));

    return (
      <Layout>
        <RenderPromise
          promise={() => import(/* webpackChunkName: "Ang" */ './pages/Ang')}
        >
          {
            ({ pending, resolved: { default: Ang } = {}, rejected }) => (
              pending
                ? null
                : Ang 
                  ? <Ang ang={ang} source={source} />
                  : throwError(`We are having trouble in rendering this route.`, rejected)
            )
          }
        </RenderPromise>
      </Layout>
    );
  },

  help() {
    document.title = 'Help - SikhiToTheMax';

    return (
      <Layout>
        <RenderPromise
          promise={() => import(/* webpackChunkName: "Help" */ './pages/Help')}
        >
          {
            ({ pending, resolved: { default: Help } = {}, rejected }) => (
              pending
                ? null
                : Help 
                  ? <Help />
                  : throwError(`We are having trouble in rendering this route.`, rejected)
            )
          }
        </RenderPromise>
      </Layout>
    );
  },

  home() {
    document.title = 'SikhiToTheMax';

    // IE 11 doesn't support multiple args for classList.add.
    ['home', 'hide-search-bar'].map(c => document.body.classList.add(c));

    return (
      <Layout isHome>
        <Home />
      </Layout>
    );
  },

  hukamnama() {
    document.title = 'Hukamnama - SikhiToTheMax';

    return (
      <Layout>
        <RenderPromise
          promise={() => import(/* webpackChunkName: "Hukamnama" */ './pages/Hukamnama')}
        >
          {
            ({ pending, resolved: { default: Hukamnama } = {}, rejected }) => (
              pending
                ? null
                : Hukamnama
                  ? <Hukamnama />
                  : throwError(`We are having trouble in rendering this route.`, rejected)
            )
          }
        </RenderPromise>
      </Layout>
    );
  },

  search() {
    document.title = 'Search Results - SikhiToTheMax';

    const params = ['type', 'source', 'q', 'offset'];
    const [type = 0, source = 'all', q = '', offset] = params.map(v => getParameterByName(v));

    return (
      <Layout>
        <RenderPromise
          promise={() => import(/* webpackChunkName: "Search" */ './pages/Search')}
        >
          {
            ({ pending, resolved: { default: Search } = {}, rejected }) => (
              pending
                ? null
                : Search
                  ? <Search q={q} type={type} source={source} offset={offset} />
                  : throwError(`We are having trouble in rendering this route.`, rejected)
            )
          }
        </RenderPromise>
      </Layout>
    );
  },

  shabad() {
    document.title = 'Shabad - SikhiToTheMax';

    const [random, id, q, type] = ['random', 'id', 'q', 'type'].map(v => getParameterByName(v));
    return (
      <Layout>
        <RenderPromise
          promise={() => import(/* webpackChunkName: "Shabad" */ './pages/Shabad')}
        >
          {
            ({ pending, resolved: { default: Shabad } = {}, rejected }) => (
              pending
                ? null
                : Shabad
                  ? <Shabad random={random === ''} id={id} q={q} type={type} />
                  : throwError(`We are having trouble in rendering this route.`, rejected)
            )
          }
        </RenderPromise>
      </Layout>
    );
  },
};

export default function router() {
  const { pathname } = location;
  switch (pathname) {
    case '/': {
      return routes.home();
    }
    case '/about': case '/terms-of-service': case '/ang': case '/hukamnama': case '/search': case '/shabad': case '/404': {
      const currentRoute = pathname.split('/')[1];
      return routes[currentRoute]();
    }
    case '/help': {
      return routes.help();
    }
    case '/random': {
      redirectTo('/shabad?random');
      break;
    }
    case '/rehat.asp': {
      redirectTo('https://khalisfoundation.org/portfolio/maryada/');
      break;
    }
    case '/search.asp': {
      redirectTo('/');
      break;
    }
    case '/page.asp': {
      const query = getQueryParams();

      if (query.SourceID && query.PageNo) {
        redirectTo(`/ang?ang=${query.PageNo}&source=${query.SourceID}`);
      } else if (query.ShabadID) {
        redirectTo(`/shabad?id=${query.ShabadID}`);
      } else if (query.random) {
        redirectTo('/shabad?random');
      }

      break;
    }
    default: {
      return routes['404']();
    }
  }
}
