'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var H3 = function H3(children) {
  return h('h3', { class: 'text-center' }, children);
};

$(function () {
  var _map = ['id', 'q', 'type'].map(function (v) {
    return getParameterByName(v);
  }),
      _map2 = _slicedToArray(_map, 3),
      id = _map2[0],
      q = _map2[1],
      type = _map2[2];

  updateSearchLang(type);

  $shabad.appendChild(H3('Loading...'));
  $.ajax({
    url: buildApiUrl({ id: id }),
    dataType: "json",
    success: function success(data) {
      $shabad.innerHTML = '';
      metaData(data.shabadinfo);
      renderShabad(data.gurbani);
    },
    error: showError
  });
});

function showError(error) {
  $shabad.appendChild(h('h2', {}, [h('h3', { class: 'text-center' }, 'Facing some issues')]));
}