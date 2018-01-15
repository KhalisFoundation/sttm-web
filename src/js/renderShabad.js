function renderShabad(gurbani, nav) {
  document.body.classList.remove("loading");

  let footnav = null;
  if(typeof nav != "undefined") {
    let link        = navLink(nav);
    let pagination  = [];
    if (typeof nav.previous != "undefined") {
      pagination.push(<div class="shabad-nav left"><a href={link + nav.previous}><div>Previous</div><i class="fa fa-chevron-left" aria-hidden="true"></i></a></div>);
    }

    if (typeof nav.next != "undefined") {
      pagination.push(<div class="shabad-nav right"><a href={link + nav.next}><div>Next</div><i class="fa fa-chevron-right" aria-hidden="true"></i></a></div>);
    }
    footnav = <div class="pagination">{pagination}</div>;
  }

  $shabad.appendChild(<div class="shabad-container">{[ Baani(gurbani), footnav, ]}</div>);

  prefs
    .displayOptions
    .concat(prefs.shabadToggles)
    .forEach(option => document.getElementById(option).click());

  $controls.classList.remove('hidden');
}

function navLink(nav, source) {
    switch (nav.type) {
      case 'shabad': return 'shabad?id=';
      case 'ang': return `ang?source=${source}&ang=`;
    }
}

function metaData(data, nav) {
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

  gurmukhi_meta.push(
    (
      <a href={`/ang?ang=${data.source.pageno}&source=${data.source.id}`}>
        {`${page_type_gurmukhi} ${data.source.pageno}`}
      </a>
    ).outerHTML
  );

  english_meta.push(
    (
      <a href={`/ang?ang=${data.source.pageno}&source=${data.source.id}`}>
        {`${page_type_english} ${data.source.pageno}`}
      </a>
    ).outerHTML
  );

  if(typeof nav != "undefined") {
    let link = navLink(nav,data.source.id);

    if (typeof nav.previous !== "undefined") {
      $meta.appendChild(<div class="shabad-nav left"><a href={link + nav.previous}><i class="fa fa-chevron-left" aria-hidden="true"></i></a></div>);
    }

    if (typeof nav.next !== "undefined") {
      $meta.appendChild(<div class="shabad-nav right"><a href={link + nav.next}><i class="fa fa-chevron-right" aria-hidden="true"></i></a></div>);
    }
  }

  $meta.appendChild(<h4 class="gurbani-font">{gurmukhi_meta.join(' - ')}</h4>);
  $meta.appendChild(<h4>{english_meta.join(' - ')}</h4>);

  $meta.classList.remove('hidden');
}

function Baani(gurbani) {
  const BaaniLine = ({ gurmukhi, unicode }) => (
    <div class="gurmukhi gurbani-display gurbani-font" >
      <div class="gurlipi">{prepareLarivaar(gurmukhi)}</div>
      <div class="unicode">{prepareLarivaar(unicode)}</div>
    </div>
  );
  const EnglishTransliteration = ({ transliteration }) => (
    <p class="transliteration english">{transliteration}</p>
  )
  const SpanishTranslation = ({ translation }) => (
    <blockquote class="translation spanish">{translation}</blockquote>
  );
  const EnglishTranslation = ({ translation }) => (
    <blockquote class="translation english">{translation}</blockquote>
  );
  const PunjabiTranslation = ({ gurmukhi, unicode }) => (
    <blockquote class="translation punjabi gurbani-font">
      <div class="gurlipi">{gurmukhi}</div>
      <div class="unicode">{unicode}</div>
    </blockquote>
  );

  return (
    <div class="shabad-content">
      <div class="mixed-view-baani">
        {
          gurbani.map(({ shabad }) => (
            <div id={"line-" + shabad.id} class="line">
              {BaaniLine(shabad.gurbani)}
              {EnglishTransliteration(shabad)}
              {PunjabiTranslation(shabad.translation.punjabi.bms)}
              {EnglishTranslation({ translation: shabad.translation.english.ssk })}
              {SpanishTranslation({ translation: shabad.translation.spanish })}
              <div class="share">
                <a class="copy"><i class="fa fa-fw fa-clipboard" /></a>
                <a class="twitter"><i class="fa fa-fw fa-twitter" /></a>
                {/*<a class="facebook"><i class="fa fa-fw fa-facebook" /></a>*/}
              </div>
              <textarea>{`${shabad.gurbani.unicode}\n${shabad.translation.english.ssk}`}</textarea>
            </div>
          ))
        }
      </div>
      <div class="split-view-baani">
        <div>{gurbani.map(({ shabad }) => (
          <div class="line">
            {BaaniLine(shabad.gurbani)}
            <div class="share">
              <a class="copy"><i class="fa fa-fw fa-clipboard" /></a>
              <a class="twitter"><i class="fa fa-fw fa-twitter" /></a>
              {/*<a class="facebook"><i class="fa fa-fw fa-facebook" /></a>*/}
            </div>
            <textarea>{`${shabad.gurbani.unicode}\n${shabad.translation.english.ssk}`}</textarea>
          </div>
        ))}</div>
        <div>{gurbani.map(({ shabad }) => EnglishTransliteration(shabad))}</div>
        <div>{gurbani.map(({ shabad }) => PunjabiTranslation(shabad.translation.punjabi.bms))}</div>
        <div>{gurbani.map(({ shabad }) => EnglishTranslation({ translation: shabad.translation.english.ssk }))}</div>
        <div>{gurbani.map(({ shabad }) => SpanishTranslation({ translation: shabad.translation.spanish }))}</div>
      </div>
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
