const $searchResults = document.querySelector('.search-results');

function loadResults({ source, type, q, offset = null }) {

  return fetch(Khajana.buildApiUrl({ q, type, source, offset }))
    .then(r => r.json())
    .then(({ pageinfo: { pageresults, nextpageoffset }, shabads }) => {

      [...document.querySelectorAll('h3.loading, li.load-more')]
        .forEach(el => el && el.parentNode
          ? el.parentNode.removeChild()
          : el.remove()
        );

      switch (pageresults) {
        case 0: {
          noResults();
          break;
        }

          // I'm feeling lucky
        case 1: {
          document.body.classList.remove('loading');
          const [{ shabad }] = shabads;
          location.href = getShabadHyperLink({ shabad, q, type, source });
          return;
        }

        default: {
          document.body.classList.remove('loading');
<<<<<<< HEAD

          shabads.forEach(({ shabad }) => addSearchResult({ shabad, q, type, source }));

=======

          shabads.forEach(({ shabad }) => addSearchResult({ shabad, q, type, source }));
>>>>>>> Use fetch over jQuery.ajax (#280)

          if (nextpageoffset) {
            const loadMore = e => {
              const shouldLarivaar = prefs.shabadToggles.indexOf('larivaar-toggle') < 0;
              const previousLoadText = e.currentTarget.querySelector('a').innerText;

              e.currentTarget.querySelector('a').innerText = 'Loading ...';
              // To block further clicks.
              e.currentTarget.style.pointerEvents = 'none';

              loadResults({ source, type, q, offset: nextpageoffset })
                .then(() => addSpaceForPadChed(shouldLarivaar))
                .then(() => {
                  // Undo DOM changes.
                  e.currentTarget.querySelector('a').innerText = previousLoadText;
                  e.currentTarget.style.pointerEvents = '';
                });
            };

            $searchResults.appendChild(
<<<<<<< HEAD
              <li class='load-more' click={loadMore}>
=======
              <li class='load-more'>
>>>>>>> Use fetch over jQuery.ajax (#280)
                <a class='load button' data-nextpage={nextpageoffset}>Load More</a>
              </li>
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
          <h3 class='text-center'>Facing some issues</h3>
        </h2>
      );
      console.error(error);
    });
<<<<<<< HEAD
=======
}
>>>>>>> Use fetch over jQuery.ajax (#280)

function getShabadHyperLink({ shabad, q, type, source }) {
  return `/shabad?id=${shabad.shabadid}&q=${q}${type ? `&type=${type}` : ''}${source ? `&source=${source}` : ''}`;
}

function addSearchResult({ shabad, q, type, source }) {
  const _source = Khajana.SOURCES[shabad.source.id];

  // if page num is null
  const shabadPageNo = (shabad.pageno === null) ? '' : shabad.pageno;
  const presentationalSource = _source ? `${_source} - ${shabadPageNo}` : null;

  $searchResults.appendChild(
    <li class='search-result'>
      <a href={getShabadHyperLink({ shabad, q, type, source })} class='gurbani-font gurbani-display'>
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
        {presentationalSource && <a href='#'>{presentationalSource}</a>}

        <a href='#'>{shabad.writer.english}</a>

        {shabad.raag.english === 'No Raag' || shabad.raag.english === null
<<<<<<< HEAD
          ? ''
          : <a href='#'>{shabad.raag.english}</a>
=======
            ? ''
            : <a href='#'>{shabad.raag.english}</a>
>>>>>>> Use fetch over jQuery.ajax (#280)
        }
      </div>
    </li>
  );
}

function noResults() {
  document.body.classList.remove('loading');
  $searchResults.appendChild(<h3>No results found</h3>);
}

<<<<<<< HEAD
function fetchSearchResults() {
  const params = ['type', 'source', 'q'];
  const [type = 0, source = 'all', q = ''] = params.map(v => getParameterByName(v));

=======
function fetchSearchResults () {
  const params = ['type', 'source', 'q'];
  const [type = 0, source = 'all', q = ''] = params.map(v => getParameterByName(v));

  [...$searchResults.querySelectorAll('a.load')]
    .forEach(el => el && el.addEventListener('click', () => loadResults({ source, type, q, offset: el.dataset.nextpage })));

>>>>>>> Use fetch over jQuery.ajax (#280)
  if (q === '') {
    $searchResults.appendChild(<h3><span>Please enter your query in the search bar above</span></h3>);
    return;
  }

  document.body.classList.toggle('loading');

<<<<<<< HEAD
  return loadResults({ type, source, q });
=======
  loadResults({ type, source, q });
>>>>>>> Use fetch over jQuery.ajax (#280)
}

fetchSearchResults();
