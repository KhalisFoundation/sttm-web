'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var $searchResults = document.querySelector('.search-results');

var H3 = function H3(children) {
  return h('h3', { class: 'text-center' }, children);
};

var params = ['type', 'source', 'q'];

var _params$map = params.map(function (v) {
  return getParameterByName(v);
}),
    _params$map2 = _slicedToArray(_params$map, 3),
    _params$map2$ = _params$map2[0],
    type = _params$map2$ === undefined ? 0 : _params$map2$,
    _params$map2$2 = _params$map2[1],
    source = _params$map2$2 === undefined ? 'all' : _params$map2$2,
    _params$map2$3 = _params$map2[2],
    q = _params$map2$3 === undefined ? '' : _params$map2$3;

$($searchResults).on("click", "a.load", function () {
  loadResults(this.dataset.nextpage);
});

$(function () {
  updateSearchLang(type);

  if (q === '') {
    $searchResults.appendChild(H3([h('span', {}, 'Please enter your query in the search bar above')]));
    return;
  }

  $searchResults.appendChild(h('h3', { class: 'loading text-center' }, 'Loading...'));
  loadResults();
});

function loadResults(offset) {
  $.ajax({
    url: buildApiUrl({ q: q, type: type, source: source, offset: offset }),
    dataType: "json",
    success: function success(data) {
      $("h3.loading, li.load-more").remove();
      if (data.pageinfo.pageresults > 0) {
        $.each(data.shabads, function (key, val) {
          addSearchResult(val.shabad, q);
        });
        if (data.pageinfo.nextpageoffset) {
          $searchResults.appendChild(h('li', { class: 'load-more' }, h('a', { class: 'load button', 'data-nextpage': data.pageinfo.nextpageoffset }, 'Load More')));
        }
      } else {
        noResults();
      }
    },
    error: showError
  });
}

function addSearchResult(shabad, q) {
  $searchResults.appendChild(h('li', { class: 'search-result' }, [h('a', {
    href: '/shabad?id=' + shabad.shabadid + '&q=' + q + (type ? '&type=' + type : '') + (source ? '&source=' + source : ''),
    class: 'gurbani-font gurbani-display'
  }, shabad.gurbani.gurmukhi), h('p', {}, shabad.translation.english.ssk), h('div', { class: 'meta flex wrap' }, [h('a', { href: '#' }, SOURCES[shabad.source.id] + ' - ' + shabad.pageno), h('a', { href: '#' }, '' + shabad.writer.english), h('a', { href: '#' }, '' + shabad.raag.english)])]));
}

function noResults() {
  $searchResults.appendChild(H3('No results found'));
}

function showError(error) {
  $searchResults.appendChild(h('h2', {}, [h('h3', { class: 'text-center' }, 'Facing some issues')]));
}