'use strict';
const H3 = children => h('h3', { class: 'text-center' }, children);

$(function() {
  const [id, q, type] = ['id', 'q', 'type'].map(v => getParameterByName(v))
  updateSearchLang(type);

  $shabad.appendChild(H3('Loading...'));
  $.ajax({
    url: buildApiUrl({ id }),
    dataType: "json",
    success: function(data) {
      $shabad.innerHTML = '';
      metaData(data.shabadinfo);
      renderShabad(data.gurbani);
    },
    error: showError
  });
});

function showError(error) {
  $shabad.appendChild(h('h2', { }, [
    h('h3', { class: 'text-center' }, 'Facing some issues')
  ]));
}
