function loadResults(offset = null) {
  return fetch(Khajana.buildApiUrl({ q, type, source, offset }))
    .then(r => r.json())
    .then(({ pageinfo: { pageresults, nextpageoffset }, shabads }) => {
      $("h3.loading, li.load-more").remove();

      switch (pageresults) {
        case 0: {
          noResults();
          break;
        }

          // I'm feeling lucky
        case 1: {
          document.body.classList.remove("loading");
          const [{ shabad }] = shabads;
          location.href = getShabadHyperLink(shabad);
          return;
        }

        default: {
          document.body.classList.remove("loading");

          shabads.forEach(({ shabad }) => addSearchResult(shabad, q));

          if (nextpageoffset) {
            $searchResults.appendChild(
              h('li', { class: 'load-more' },
                h('a', { class: 'load button', 'data-nextpage': nextpageoffset }, 'Load More')
              )
            );
          }
        }
      }

      if (!offset) {
        [...prefs.displayOptions, ...prefs.shabadToggles]
          .forEach(option => document.getElementById(option).click());

        addSpaceForPadChed((prefs.shabadToggles.indexOf('larivaar-toggle') < 0));
        $controls.classList.remove('hidden');
      }

      Object
        .keys(prefs.sliders)
        .forEach((key) => {
          const s = document.getElementById(key);
          s.value = prefs.sliders[key];
          displayOptionSlider(s);
        });

    })
    .catch(error => {
      $searchResults.appendChild(
        <h2>
          <h3 class="text-center">Facing some issues</h3>
        </h2>
      );
      console.error(error);
    });
}

function getShabadHyperLink(shabad) {
  return `/shabad?id=${shabad.shabadid}&q=${q}${type ? `&type=${type}` : ''}${source ? `&source=${source}` : ''}`;
}

function addSearchResult(shabad, q) {
  const _source = Khajana.SOURCES[shabad.source.id];

  // if page num is null
  const shabadPageNo = (shabad.pageno === null) ? '' : shabad.pageno;
  const source = _source ? `${_source} - ${shabadPageNo}` : null;

  $searchResults.appendChild(
    <li class='search-result'>
      <a href={getShabadHyperLink(shabad)} class='gurbani-font gurbani-display'>
        <div class='gurlipi'>{prepareLarivaar(shabad.gurbani.gurmukhi)}</div>
        <div class='unicode'>{prepareLarivaar(shabad.gurbani.unicode)}</div>
      </a>

      <div class='clear' />

      <p class='transliteration english'>{shabad.transliteration}</p>

      <blockquote class='translation punjabi gurbani-font'>
        <div class='gurlipi'>{shabad.translation.punjabi.bms.gurmukhi}</div>
        <div class='unicode'>{shabad.translation.punjabi.bms.unicode}</div>
      </blockquote>

      <blockquote class='translation english'>{shabad.translation.english.ssk}</blockquote>

      <blockquote class='translation spanish'>{shabad.translation.spanish}</blockquote>

      <div class='meta flex wrap'>
        {source && <a href='#'>{source}</a>}

        <a href='#'>{shabad.writer.english}</a>

        {shabad.raag.english === 'No Raag' || shabad.raag.english === null
            ? ''
            : <a href='#'>{shabad.raag.english}</a>
        }
      </div>
    </li>
  );
}

function noResults() {
  document.body.classList.remove('loading');
  $searchResults.appendChild(<h3>No results found</h3>);
}

function fetchSearchResults () {
  const $searchResults = document.querySelector('.search-results');

  const params = ['type', 'source', 'q'];

  const [type = 0, source = 'all', q = ''] = params.map(v => getParameterByName(v));

  [...$searchResults.querySelectorAll('a.load')]
    .forEach(el => el && el.addEventListener('click', () => loadResults(el.dataset.nextpage)));

  if (q === '') {
    $searchResults.appendChild(<h3><span>Please enter your query in the search bar above</span></h3>);
    return;
  }

  document.body.classList.toggle("loading");

  loadResults();
}

fetchSearchResults();
