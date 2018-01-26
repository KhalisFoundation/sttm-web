'use strict';
const $searchResults = document.querySelector('.search-results');

const params = ['type', 'source', 'q'];

const [type = 0, source = 'all', q = ''] = params.map(v => getParameterByName(v));

$($searchResults).on("click", "a.load", function() {
  loadResults(this.dataset.nextpage);
});

$(function() {
  if (q === '') {
    $searchResults.appendChild(H3([
      h('span', {}, 'Please enter your query in the search bar above'),
    ]));
    return;
  }

  document.body.classList.toggle("loading");
  loadResults();
});

function loadResults(offset) {
  $.ajax({
    url: Khajana.buildApiUrl({ q, type, source, offset }),
    dataType: "json",
    success: function({ pageinfo: { pageresults, nextpageoffset }, shabads }) {
      $("h3.loading, li.load-more").remove();

      switch (pageresults) {
        case 0: {
          noResults();
          break;
        }

        // I'm feeling lucky
        case 1: {
          document.body.classList.remove("loading");
          const [{ shabad }] = shabads;
          location.href = getShabadHyperLink(shabad);
          return;
        }

        default: {
          document.body.classList.remove("loading");

          shabads.forEach(({ shabad }) => addSearchResult(shabad, q));

          if (nextpageoffset) {
            $searchResults.appendChild(
              h('li', { class: 'load-more' },
                h('a', { class: 'load button', 'data-nextpage': nextpageoffset }, 'Load More')
              )
            );
          }
        }
      }

      [...prefs.displayOptions, ...prefs.shabadToggles]
        .forEach(option => document.getElementById(option).click())

      $controls.classList.remove('hidden');
    },
    error: showError
  });
}

function getShabadHyperLink(shabad) {
  return `/shabad?id=${shabad.shabadid}&q=${q}${type ? `&type=${type}` : ''}${source ? `&source=${source}` : ''}`;
}

function getRaagOrNull(raag) {
  if (raag === 'No Raag' || raag === null) { return ''; } { return raag; }
}

function addSearchResult(shabad, q) {
  const _source = Khajana.SOURCES[shabad.source.id];
  const source = _source ? `${_source} - ${shabad.pageno}`: null;

  $searchResults.appendChild(
    h('li', { class: 'search-result' }, [
      h('a', {
        href: getShabadHyperLink(shabad),
        class: 'gurbani-font gurbani-display',
      }, [
      h('div', { class: 'gurlipi' }, prepareLarivaar(shabad.gurbani.gurmukhi)),
      h('div', { class: 'unicode' }, prepareLarivaar(shabad.gurbani.unicode))
    ]),
    h('div', { class: 'clear'}, ''),
    h('p', { class: 'transliteration english' }, shabad.transliteration),
    h('blockquote', { class: 'translation punjabi gurbani-font' }, [
      h('div', { class: 'gurlipi' }, shabad.translation.punjabi.bms.gurmukhi),
      h('div', { class: 'unicode' }, shabad.translation.punjabi.bms.unicode)
    ]),
    h('blockquote', { class: 'translation english' }, shabad.translation.english.ssk),
    h('blockquote', { class: 'translation spanish' }, shabad.translation.spanish),
      h('div', { class: 'meta flex wrap'} , [
        source && h('a', { href: '#' }, source),
        h('a', { href: '#' }, `${shabad.writer.english}`),
        h('a', { href: '#' }, getRaagOrNull(shabad.raag.english)),
      ])
    ])
  );
}

function noResults() {
  document.body.classList.remove("loading");
  $searchResults.appendChild(H3('No results found'));
}

function showError(error) {
  $searchResults.appendChild(h('h2', { }, [
    H3('Facing some issues'),
  ]));
}
