'use strict';
const H3 = children => h('h3', { class: 'text-center' }, children);

$(function() {
  const [ang, source] = ['ang', 'source'].map(v => getParameterByName(v))

  $shabad.appendChild(H3('Loading...'));
  $.ajax({
    url: buildApiUrl({ ang, source }),
    dataType: "json",
    success: function(data) {
      $shabad.innerHTML = '';
      metaData(data);
      renderShabad(data.page);
    },
    error: showError
  });
});

function showError(error) {
  $shabad.appendChild(h('h2', { }, [
    h('h3', { class: 'text-center' }, 'Facing some issues')
  ]));
}
