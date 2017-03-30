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
    success: function(data) {
      $("h3.loading, li.load-more").remove();
      if (data.pageinfo.pageresults > 0) {
        document.body.classList.remove("loading");
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
    
      $.each(prefs.displayOptions, function(index, option) {
        $("#" + option).click();
      });
      $.each(prefs.shabadToggles, function(index, option) {
        $("#" + option).click();
      })
      $controls.classList.remove('hidden');
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
        h('a', { href: '#', }, `${Khajana.SOURCES[shabad.source.id]} - ${shabad.pageno}`),
        h('a', { href: '#', }, `${shabad.writer.english}`),
        h('a', { href: '#', }, `${shabad.raag.english}`),
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
