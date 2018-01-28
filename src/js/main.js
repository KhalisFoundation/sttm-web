const $search = document.getElementById('search');
const $searchType = document.getElementById('search-type');
let $controls = document.getElementById('controls-wrapper');
let $shabad = document.getElementById('shabad');
let $meta = document.getElementById('metadata');
const prefs = {};
const defaultPrefs = {
  displayOptions: ['translation-english', 'transliteration-english'],
  shabadToggles: [],
  sliders: { 'font-size-slider': '16' },
};
let placeholderAni;

function shortenURL(url = window.location.href) {
  const path = window.location.pathname;
  const shortdomain = 'sttm.co';
  const URL = `http://${shortdomain}`;

  switch (path) {
    case '/shabad': return `${URL}/s/${getParameterByName('id')}`;
    case '/ang': return `${URL}/a/${getParameterByName('ang')}`;
    case '/hukamnama': return `${URL}/h`;
    default: return url.replace(window.location.hostname, shortdomain);
  }
}

const getPrefs = () => Object
  .keys(defaultPrefs)
  .forEach(key => prefs[key] = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : defaultPrefs[key]
  );

const setPref = (key, val) => localStorage.setItem(key, JSON.stringify(val));

function checkboxPref(e, key, option) {
  if (e.target.classList.contains('active')) {
    if (prefs[key].indexOf(option) < 0) {
      prefs[key].push(option);
    }
  } else {
    const index = prefs[key].indexOf(option);
    prefs[key].splice(index, 1);
  }
  setPref(key, prefs[key]);
}

function forceSearchNumeric() {
  $search.value = $search.value.replace(/\D/g, '');
}

// Note: Don't add listeners to JS rendered DOM Nodes. Use h() to bind eventListeners to them.

function attachEventListeners () {
  // Mobile hamburger menu
  [document.getElementById('open-mobile-menu')]
    .forEach(e => e && e.addEventListener('click', () => document.body.classList.toggle('menu-open')));

  // Close menu
  [document.querySelector('.top-bar-right .close a')]
    .forEach(e => e && e.addEventListener('click', () => document.body.classList.remove('menu-open')));

  // Share menu
  [document.getElementById('open_share_menu')]
    .forEach(e => e && e.addEventListener('click', () => document.body.classList.toggle('share-open')));

  [...document.querySelectorAll('#search-options select')]
    .forEach(e => e && e.addEventListener('change', function () {
      const update = this.dataset.update;
      document.getElementById(update).value = this.value;
      if (this.getAttribute('id') === 'search-source') {
        document.getElementById('top-bar-search-form').submit();
      }
    }));

  [document.querySelector('.gurmukhi-keyboard-toggle')]
    .forEach(e => e && e.addEventListener('click', () => [e, document.querySelector('.gurmukhi-keyboard')].forEach((f) => { f.classList.toggle('active'); })));

  [document.querySelector('.clear-search-toggle')]
    .forEach(e => e && e.addEventListener('click', () => $search.value=''));
}

document.addEventListener('DOMContentLoaded', () => {
  attachEventListeners();
});

function animatePlaceholder(e, content) {
  // todo - have a single $search var that points to the actual input element
  const $form = e.target.form || document.querySelector('.search-form');
  const $searchField = $form.q;
  // animate over 2 seconds
  const aniTime = 2000 / content.length;

  const curPlaceholderLength = $searchField.placeholder.length;
  const newPlaceholder = content.substr(0, curPlaceholderLength + 1);
  $searchField.placeholder = newPlaceholder;
  if (newPlaceholder !== content) {
    placeholderAni = setTimeout((el) => {
      animatePlaceholder(el, content);
    }, aniTime, e);
  }
}

function updateSearchContent(e, content = 'Koj', useEnglish = false) {
  const $form = e.target.form || document.querySelector('.search-form');
  const $searchField = $form.q;

  if (useEnglish) {
    $searchField.classList.remove('gurbani-font');
  } else {
    $searchField.classList.add('gurbani-font');
  }

  clearTimeout(placeholderAni);
  $searchField.placeholder = '';
  animatePlaceholder(e, content);
}

function updateSearchLang(e) {
  const searchType = parseInt(e.target.value, 10);

  const options = {
    0: ['jmTAq'], // first letters
    1: ['mqjbe'], // first letter anywhere
    2: ['jo mwgih Twkur Apuny qy'], // gurmukhi
    3: ['He has extended His power', true], // translation
    4: ['jo mange thakur apne te soi', true], // romanized
    5: ['123', true], //ang
  };

  updateSearchContent(e, options[searchType][0], options[searchType][1]);

  $searchType.value = searchType;
}

