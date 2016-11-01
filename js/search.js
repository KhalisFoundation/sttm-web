const API_URL = `https://api.gurbaninow.com`;
const $searchResults = document.querySelector('.search-results');

window.onload = () => {
  const q = getParameterByName('q');
  document.querySelector(`[name=q]`).value = q;
  fetch(`${API_URL}/search/${q}`)
    .then(r => r.json())
    .then(result => result.count != 0 
      ? result.shabads.forEach(({ shabad }) => addSearchResult(shabad))
      : noResults()
    )
    .catch(error => showError(error));
}


function h(type = 'div', attributes = { }, children = '') {
  let el = document.createElement(type);

  Object.keys(attributes).forEach(key => {
    let value = attributes[key];
    if (typeof value === 'function') {
      el.addEventListener(key, e => value(e), false);
    } else {
      el.setAttribute(key, value);
    }
  });

  if (children instanceof Array) {
    children.forEach(child => el.appendChild(child));
  } else if (children instanceof HTMLElement) {
    el.appendChild(children);
  } else if (typeof children === 'string') {
    el.textContent = children;
  }

  return el;
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function addSearchResult(shabad) {
  const { Gurmukhi, English } = shabad;
  $searchResults.appendChild(
    h('li', { class: 'search-result' }, [
      h('a', { href: '#', class: 'gurbani-font' }, Gurmukhi),
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
