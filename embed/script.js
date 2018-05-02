function h() {
  var type = arguments[0] || 'div';
  var attributes = arguments[1] || {};
  var children = Array.prototype.slice.call(arguments, 2);
  var el = document.createElement(type);

  if (children[0] instanceof Array) {
    children = children[0];
  }

  Object.keys(attributes)
    .map(function(key) {
      return [key, attributes[key]];
    })
    .forEach(function(data) {
      var key = data[0],
        value = data[1];
      if (typeof value === 'function') {
        el.addEventListener(
          key,
          function(e) {
            value(e);
          },
          false
        );
      } else {
        el.setAttribute(key, value);
      }
    });

  if (children instanceof Array) {
    appendChildren(el, children);
  } else if (children instanceof HTMLElement) {
    el.appendChild(children);
  } else if (typeof children === 'string') {
    el.innerText = children;
  }

  return el;
}

function appendChildren(el, children) {
  return children
    .filter(function(child) {
      return child !== null;
    })
    .forEach(function(child) {
      if (child instanceof HTMLElement) {
        el.appendChild(child);
      } else if (child instanceof Array) {
        appendChildren(el, child);
      } else {
        el.innerHTML += child;
      }
    });
}

(function() {
  function addControls() {
    const $root = document.querySelector('#sttm-root');
    const $controls = $root.querySelector('.sttm-shabad-controls');

    const $transliteration = Array.prototype.slice.call(
      $root.querySelectorAll('.sttm-transliteration')
    );

    const translation = {
      spanish: Array.prototype.slice.call(
        $root.querySelectorAll('.sttm-translation.sttm-spanish')
      ),
      punjabi: Array.prototype.slice.call(
        $root.querySelectorAll('.sttm-translation.sttm-punjabi')
      ),
      english: Array.prototype.slice.call(
        $root.querySelectorAll('.sttm-translation.sttm-english')
      ),
    };

    const $transliterationButton = h(
      'button',
      {
        class:
          'sttm-button ' +
          ($transliteration[0].classList.contains('sttm-enabled')
            ? 'enabled'
            : ''),
        click: function(e) {
          $transliteration.forEach(function(t) {
            t.classList.toggle('sttm-enabled');
          });
          e.currentTarget.classList.toggle('sttm-enabled');
        },
      },
      'Transliteration'
    );
    const $translationButtons = ['english', 'punjabi', 'spanish'].map(function(
      l
    ) {
      return h(
        'button',
        {
          class:
            'sttm-button ' +
            (translation[l][0].classList.contains('sttm-enabled')
              ? 'sttm-enabled'
              : ''),
          click: function(e) {
            translation[l].forEach(function(t) {
              t.classList.toggle('sttm-enabled');
            });
            e.currentTarget.classList.toggle('sttm-enabled');
          },
        },
        l + ' Translation'
      );
    });

    $controls.appendChild(
      h(
        'div',
        { class: 'sttm-button-wrapper' },
        [].concat($translationButtons, $transliterationButton)
      )
    );
  }

  function buildDOM({
    gurbani = null,
    shabadinfo: info = null,
    page = null,
    source = null,
  }) {
    const $header = document.querySelector('.sttm-header');
    const $meta = document.querySelector('.sttm-shabad-meta');
    const $content = document.querySelector('.sttm-shabad-content');

    function Page(gurbani) {
      return gurbani.map(function(data) {
        const shabad = data.shabad;
        return h(
          'div',
          { class: 'sttm-line' },
          h('div', { class: 'sttm-baani' }, shabad.gurbani.unicode),
          h('div', { class: 'sttm-transliteration' }, shabad.transliteration),
          h(
            'div',
            { class: 'sttm-translation sttm-english sttm-enabled' },
            shabad.translation.english.ssk
          ),
          h(
            'div',
            { class: 'sttm-translation sttm-punjabi' },
            shabad.translation.punjabi.bms.unicode
          ),
          h(
            'div',
            { class: 'sttm-translation sttm-spanish' },
            shabad.translation.spanish
          )
        );
      });
    }

    if (gurbani !== null && info !== null) {
      $header.appendChild(
        h(
          'a',
          {
            class: 'sttm-button sttm-primary',
            href: 'https://sikhitothemax.org/shabad?id=' + info.id,
          },
          'Open in SikhiToTheMax'
        )
      );

      appendChildren($meta, [
        info.writer.english + ' | ' + info.source.english + ': ',
        h(
          'a',
          {
            href:
              'https://sikhitothemax.org/ang?ang=' +
              info.source.pageno +
              '&source=' +
              info.source.id,
          },
          info.source.pageno
        ),
      ]);

      appendChildren($content, Page(gurbani));
    } else if (page !== null && source !== null) {
      $header.appendChild(
        h(
          'a',
          {
            class: 'sttm-button sttm-primary',
            href:
              'https://sikhitothemax.org/ang?ang=' +
              source.pageno +
              '&source=' +
              source.id,
          },
          'Open in SikhiToTheMax'
        )
      );

      appendChildren($meta, [
        source.english + ': ',
        h(
          'a',
          {
            href:
              'https://sikhitothemax.org/ang?ang=' +
              source.pageno +
              '&source=' +
              source.id,
          },
          source.pageno
        ),
      ]);

      appendChildren($content, Page(page));
    } else {
      // error
    }
  }

  function getQueryParams(str = document.location.search) {
    const qs = str.replace(/\+/g, ' ');
    const params = {};
    const re = /[?&]?([^=]+)=([^&]*)/g;
    let tokens;

    while ((tokens = re.exec(qs))) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  }

  const { id = null, ang = null, source = 'G' } = getQueryParams(
    document.location.search
  );
  let url;

  if (id !== null) {
    url = 'https://api.banidb.com/shabad/' + id;
  } else if (ang !== null) {
    url = 'https://api.banidb.com/ang/' + ang + '/' + source;
  } else {
    // error;
  }

  fetch(url)
    .then(r => r.json())
    .then(buildDOM)
    .then(addControls);
})();
