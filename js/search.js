'use strict';
const API_URL = `https://api.gurbaninow.com`;
const $searchResults = document.querySelector('.search-results');

window.onload = () => {
  const q = getParameterByName('q');
  document.querySelector(`[name=q]`).value = q;
  fetch(`${API_URL}/search/${q}`)
    .then(r => r.json())
    .then(result => result.count != 0 
      ? result.shabads.forEach(({ shabad }) => addSearchResult(shabad, q))
      : noResults()
    )
    .catch(error => showError(error));
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function addSearchResult(shabad, q) {
  const { Gurmukhi, English, ID } = shabad;
  $searchResults.appendChild(
    h('li', { class: 'search-result' }, [
      h('a', { href: `shabad.html?id=${ID}&q=${q}`, class: 'gurbani-font' }, Gurmukhi),
      h('p', { }, English),
    ])
  );
}

function noResults() {
  $searchResults.appendChild(h('h2', { }, 'No results found'));
}

function showError(error) {
  $searchResults.appendChild(h('h2', { }, [
    h('h3', { class: 'text-center' }, 'Facing some issues'),
    h('code', {}, JSON.stringify(error, null, 2))
  ]));
}
