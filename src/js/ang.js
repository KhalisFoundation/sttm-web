'use strict';
$(function() {
  const [ang, source] = ['ang', 'source'].map(v => getParameterByName(v))

  document.body.classList.toggle("loading");
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
    H3('Facing some issues'),
  ]));
}
