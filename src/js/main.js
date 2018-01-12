const $search = document.getElementById('search');
const $searchType = document.getElementById('search-type');
let   $controls = document.getElementById('controls-wrapper');
let   $shabad = document.getElementById('shabad');
let   $meta = document.getElementById('metadata');
const prefs = {};
const defaultPrefs = {
  displayOptions: ['translation-english', 'transliteration-english'],
  shabadToggles: [],
};

function shortenURL(url = window.location.href) {
  const path = window.location.pathname;
  const shortdomain = 'sttm.ws';
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

getPrefs();

if ($searchType) $searchType.addEventListener('change', updateSearchLang);

if ($searchType) $searchType.addEventListener('change', updateSearchAction);

$search.onkeyup = function () {
  if ($searchType.value == 5 && this.value != this.value.replace(/[^0-9]/g, '')) {
    this.value = this.value.replace(/[^0-9]/g, '');
  }
};

[document.querySelector('.search-form')]
  .forEach(f => f && f.addEventListener('submit', e => {
    if ($search.value.length <= 2 && $searchType.value != 5) {
      alert('Please enter at least 3 characters');
      e.preventDefault();
      return false;
    }
  }));

// Shabad controller toggles
[...document.querySelectorAll('.shabad-controller-toggle')]
  .forEach(e => e && e.addEventListener('click', shabadToggle));

// Shabad display option toggles
[...document.querySelectorAll('.display-option-toggle')]
  .forEach(e => e && e.addEventListener('click', displayOptionToggle));

[document.getElementById('open-mobile-menu')]
  .forEach(e => e && addEventListener('click', () => document.body.classList.toggle('menu-open')));

[document.querySelector('.top-bar-right .close a')]
  .forEach(e => e && addEventListener('click', () => document.body.classList.remove('menu-open')));

[document.getElementById('open_share_menu')]
  .forEach(e => e && addEventListener('click', () => document.body.classList.toggle('share-open')));

[...document.querySelectorAll('#search-options select')]
  .forEach(e => e && e.addEventListener('change', function () {
    const update = this.dataset.update;
    document.getElementById(update).value = this.value;
    if (this.getAttribute('id') === 'search-source') {
      document.getElementById('top-bar-search-form').submit();
    }
  }));

[document.querySelector('.gurmukhi-keyboard-toggle')]
  .forEach(e => e && e.addEventListener('click', () => document.querySelector('.gurmukhi-keyboard').classList.toggle('active')));

$('#shabad').on('click', '.share .copy', function() {
  const el = $(this).parents('.line').children('textarea');
  el.show().select();
  document.execCommand('copy');
  el.blur().hide();
});

$('#shabad').on('click', '.share .twitter', function () {
  let tweet = $(this).parents('.line').children('textarea').val();
  const shortURL = `\n${shortenURL()}`;
  if (tweet.length + shortURL.length > 134) {
    tweet = `${tweet.substring(0, 132 - shortURL.length)}..`;
  }
  tweet += shortURL;
  tweet += ' #sttm';
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank');
});

/*$("#shabad").on("click", ".share .facebook", function() {
  let post = $(this).parents(".line").children("textarea").val();
  post += " #sttm";
  window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("http://www.sikhitothemax.org") + "&t=" + encodeURIComponent(post), "_blank");
});*/

function updateSearchLang(e) {
  const searchType = parseInt(e.currentTarget.value);
  const $form = e.currentTarget.form || document.querySelector('.search-form');
  const $search = $form.q;

  switch (searchType) {
    case 3:
    case 4:
    case 5:
      $search.classList.remove('gurbani-font');
      $search.placeholder = searchType === 5 ? 'Ang Number' : 'Khoj';
      break;
    default:
      $search.classList.add('gurbani-font');
      $search.placeholder = 'Koj';
      break;
  }
  $searchType.value = searchType;
}

function updateSearchAction(e) {
  const searchType = parseInt(e.currentTarget.value);
  const $form = e.currentTarget.form || document.querySelector('.search-form');
  const $search = $form.q;

  switch (searchType) {
    case 5:
      $form.setAttribute('action', '/ang');
      $search.setAttribute('name', 'ang');
      $search.removeAttribute('pattern');
      $search.removeAttribute('title', '');
      break;
    default:
      $search.setAttribute('pattern', '.{3,}');
      $search.setAttribute('title', 'Enter 3 characters minimum.');
      $form.setAttribute('action', '/search');
      $search.setAttribute('name', 'q');
      break;
  }
  $searchType.value = searchType;
}

function shabadToggle(e) {
  e.currentTarget.classList.toggle('active');
  const option = e.currentTarget.id;
  switch (option) {
    case 'display-options-toggle':
      document.querySelector('#display-options').classList.toggle('hidden');
      break;
    case 'unicode-toggle':
    case 'larivaar-toggle':
    case 'larivaar_assist-toggle': {
      const [toggle] = e.target.id.split('-');
      document.querySelector('.display').classList.toggle(toggle);
      checkboxPref(e, 'shabadToggles', option);
      break;
    }
  }
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
