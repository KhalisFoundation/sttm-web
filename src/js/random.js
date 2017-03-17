'use strict';

$(function() {
  const q = getParameterByName('q');

  document.body.classList.toggle("loading");
  $.ajax({
    url: buildApiUrl({ random: true }),
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

