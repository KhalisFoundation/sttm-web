'use strict';

$(function() {
  const q = getParameterByName('q');

  document.body.classList.toggle("loading");
  $.ajax({
    url: Khajana.buildApiUrl({ hukam: true }),
    dataType: "json",
    success: function(data) {
      $shabad.innerHTML = '';
      metaData(data.shabadinfo);
      renderShabad(data.gurbani);
    },
    error: showError
  });
});

const errorMessage = (
  <h2>
    <h3 class="text-center">Facing some issues</h3>
  </h2>
);

function showError(error) {
  $shabad.appendChild(errorMessage);
}

