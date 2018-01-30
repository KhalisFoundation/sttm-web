function fetchShabad () {
  const [random, id, q, type] = ['random', 'id', 'q', 'type'].map(v => getParameterByName(v));

  document.body.classList.toggle('loading');

  return fetch(Khajana.buildApiUrl(typeof random !== 'undefined' ? { random: true } : { id }))
    .then(r => r.json())
    .then(data => {
      if (typeof random !== 'undefined') {
        window.history.replaceState('', '', `/shabad?id=${data.shabadinfo.id}`);
      }

      $shabad.innerHTML = '';
      data.navigation.type = 'shabad';
      metaData(data.shabadinfo, data.navigation);
      renderShabad(data.gurbani, data.navigation);
    })
    .catch(error => {
      $shabad.appendChild(
        <h2>
          <h3 class='text-center'>Facing some issues</h3>
        </h2>
      );
      console.error(error);
    });
}

fetchShabad();
