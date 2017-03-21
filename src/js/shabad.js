'use strict';
$(function() {
  const [random, id, q, type] = ['random', 'id', 'q', 'type'].map(v => getParameterByName(v))

  updateSearchLang(type);
  updateSearchAction(type);

  document.body.classList.toggle("loading");
  $.ajax({
    url: random ? buildApiUrl({ random: true }) : buildApiUrl({ id }),
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
    H3('Facing some issues'),
  ]));
}
