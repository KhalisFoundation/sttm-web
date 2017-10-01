function renderShabad(gurbani) {
  document.body.classList.remove("loading");
  $shabad.appendChild(<div class="shabad-container">{Baani(gurbani)}</div>)
  $.each(prefs.displayOptions, function(index, option) {
    document.getElementById(option).click();
  });
  $.each(prefs.shabadToggles, function(index, option) {
    document.getElementById(option).click();
  });
  $controls.classList.remove('hidden');
}

function metaData(data) {
  let page_type_gurmukhi  = data.source.id == 'G' ? 'AMg' : 'pMnw';
  let page_type_english   = data.source.id == 'G' ? 'Ang' : 'Pannaa';
  let gurmukhi_meta       = [];
  let english_meta        = [];
  if (data.raag && data.raag.gurmukhi && data.raag.gurmukhi != "null") {
    gurmukhi_meta.push(data.raag.gurmukhi);
    english_meta.push(data.raag.english);
  }
  if (data.writer) {
    gurmukhi_meta.push(data.writer.gurmukhi);
    english_meta.push(data.writer.english);
  }
  gurmukhi_meta.push(data.source.gurmukhi);
  english_meta.push(data.source.english);

  gurmukhi_meta.push('<a href="/ang?ang=' + data.source.pageno + '&amp;source=' + data.source.id + '">' + page_type_gurmukhi + ' ' + data.source.pageno + '</a>');
  english_meta.push('<a href="/ang?ang=' + data.source.pageno + '&amp;source=' + data.source.id + '">' + page_type_english + ' ' + data.source.pageno + '</a>');0

  $meta.appendChild(<h4 class="gurbani-font">{gurmukhi_meta.join(" - ")}</h4>);
  $meta.appendChild(<h4>{english_meta.join(' - ')}</h4>);

  $meta.classList.remove('hidden');
}

// Deprecated. Please use Baani instead.
function baani(gurbani) {
  return h('div', { class: 'shabad-content' } , gurbani.map(({ shabad }) => h('div', { id: 'line-' + shabad.id, class: 'line' }, [
    h('p', { class: 'gurmukhi gurbani-display gurbani-font' }, [
      h('div', { class: 'gurlipi' }, prepareLarivaar(shabad.gurbani.gurmukhi)),
      h('div', { class: 'unicode' }, prepareLarivaar(shabad.gurbani.unicode))
    ]),
    h('div', { class: 'transliteration english' }, shabad.transliteration),
    h('blockquote', { class: 'translation punjabi gurbani-font' }, [
      h('div', { class: 'gurlipi' }, shabad.translation.punjabi.bms.gurmukhi),
      h('div', { class: 'unicode' }, shabad.translation.punjabi.bms.unicode)
    ]),
    h('blockquote', { class: 'translation english' }, shabad.translation.english.ssk),
    h('blockquote', { class: 'translation spanish' }, shabad.translation.spanish),
    h('div', { class: 'share' }, [
      h('a', { class: 'copy' },
        h('i', { class: 'fa fa-fw fa-clipboard' })),
      h('a', { class: 'twitter' },
        h('i', { class: 'fa fa-fw fa-twitter' }))/*,
      h('a', { class: 'facebook' },
        h('i', { class: 'fa fa-fw fa-facebook' }))*/
    ]),
    h('textarea', {}, shabad.GurmukhiUni + "\n" + shabad.English)
  ])));
}

function Baani(gurbani) {
  return (
    <div class="shabad-content">
      {
        gurbani.map(({ shabad }) => (
          <div id={"line-" + shabad.id} class="line">
            <p class="gurmukhi gurbani-display gurbani-font">
              <div class="gurlipi">{prepareLarivaar(shabad.gurbani.gurmukhi)}</div>
              <div class="unicode">{prepareLarivaar(shabad.gurbani.unicode)}</div>
            </p>
            <p class="transliteration english">{shabad.transliteration}</p>
            <blockquote class="translation punjabi gurbani-font">
              <div class="gurlipi">{shabad.translation.punjabi.bms.gurmukhi}</div>
              <div class="unicode">{shabad.translation.punjabi.bms.unicode}</div>
            </blockquote>

            <blockquote class="translation english">{shabad.translation.english.ssk}</blockquote>

            <blockquote class="translation spanish">{shabad.translation.spanish}</blockquote>

            <div class="share">
              <a class="copy">
                <i class="fa fa-fw fa-clipboard" />
              </a>
              <a class="twitter">
                <i class="fa fa-fw fa-twitter" />
              </a>
              {/*<a class="facebook">,
                <i class="fa fa-fw fa-facebook" />
              </a>*/}
            </div>
            <textarea>{shabad.GurmukhiUni + "\n" + shabad.English}</textarea>
          </div>
        ))
      }
    </div>
  );
}

function prepareLarivaar(padChhed) {
  return padChhed
    .split(' ')
    .map(val => (val.indexOf('॥') !== -1 || val.indexOf(']') !== -1)
      ? `<i>${val} </i>`
      : `<div class="akhar">${val}</div>`
    )
    .join('')
}
