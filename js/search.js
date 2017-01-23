'use strict';
const $searchResults = document.querySelector('.search-results');

const H3 = children => h('h3', { class: 'text-center' }, children);

const params = ['type', 'source', 'q'];

const [type = 0, source = 'all', q = ''] = params.map(v => getParameterByName(v));

$(function() {
  updateSearchLang(type);
  
  if (q === '') {
    $searchResults.appendChild(H3([
      h('span', {}, 'Please enter your query in the search bar above'),
    ]));
    return;
  }

  $searchResults.appendChild(H3('Loading...'));
  $.ajax({
    url: buildApiUrl({ q, type, source }),
    dataType: "json",
    success: function(data) {
      $searchResults.innerHTML = '';
      if (data.count != 0) {
        $.each(data.shabads, function(key, val) {
          addSearchResult(val.shabad, q);
        });
      } else {
        noResults();
      }
    },
    error: showError
  });
});

function addSearchResult(shabad, q) {
  const { Gurmukhi, English, ShabadID, SourceID, PageNo, RaagEnglish, WriterEnglish } = shabad;
  const url = `${window.location.origin + window.location.pathname.replace('/search', '/shabad')}?id=${ShabadID}`;
  $searchResults.appendChild(
    h('li', { class: 'search-result' }, [
      h('a', {
        href: `/shabad?id=${ShabadID}&q=${q}${type ? `&type=${type}` : ''}${source ? `&source=${source}` : ''}`,
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
  $searchResults.appendChild(h('h2', { }, [
    h('h3', { class: 'text-center' }, 'Facing some issues')
  ]));
}
