function fetchAng () {
  const [ang, source] = ['ang', 'source'].map(v => getParameterByName(v));

  document.body.classList.toggle('loading');

  return fetch(Khajana.buildApiUrl({ ang, source }))
    .then(r => r.json())
    .then(data => {
      $shabad.innerHTML = '';
      data.navigation.type = 'ang';
      metaData(data, data.navigation);
      renderShabad(data.page, data.navigation);
    })
    .catch(error => {
      $shabad.appendChild(
        <h2>
          <h3 class="text-center">Facing some issues</h3>
        </h2>
      );
      console.error(error);
    });
}

fetchAng();
