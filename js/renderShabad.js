function renderShabad(gurbani) {
  const baani = h('div', { class: 'shabad-content' } , gurbani.map(({ shabad }) => h('div', {  }, [
    h('p', { class: 'gurlipi gurbani-font' }, shabad.Gurmukhi),
    h('p', { class: 'unicode gurbani-font hidden' }, shabad.GurmukhiUni),
    h('p', { class: 'transliteration english hidden' }, shabad.Transliteration),
    h('blockquote', { class: 'translation punjabi gurbani-font hidden' }, shabad.Punjabi),
    h('blockquote', { class: 'translation english hidden' }, shabad.English),
    h('blockquote', { class: 'translation spanish hidden' }, shabad.Spanish),
  ])));

  const buttons = h('div', { class: 'buttons flex wrap justify-center align-center' }, [
    renderCheckbox({
      id: 'unicode-toggle',
      text: 'Unicode',
      click: e => {
        $shabad.querySelectorAll('.unicode').forEach(el => el.classList.toggle('hidden'));
        $shabad.querySelectorAll('.gurlipi').forEach(el => el.classList.toggle('hidden'));
      },
    }),
    renderCheckbox({
      id: 'transliteration.english-toggle',
      text: 'English Transliteration',
      click: e => $shabad.querySelectorAll('.transliteration.english').forEach(el => el.classList.toggle('hidden'))
    }),
    renderCheckbox({
      id: 'translation.punjabi-toggle',
      text: 'Punjabi Translation',
      click: e => $shabad.querySelectorAll('.translation.punjabi').forEach(el => el.classList.toggle('hidden'))
    }),
    renderCheckbox({
      id: 'translation.english-toggle',
      text: 'English Translation',
      click: e => $shabad.querySelectorAll('.translation.english').forEach(el => el.classList.toggle('hidden'))
    }),
    renderCheckbox({
      id: 'translation.spanish-toggle',
      text: 'Spanish Translation',
      click: e => $shabad.querySelectorAll('.translation.spanish').forEach(el => el.classList.toggle('hidden'))
    }),
  ]);

  $shabad.appendChild(h('div', {  }, [ buttons, baani, ]));
}

function renderCheckbox({ id, text, click }) {
  return h('div', {  }, [
    h('input', { id, type: 'checkbox', click }),
    h('label', { 'for': id, }, text),
  ]);
}


