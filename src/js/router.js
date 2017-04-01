// This function simply checks URL to load content into DOM

/* global h */

const createScript = src => h('script', { src });
const createScripts = (...srces) => srces.map(createScript);
const replaceChild = ($target, child) => { $target.innerHTML = ''; $target.appendChild(child); };

const routes = {
  _initForm() {
    const formValues = ['q', 'type', 'source', 'ang']
      .reduce((obj, val) => ({ ...obj, [val]: getParameterByName(val) || null }), {});

    const entries = obj => Object.keys(obj).map(key => [key, obj[key]]);

    const typesToOptions = [...Khajana.TYPES, 'Ang']
      .map((string, value) => h('option', {
        value,
        ...(
          parseInt(value) === parseInt(formValues.type)
          ? { selected: true }
          : { }
        )
      }, string))

    const sourcesToOptions = entries(Khajana.SOURCES)
      .map(([value, string]) => h('option', {
        value,
        ...(
          value === formValues.source
          ? { selected: true }
          : { }
        )
      }, string))

    const gurmukhiKeyboard = renderGurmukhiKeyboard(document.querySelector('#search'))

    document.querySelector('#search').value = formValues.q;

    document.querySelector('#search-type-value').value = formValues.type;

    document.querySelector('#search-source-value').value = formValues.source;

    document.querySelector('#search-type').innerHTML = typesToOptions.map(e => e.outerHTML).join('');

    document.querySelector('#search-source').innerHTML = sourcesToOptions.map(e => e.outerHTML).join('');

    document.querySelector('#search-container').appendChild(gurmukhiKeyboard);
  },
  ['404'] ($target) {
    document.title = 'Page not found - SikhiToTheMax';

    document.body.classList.remove('home');
    $target.innerHTML = `
        <div class="body_text row">
          <div class="small-12 medium-6 medium-offset-1 columns text-center">
            <h1 id="error-code">404</h1>
            <div id="error-msg">These are not the Singhs you are looking for.</div>
            <div id="error-desc">The requested URL <code>${location.href}</code> was not found on this server.</div>
          </div>
          <div class="small-12 medium-5 columns">
            <img src="/assets/images/404.png">
          </div>
        </div>
      `;
  },
  ang ($target, $scriptTarget) {
    document.title = 'Ang/Page Viewer - SikhiToTheMax';

    document.body.classList.remove('home');

    this._initForm();

    createScripts('/assets/js/renderShabad.js', '/assets/js/ang.js')
      .forEach(e => document.body.insertBefore(e, $scriptTarget));

    $controls = renderControls();

    $shabad = h('div', { id: 'shabad', class: 'shabad display' });

    $meta = h('div', { class: "hidden", id: "metadata" });

    replaceChild($target, h('div', { }, [
      $controls,
      $meta,
      h('div', { }, [ $shabad ]),
    ]));
  },
  default ($target, $scriptTarget, { title = 'Title', content = 'Default content template' } = {}) {
    this._initForm();

    document.title = `${title} - SikhiToTheMax`;

    document.body.classList.remove('home');

    replaceChild($target, h('div', { class: 'body_text' }, [
      h('h2', {}, title),
      h('div', {}, content),
    ]));
  },
  home ($target, $scriptTarget) {
    document.title = `SikhiToTheMax`;

    document.body.classList.add('home', 'hide-search-bar');

    const entries = obj => Object.keys(obj).map(key => [key, obj[key]]);

    const $search =  h('input', {
      name: "q"
      , id: "search"
      , class: "gurbani-font"
      , type: "search"
      , placeholder: "Koj"
      , autocapitalize: "none"
      , autocomplete: "off"
      , autocorrect: "off"
      , spellcheck: "false"
    });

    const typesToOptions = [...Khajana.TYPES, 'Ang']
      .map((string, value) => h('option', { value }, string))

    const sourcesToOptions = entries(Khajana.SOURCES)
      .map(([value, string]) => h('option', { value }, string))

    const gurmukhiKeyboard = renderGurmukhiKeyboard($search);

    replaceChild($target, h('div', { class: "search-page" }, [
      h('form', { class: "search-form" , action: "/search" }, [
        h('div', { class: "flex justify-center align-center" }, [
          h('div', { }, [
            h('img', { class: "logo-long" , src: "/assets/images/sttm_logo_beta.png" , alt: "SikhiToTheMax Logo" }),
          ]),
        ]),
        h('div', { id: "search-container" }, [
          $search,
          h(
            'button', {
              type: "button",
              class: "gurmukhi-keyboard-toggle",
              click() { gurmukhiKeyboard.classList.toggle('active') }
            },
            [ h('i', { class: "fa fa-keyboard-o" }, []) ]
          ),
          h('button', { type: "submit" }, [
            h('i', { class: "fa fa-search" }, []),
          ]),
          gurmukhiKeyboard,
        ]),
        h('div', { class: "row search-options" }, [
          h('div', { class: "small-6 columns" }, [
            h('select', {
              name: "type",
              id: "search-type",
              change(e) {
                updateSearchLang(e);
                updateSearchAction(e);
              }
            }, typesToOptions
            ),
          ]),
          h('div', { class: "small-6 columns" }, [
            h('select', { name: "source" }, sourcesToOptions),
          ]),
        ]),
      ]),
    ]));
  },
  hukamnama ($target, $scriptTarget) {
    document.title = 'Hukamnama - SikhiToTheMax';

    document.body.classList.remove('home');

    this._initForm();

    $controls = renderControls();

    $shabad = h('div', { id: 'shabad', class: 'shabad display' });

    $meta = h('div', { class: "hidden", id: "metadata" });

    replaceChild($target, h('div', { class: 'body_text' }, [
      h('h3', { style: "text-align: center;" }, 'Daily Hukamnama from Sri Harmandir Sahib, Amritsar'),
      $controls,
      $meta,
      h('div', { }, [ $shabad ]),
    ]));

    createScripts('/assets/js/hukamnama.js', '/assets/js/renderShabad.js')
      .forEach(e => document.body.insertBefore(e, $scriptTarget));
  },
  search ($target, $scriptTarget) {
    document.title = 'Search Results - SikhiToTheMax';

    document.body.classList.remove('home');

    this._initForm();

    $controls = renderControls();

    createScripts('/assets/js/renderShabad.js', '/assets/js/search.js')
      .forEach(e => document.body.insertBefore(e, $scriptTarget));

    replaceChild($target, h('div', { }, [
      $controls,
      h('ul', { class: "search-results display" })
    ]));
  },
  shabad ($target, $scriptTarget) {
    document.title = 'Shabad - SikhiToTheMax';

    document.body.classList.remove('home');

    this._initForm();

    createScripts('/assets/js/renderShabad.js', '/assets/js/shabad.js')
      .forEach(e => document.body.insertBefore(e, $scriptTarget));

    $controls = renderControls();

    $shabad = h('div', { id: 'shabad', class: 'shabad display' });

    $meta = h('div', { class: "hidden", id: "metadata" });

    replaceChild($target, h('div', { }, [
      $controls,
      $meta,
      h('div', { }, [ $shabad ]),
    ]));
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
      let query = location.search
        .split('?')[1];

      query = query
        ?  query.split('&')
        .map(e => e.split('='))
        .reduce((obj, [key, val]) => ({...obj, [key]: val }), {})
        : {};

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
      redirectTo('/404');
      break;
    }
  }
}

router();
