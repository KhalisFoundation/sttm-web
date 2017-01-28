'use strict';
const $searchResults = document.querySelector('.search-results');

const H3 = children => h('h3', { class: 'text-center' }, children);

const params = ['type', 'source', 'q'];

const [type = 0, source = 'all', q = ''] = params.map(v => getParameterByName(v));

$($searchResults).on("click", "a.load", function() {
  loadResults(this.dataset.nextpage);
});

$(function() {
  updateSearchLang(type);
  
  if (q === '') {
    $searchResults.appendChild(H3([
      h('span', {}, 'Please enter your query in the search bar above'),
    ]));
    return;
  }

  $searchResults.appendChild(h('h3', { class: 'loading text-center' }, 'Loading...'));
  loadResults();
});

function loadResults(offset) {
  $.ajax({
    url: buildApiUrl({ q, type, source, offset }),
    dataType: "json",
    success: function(data) {
      $("h3.loading, li.load-more").remove();
      if (data.pageinfo.pageresults > 0) {
        $.each(data.shabads, function(key, val) {
          addSearchResult(val.shabad, q);
        });
        if (data.pageinfo.nextpageoffset) {
          $searchResults.appendChild(
            h('li', { class: 'load-more' },
              h('a', { class: 'load button', 'data-nextpage': data.pageinfo.nextpageoffset }, 'Load More')
            )
          );
        }
      } else {
        noResults();
      }
    },
    error: showError
  });
}

function addSearchResult(shabad, q) {
  $searchResults.appendChild(
    h('li', { class: 'search-result' }, [
      h('a', {
        href: `/shabad?id=${shabad.shabadid}&q=${q}${type ? `&type=${type}` : ''}${source ? `&source=${source}` : ''}`,
        class: 'gurbani-font gurbani-display',
      }, shabad.gurbani.gurmukhi),
      h('p', { }, shabad.translation.english.ssk),
      h('div', { class: 'meta flex wrap'} , [
        h('a', { href: '#', }, `${SOURCES[shabad.source.id]} - ${shabad.pageno}`),
        h('a', { href: '#', }, `${shabad.writer.english}`),
        h('a', { href: '#', }, `${shabad.raag.english}`),
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