function updateSearchAction(e) {
  const searchType = parseInt(e.target.value);
  const $form = e.target.form || document.querySelector('.search-form');
  const $search = $form.q;

  switch (searchType) {
    case 4:
      $search.setAttribute('pattern', '(\\w+\\W+){3,}\\w+\\W*');
      $search.setAttribute('title', 'Enter 4 words minimum.');
      $form.setAttribute('action', '/search');
      $search.setAttribute('name', 'q');
      break;
    case 5:
      forceSearchNumeric();
      $form.setAttribute('action', '/ang');
      $search.setAttribute('name', 'ang');
      $search.removeAttribute('pattern');
      $search.removeAttribute('title', '');
      break;
    default:
      $search.setAttribute('pattern', '.{2,}');
      $search.setAttribute('title', 'Enter 2 characters minimum.');
      $form.setAttribute('action', '/search');
      $search.setAttribute('name', 'q');
      break;
  }
  $searchType.value = searchType;
}

function displayOptionSlider(e) {
  const option = e.id;
  let prefVal = prefs.sliders;

  switch (option) {
    case 'font-size-slider': {
      prefVal[option] = e.value;
      const fontSize = `${(e.value / 10).toString()}em`;
      [...document.querySelectorAll('.gurbani-display')].forEach((line) => {
        line.style.fontSize = fontSize;
      });
      break;
    }
    default:
      break;
  }
  prefs.sliders = prefVal;
  setPref('sliders', prefVal);
}

function addSpaceForPadChed(status) {
  // add padched
  if (status) {
    const padChedDiv = '<span class="padChedDiv"> </span>';

    [...document.querySelectorAll('.akhar')]
      .forEach((element) => {
        const str = element.innerHTML;
        const text = str + padChedDiv;
        element.innerHTML = text;
      });
  } else {
    // remove padched
    document.querySelectorAll('.padChedDiv')
      .forEach(element => element.parentNode.removeChild(element));
  }
}

function shabadToggle(e) {
  e.currentTarget.classList.toggle('active');
  const option = e.currentTarget.id;
  switch (option) {
    case 'display-options-toggle':
      toggleHiddenFlex(document.getElementById('display-options'));
      break;
    case 'font-options-toggle':
      toggleHiddenFlex(document.getElementById('font-options'));
      break;
    case 'larivaar-toggle':
      addSpaceForPadChed((prefs.shabadToggles.indexOf('larivaar-toggle') > -1));
    case 'larivaar_assist-toggle':
    case 'unicode-toggle':
      const [toggle] = ((e.target.tagName === 'SPAN') ? e.target.parentNode.id : e.target.id).split('-');
      document.querySelector('.display').classList.toggle(toggle);
      checkboxPref(e, 'shabadToggles', option);
      break;
    default:
      break;
  }
}

function toggleHiddenFlex(e) {
  e.style.display = (e.style.display === 'none' || e.style.display === '')? 'flex' : 'none';
}

function displayOptionToggle(e) {
  const option = e.target.id;
  const $display = document.querySelector('.display');

  e.target.classList.toggle('active');
  $display.classList.toggle(option);

  checkboxPref(e, 'displayOptions', option);

  // Update the textarea for copy/social sharing
  [...document.querySelectorAll('.display .line')]
    .forEach(el => el && (
      // for every textarea
      el.querySelector('textarea').value = (

        // get all div, blockquotes
        [...el.querySelector('div, blockquote')]

          // filter hidden ones
          .filter(c => c.style.visibility !== 'hidden' && c.style.display !== 'none')

          // get innerText
          .map(child => child.querySelectorAll('div.unicode')
            ? child.querySelector('div.unicode').innerText
            : el.innerText)

          // filter empty strings
          .filter(text => text)

          // join them by new line
          .join('\n')
      )));
}

getPrefs();

if ($searchType) $searchType.addEventListener('change', updateSearchLang);

if ($searchType) $searchType.addEventListener('change', updateSearchAction);

$search.onkeyup = function () {
  const value = this.value;
  const clearSearchToggle = document.querySelector('.clear-search-toggle');
  if (value.length > 0) {
    clearSearchToggle.classList.add('active');
  } else {
    clearSearchToggle.classList.remove('active');
  }
  // Remove non-numeric characters for Ang search
  if (parseInt($searchType.value, 10) === 5) {
    forceSearchNumeric();
  }
};
