'use strict';
const $searchResults = document.querySelector('.search-results');

const H3 = children => h('h3', { class: 'text-center' }, children);

const params = ['type', 'source', 'q'];

const [type = 0, source = 'all', q = ''] = params.map(v => getParameterByName(v));

window.onload = () => {
  updateSearchLang(type);
  
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
  const url = `${window.location.origin + window.location.pathname.replace('search.php', 'shabad.php')}?id=${ShabadID}`;
  $searchResults.appendChild(
    h('li', { class: 'search-result' }, [
      h('a', {
        href: `shabad.php?id=${ShabadID}&q=${q}${type ? `&type=${type}` : ''}${source ? `&source=${source}` : ''}`,
        class: 'gurbani-font gurbani-display',
      }, Gurmukhi),
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
