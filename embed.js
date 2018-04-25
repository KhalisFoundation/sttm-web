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
      h('div', null, [].concat($translationButtons, $transliterationButton))
    );
  }
  addControls();
})();

console.log('yolo');
