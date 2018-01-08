const $search       = document.getElementById("search");
const $searchType   = document.getElementById("search-type");
let   $controls     = document.getElementById("controls-wrapper");
let   $shabad       = document.getElementById("shabad");
let   $meta         = document.getElementById("metadata");
const prefs         = {};
const default_prefs = {
  'displayOptions': ['translation-english', 'transliteration-english'],
  'shabadToggles': []
};

function getPrefs() {
  $.each(default_prefs, function(key, defaults) {
    prefs[key] = window.localStorage[key] ? JSON.parse(window.localStorage[key]) : defaults;
  });
}
function setPref(key, val) {
  window.localStorage[key] = JSON.stringify(val);
}
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

// IE 10 doesn't support toggle class
const toggleClass = ($el, cl) => $el.classList[$el.classList.contains(cl) ? 'remove' : 'add'](cl);

getPrefs();

if ($searchType) $searchType.addEventListener("change", updateSearchLang);
if ($searchType) $searchType.addEventListener("change", updateSearchAction);

$search.onkeyup = function () {
  if ($searchType.value == 5 && this.value != this.value.replace(/[^0-9]/g, '')) {
    this.value = this.value.replace(/[^0-9]/g, '');
  }
};

$(".search-form").on("submit", function(e) {
  if ($search.value.length <= 2 && $searchType.value != 5) {
    alert("Please enter at least 3 characters");
    e.preventDefault();
    return false;
  }
});

//Shabad controller toggles
$(".shabad-controller-toggle").on("click", shabadToggle);

//Shabad display option toggles
$(".display-option-toggle").on("click", displayOptionToggle);

$("#open-mobile-menu").on("click", function() {
  toggleClass(document.body, "menu-open");
})
$(".top-bar-right .close a").on("click", function() {
  document.body.classList.remove("menu-open");
})

$("#open_share_menu").on("click", function() {
  toggleClass(document.body, "share-open");
})

$("#search-options select").on("change", function() {
  var update = $(this).data("update");
  $("#" + update).val($(this).val());
  if ($(this).attr("id") == "search-source") {
    $("#top-bar-search-form").submit();
  }
});

document.querySelector(".gurmukhi-keyboard-toggle").addEventListener("click", () =>
  toggleClass(document.querySelector('.gurmukhi-keyboard'), 'active')
);

$("#shabad").on("click", ".share .copy", function() {
  let el = $(this).parents(".line").children("textarea");
  el.show().select();
  document.execCommand("copy");
  el.blur().hide();
});
$("#shabad").on("click", ".share .twitter", function() {
  let tweet = $(this).parents(".line").children("textarea").val();
  let shortURL = '\n'+shortenURL();
  if (tweet.length + shortURL.length > 134) {
    tweet = tweet.substring(0,132-shortURL.length) + "..";
  }
  tweet += shortURL
  tweet += " #sttm";
  window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweet), "_blank");
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
      $search.classList.remove("gurbani-font");
      $search.placeholder = searchType === 5 ? "Ang Number" : "Khoj";
      break;
    default:
      $search.classList.add("gurbani-font");
      $search.placeholder = "Koj";
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
      $search.setAttribute('name','ang');
      $search.removeAttribute('pattern');
      $search.removeAttribute('title', '');
      break;
    default:
      $search.setAttribute('pattern', '.{3,}');
      $search.setAttribute('title', 'Enter 3 characters minimum.');
      $form.setAttribute('action', '/search');
      $search.setAttribute('name','q');
      break;
  }
  $searchType.value = searchType;
}

function shabadToggle(e) {
  toggleClass(e.currentTarget, 'active');
  const option = e.currentTarget.id;
  switch (option) {
    case 'display-options-toggle':
      toggleClass(document.querySelector('#display-options'), 'hidden');
      break;
    case 'unicode-toggle':
    case 'larivaar-toggle':
    case 'larivaar_assist-toggle': {
      const [toggle] = e.target.id.split('-');
      toggleClass(document.querySelector('.display'), toggle);
      checkboxPref(e, 'shabadToggles', option);
      break;
    }
  }
}

function displayOptionToggle(e) {
  const option = e.target.id;
  const $display = document.querySelector('.display');

  toggleClass(e.target, 'active');
  toggleClass($display, option);

  checkboxPref(e, 'displayOptions', option);

  // Update the textarea for copy/social sharing
  $('.display .line').each(function () {
    const lineShareText = [];
    $(this).children('p:visible, blockquote:visible').each(function () {
      let text = '';
      if ($(this).children('div.unicode').length > 0) {
        text = $(this).children('div.unicode').text();
      } else {
        text = $(this).text();
      }
      if (text) {
        lineShareText.push(text);
      }
    });
    $(this).find('textarea').val(lineShareText.join('\n'));
  });
}

function shortenURL(url = window.location.href) {
  var path = window.location.pathname;
  var shortdomain = 'sttm.ws';

  var r = 'http://'+shortdomain;

  switch(path) {
    case '/shabad':
      return r+'/s/'+getParameterByName('id');
      break;
    case '/ang':
      return r+'/a/'+getParameterByName('ang');
      break;
    case '/hukamnama':
      return r+'/h';
      break;
    default:
      return url.replace(window.location.hostname,shortdomain);
      break;
  }
}
