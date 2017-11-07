'use strict';
$(function() {
  const [ang, source] = ['ang', 'source'].map(v => getParameterByName(v))

  document.body.classList.toggle("loading");
  $.ajax({
    url: Khajana.buildApiUrl({ ang, source }),
    dataType: "json",
    success: function(data) {
      $shabad.innerHTML = '';
      data.navigation.type='ang';
      metaData(data,data.navigation);
      renderShabad(data.page, data.navigation);
    },
    error: showError
  });
});

function showError(error) {
  $shabad.appendChild(h('h2', { }, [
    H3('Facing some issues'),
  ]));
}
