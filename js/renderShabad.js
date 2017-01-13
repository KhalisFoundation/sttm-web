function renderShabad(gurbani) {
  $shabad.appendChild(h('div', { class: 'shabad-container' }, [ buttons(), baani(gurbani), ]));
  document.querySelector('select[name=translations]').value = '.translation.english';
}

function baani(gurbani) {
  return h('div', { class: 'shabad-content' } , gurbani.map(({ shabad }) => h('div', {  }, [
    h('p', { class: 'gurlipi gurbani-font' }, shabad.Gurmukhi),
    h('p', { class: 'unicode gurbani-font hidden' }, shabad.GurmukhiUni),
    h('p', { class: 'transliteration english hidden' }, shabad.Transliteration),
    h('blockquote', { class: 'translation punjabi gurbani-font-normal hidden' }, shabad.Punjabi),
    h('blockquote', { class: 'translation english' }, shabad.English),
    h('blockquote', { class: 'translation spanish hidden' }, shabad.Spanish),
  ])));
}

function buttons () {
  const transliterations = {
    'Transliteration': null,
    'English Transliteration': '.transliteration.english'
  };

  const translations = {
    'Translation': null,
    'Punjabi Translation': '.translation.punjabi',
    'English Translation': '.translation.english',
    'Spanish Translation': '.translation.spanish',
  };

  function renderCheckbox({ id, text }) {
    function click () {
      Array.from($shabad.querySelectorAll('.unicode')).forEach(el => el.classList.toggle('hidden'));
      Array.from($shabad.querySelectorAll('.gurlipi')).forEach(el => el.classList.toggle('hidden'));
    }
    return h('div', { }, [
      h('input', { id, type: 'checkbox', click, class: 'no-select' }),
      h('label', { 'for': id, class: 'no-select' }, text),
    ]);
  }

  function renderDropdown({ name, data }) {
    function change({ target: { value, options } }) {
      Array.from(options)
        .map(e => Array.from($shabad.querySelectorAll(e.value)))
        .forEach(els => els.forEach(el => el.classList.add('hidden')));

      if (value)
        Array.from($shabad.querySelectorAll(value))
          .forEach(el => el && el.classList.remove('hidden'));
    }
    return h('div', { }, [
      h('select', { name, change, }, Object.keys(data).map(key => h('option', { value: data[key] }, key)))
    ]);
  }

  return h('div', { class: 'buttons flex wrap justify-start align-start no-select' }, [
    renderCheckbox({ id: 'unicode-toggle', text: 'Unicode', }),
    renderDropdown({ name: 'transliterations', data: transliterations }),
    renderDropdown({ name: 'translations', data: translations }),
  ]);
}

