/* global h */

import {
  NotFound,
  SearchForm,
  ShabadContainer,
  Hukamnama,
  Content,
  SearchResults,
  Option,
} from './components';
import { entries, createScript, createScripts } from './util';

const routes = {
  // Populates the Search form.
  _initForm() {
    const formValues = ['q', 'type', 'source', 'ang']
      .reduce((obj, val) => ({ ...obj, [val]: getParameterByName(val) || null }), {});

    const typesToOptions = [...Khajana.TYPES, 'Ang']
      .map((children, value) => Option({
        isSelected: parseInt(value) === parseInt(formValues.type),
        value,
        children,
      }));

    const sourcesToOptions = entries(Khajana.SOURCES)
      .map(([value, children]) => Option({
        isSelected: value === formValues.source,
        value,
        children,
      }));

    const gurmukhiKeyboard = renderGurmukhiKeyboard(document.querySelector('#search'))

    const [
      $$search, $$searchType, $$searchSource,
      $$searchTypes, $$searchSources, $$searchContainer
    ] = [
      '#search', '#search-type-value', '#search-source-value',
      '#search-type', '#search-source', '#search-container',
    ].map(document.querySelector.bind(document));

    $$search.value = formValues.q;
    $$searchType.value = formValues.type;
    $$searchSource.value = formValues.source;
    $$searchTypes.innerHTML = typesToOptions.map(e => e.outerHTML).join('');
    $$searchSources.innerHTML = sourcesToOptions.map(e => e.outerHTML).join('');
    $$searchContainer.appendChild(gurmukhiKeyboard);

    const mockEvent = {
      currentTarget: {
        value: $$searchType.value || 0,
        form: document.querySelector('.search-form'),
      }
    };

    updateSearchLang(mockEvent);
    updateSearchAction(mockEvent);
  },

  ['404'] ($target) {
    this._initForm();

    document.title = 'Page not found - SikhiToTheMax';
    document.body.classList.remove('home');
    replaceChild($target, NotFound({ url: location.href }));
  },

  ang ($target, $scriptTarget) {
    document.title = 'Ang/Page Viewer - SikhiToTheMax';
    document.body.classList.remove('home');

    this._initForm();

    createScripts('/assets/js/renderShabad.js', '/assets/js/ang.js')
      .forEach(e => document.body.insertBefore(e, $scriptTarget));

    replaceChild($target, ShabadContainer({}));
  },

  default ($target, $scriptTarget, { title = 'Title', content = 'Default content template' } = {}) {
    document.title = `${title} - SikhiToTheMax`;
    document.body.classList.remove('home');

    this._initForm();

    replaceChild($target, Content({ title, content }));
  },

  home ($target, $scriptTarget) {
    document.title = `SikhiToTheMax`;
    document.body.classList.add('home', 'hide-search-bar');

    replaceChild($target, SearchForm({ }));
  },

  hukamnama ($target, $scriptTarget) {
    document.title = 'Hukamnama - SikhiToTheMax';
    document.body.classList.remove('home');

    this._initForm();

    replaceChild($target, Hukamnama({}));

    createScripts('/assets/js/hukamnama.js', '/assets/js/renderShabad.js')
      .forEach(e => document.body.insertBefore(e, $scriptTarget));
  },

  search ($target, $scriptTarget) {
    document.title = 'Search Results - SikhiToTheMax';
    document.body.classList.remove('home');

    this._initForm();

    createScripts('/assets/js/renderShabad.js', '/assets/js/search.js')
      .forEach(e => document.body.insertBefore(e, $scriptTarget));

    replaceChild($target, SearchResults({ }));
  },

  shabad ($target, $scriptTarget) {
    document.title = 'Shabad - SikhiToTheMax';
    document.body.classList.remove('home');

    this._initForm();

    createScripts('/assets/js/renderShabad.js', '/assets/js/shabad.js')
      .forEach(e => document.body.insertBefore(e, $scriptTarget));

    replaceChild($target, ShabadContainer({ }));
  },
};

function router () {
  const { pathname } = location;
  const $contentRoot = document.querySelector('#content-root');
  const $lastScriptTag = document.querySelector('script:last-child');
  const redirectTo = path => location.href = path;

  switch (pathname) {
    case '/': {
      routes.home($contentRoot, $lastScriptTag);
      break;
    }
    case '/ang': case '/hukamnama': case '/search': case '/shabad': case '/404': {
      const currentRoute = pathname.split('/')[1];
      routes[currentRoute]($contentRoot, $lastScriptTag);
      break;
    }
    case '/about': case '/terms-of-service': {
      routes.default($contentRoot, $lastScriptTag, content[pathname]);
      break;
    }
    case '/random': {
      redirectTo('/shabad?random');
      break;
    }
    case "/rehat.asp": {
      redirectTo('https://khalisfoundation.org/portfolio/maryada/');
      break;
    }
    case "/search.asp": {
      redirectTo('/');
      break;
    }
    case "/page.asp": {
      let query = getQueryParams();

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
      routes['404']($contentRoot, $lastScriptTag);
      break;
    }
  }
}

router();
