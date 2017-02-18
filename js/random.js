'use strict';

$(function () {
  var q = getParameterByName('q');

  $shabad.innerHTML = 'Loading...';
  $.ajax({
    url: buildApiUrl({ random: true }),
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