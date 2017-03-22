// This function simply checks URL to load content into DOM

/* global h */

const createScript = src => h('script', { src });
const createScripts = (...srces) => srces.map(createScript);
const replaceChild = ($target, child) => { $target.innerHTML = ''; $target.appendChild(child); };

const routes = {
  404: {
    init($target) {
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
  },
  ang: {
    init($target, $scriptTarget) {
      document.body.classList.remove('home');
      $target.innerHTML = `Ang page`;
      document.body.insertBefore(createScript('/src/js/ang.js'), $scriptTarget);
    },
  },
  default: {
    init($target, $scriptTarget) {
      document.body.classList.remove('home');
      $target.innerHTML = `Default page`;
      document.body.insertBefore(createScript('/src/js/default.js'), $scriptTarget);
    },
  },
  home: {
    init($target, $scriptTarget) {
      document.body.classList.add('home', 'hide-search-bar');
      $target.innerHTML = `
      <div class="search-page">
        <form class="search-form" action="/search">
          <div class="flex justify-center align-center">
            <div>
              <img class="logo-long" src="/assets/images/sttm_logo_beta.png" alt="SikhiToTheMax Logo" />
            </div>
          </div>
          <div id="search-container">
            <input name="q" id="search" class="gurbani-font" type="search" placeholder="Koj" autocapitalize="none" autocomplete="off" autocorrect="off" spellcheck="false"><button type="button" class="gurmukhi-keyboard-toggle"><i class="fa fa-keyboard-o"></i></button><button type="submit"><i class="fa fa-search"></i></button>
<?php
include 'inc/gurmukhi-keyboard.php';
?>
          </div>
          <div class="row">
            <div class="small-6 columns">
              <select name="type" id="searchType">
<?php
  foreach ($search_types as $search_type_key => $search_type_val) {
?>
                <option value="<?= $search_type_key ?>"<?= $search_type_key == $search_type ? ' selected' : '' ?>><?= $search_type_val ?></option>
<?php
  }
?>
              </select>
            </div>
            <div class="small-6 columns">
              <select name="source">
<?php
  foreach ($search_sources as $search_source_key => $search_source_val) {
?>
                <option value="<?= $search_source_key ?>"<?= $search_source_key == $search_source ? ' selected' : '' ?>><?= $search_source_val ?></option>
<?php
  }
?>
              </select>
            </div>
          </div>
        </form>
      </div>


      `;
    },
  },
  hukamnama: {
    init($target, $scriptTarget) {
      document.body.classList.remove('home');

      $controls = renderControls();
      $shabad = h('div', { id: 'shabad', class: 'shabad display' });
      $meta = h('div', { class: "hidden", id: "metadata" });

      replaceChild($target, h('div', { class: 'body_text' }, [
        h('h3', { style: "text-align: center;" }, 'Daily Hukamnama from Sri Harmandir Sahib, Amritsar'),
        $controls,
        $meta,
        h('div', { }, [ $shabad ]),
      ]));

      createScripts('/src/js/hukamnama.js', '/src/js/renderShabad.js')
        .forEach(e => document.body.insertBefore(e, $scriptTarget));
    },
  },
  search: {
    init($target, $scriptTarget) {
      document.body.classList.remove('home');
      $controls = renderControls();

      createScripts('/src/js/renderShabad.js', '/src/js/search.js')
        .forEach(e => document.body.insertBefore(e, $scriptTarget));

      replaceChild($target, h('div', { }, [
        $controls,
        h('ul', { class: "search-results display" })
      ]));
    },
  },
  shabad: {
    init($target, $scriptTarget) {
      document.body.classList.remove('home');

      createScripts('/src/js/renderShabad.js', '/src/js/shabad.js')
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
  },
};

const { pathname } = location;
const $contentRoot = document.querySelector('#content-root');
const $lastScriptTag = document.querySelector('script:last-child');
const redirectTo = path => location.href = path;

switch (pathname) {
  case '/ang': {
    routes.ang.init($contentRoot, $lastScriptTag);
    break;
  }
  case '/default': {
    routes.default.init($contentRoot, $lastScriptTag);
    break;
  }
  case '/': {
    routes.home.init($contentRoot, $lastScriptTag);
    break;
  }
  case '/hukamnama': {
    routes.hukamnama.init($contentRoot, $lastScriptTag);
    break;
  }
  case '/random': {
    redirectTo('/shabad?random');
    break;
  }
  case '/search': {
    routes.search.init($contentRoot, $lastScriptTag);
    break;
  }
  case '/shabad': {
    routes.shabad.init($contentRoot, $lastScriptTag);
    break;
  }
  case '/404': {
    routes['404'].init($contentRoot, $lastScriptTag);
    break;
  }
  default: {
    redirectTo('/404');
  }
}
