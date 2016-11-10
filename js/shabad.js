'use strict';
const $shabad = document.querySelector('.shabad');

window.onload = () => {
  const [id, q] = ['id', 'q'].map(v => getParameterByName(v))
  document.querySelector(`[name=q]`).value = q;

  $shabad.innerHTML = 'Loading...';
  fetch(buildApiUrl({ id }))
    .then(r => r.json())
    .then(({ gurbani }) => { $shabad.innerHTML = ''; renderShabad(gurbani); })
    .catch(error => showError(error));
}

function showError(error) {
  $shabad.appendChild(h('h2', { }, [
    h('h3', { class: 'text-center' }, 'Facing some issues'),
    h('code', {}, JSON.stringify(error, null, 2))
  ]));
}
