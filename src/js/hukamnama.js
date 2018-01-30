function fetchHukamnama() {
  const q = getParameterByName('q');

  document.body.classList.toggle('loading');

  return fetch(Khajana.buildApiUrl({ hukam: true }))
    .then(r => r.json())
    .then(data => {
      $shabad.innerHTML = '';
      metaData(data.shabadinfo);
      renderShabad(data.gurbani);
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

fetchHukamnama();
