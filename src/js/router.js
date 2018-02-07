import React from 'react';
import Khajana from 'shabados';
import { redirectTo, getQueryParams, getParameterByName, entries } from './util';
import { Header } from './components';
import Shabad from './pages/Shabad';
import Home from './pages/Home';
import Search from './pages/Search';
import Hukamnama from './pages/Hukamnama';
import Help from './pages/Help';
import About from './pages/About';
import Ang from './pages/Ang';
import NotFound from './pages/NotFound';
import TermsOfService from './pages/TermsOfService';

const Layout = ({ children, isHome = false }) => (
  <React.Fragment>
    <Header isHome={isHome} />
    {children}
  </React.Fragment>
);

const routes = {
  'terms-of-service': function () {
    document.title = 'Terms of Service - SikhiToTheMax';

    return (
      <Layout>
        <TermsOfService />
      </Layout>
    );
  },
  404() {
    document.title = 'Page not found - SikhiToTheMax';

    return (
      <Layout>
        <NotFound url={location.href} />
      </Layout>
    );
  },

  about() {
    document.title = 'About - SikhiToTheMax';

    return (
      <Layout>
        <About />
      </Layout>
    );
  },

  ang() {
    document.title = 'Ang/Page Viewer - SikhiToTheMax';
    const [ang, source] = ['ang', 'source'].map(v => getParameterByName(v));

    return (
      <Layout>
        <Ang ang={ang} source={source} />
      </Layout>
    );
  },

  help() {
    document.title = 'Help - SikhiToTheMax';

    return (
      <Layout>
        <Help />
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
        <Hukamnama />
      </Layout>
    );
  },

  search() {
    document.title = 'Search Results - SikhiToTheMax';

    const params = ['type', 'source', 'q', 'offset'];
    const [type = 0, source = 'all', q = '', offset] = params.map(v => getParameterByName(v));

    return (
      <Layout>
        <Search
          q={q}
          type={type}
          source={source}
          offset={offset}
        />
      </Layout>
    );
  },

  shabad() {
    document.title = 'Shabad - SikhiToTheMax';

    const [random, id, q, type] = ['random', 'id', 'q', 'type'].map(v => getParameterByName(v));
    return (
      <Layout>
        <Shabad random={random === ''} id={id} q={q} type={type} />
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
