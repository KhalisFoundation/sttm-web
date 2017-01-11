'use strict';
const $searchResults = document.querySelector('.search-results');

const sampleQueries = ['mnke', 'kqqkqh', 'enhh'];

const randomArrayValue = arr => arr[parseInt(Math.random(arr.length))];

const H3 = children => h('h3', { class: 'text-center' }, children);

const params = ['type', 'source', 'q'];

const [type = 0, source = 'all', q = ''] = params.map(v => getParameterByName(v));

window.onload = () => {
  updateSearchLang(type);
  document.querySelector(`[name=q]`).value = q;
  document.querySelector(`[name=type]`).value = type;
  document.querySelector(`[name=source]`).value = source;

  if (q === '') {
    const randomQuery = randomArrayValue(sampleQueries);
    $searchResults.appendChild(H3([
      h('span', {}, 'Write a query like '),
      h('a', { href: `?q=${randomQuery}`, class: 'gurbani-font-normal' }, randomQuery),
    ]));
    return;
  }

  $searchResults.appendChild(H3('Loading...'));
  fetch(buildApiUrl({ q, type, source }))
    .then(r => r.json())
    .then(result => {
      $searchResults.innerHTML = '';
      result.count != 0
        ? result.shabads.forEach(({ shabad }) => addSearchResult(shabad, q))
        : noResults();
    })
    .catch(error => showError(error));
}

function addSearchResult(shabad, q) {
  const { Gurmukhi, English, ShabadID, SourceID, PageNo, RaagEnglish, WriterEnglish } = shabad;
  const url = `${window.location.origin + window.location.pathname.replace('search.html', 'shabad.html')}?id=${ShabadID}`;
  $searchResults.appendChild(
    h('li', { class: 'search-result' }, [
      h('a', {
        href: `shabad.html?id=${ShabadID}&q=${q}${type ? `&type=${type}` : ''}${source ? `&source=${source}` : ''}`,
        class: 'gurbani-font',
      }, Gurmukhi),
      h('a', { href: `shabad.html?id=${ShabadID}$q=${q}&type=${type}&source=${source}`, class: 'url', }, url),
      h('p', { }, English),
      h('div', { class: 'meta flex wrap'} , [
        h('a', { href: '#', }, `${SOURCES[SourceID]} - ${PageNo}`),
        h('a', { href: '#', }, `${WriterEnglish}`),
        h('a', { href: '#', }, `${RaagEnglish}`),
      ]),
    ])
  );
}

function noResults() {
  $searchResults.appendChild(H3('No results found'));
}

function showError(error) {
  console.error(error);
  $searchResults.appendChild(h('h2', { }, [
    h('h3', { class: 'text-center' }, 'Facing some issues'),
    h('code', {}, JSON.stringify(error, null, 2))
  ]));
}
