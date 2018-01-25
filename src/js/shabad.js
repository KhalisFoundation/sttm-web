'use strict';
$(function() {
  const [random, id, q, type] = ['random', 'id', 'q', 'type'].map(v => getParameterByName(v))

  document.body.classList.toggle("loading");

  $.ajax({
    url: Khajana.buildApiUrl(typeof random !== 'undefined' ? { random: true } : { id }),
    dataType: "json",
    success: function(data) {
      if(typeof random !== 'undefined') {
        window.history.pushState("", "", '/shabad?q=random&id=' + data.shabadinfo.id);
      }
      $shabad.innerHTML = '';
      data.navigation.type = 'shabad';
      metaData(data.shabadinfo, data.navigation);
      renderShabad(data.gurbani, data.navigation);
    },
    error: showError
  });
});

function showError(error) {
  $shabad.appendChild(h('h2', { }, [
    H3('Facing some issues'),
  ]));
}
