// TODO: Render via object -> transformation.

function renderGurmukhiKeyboard ($search) {
  // Instead of attaching click to each button, we are using event delegation.
  function click ({ target: $button, currentTarget: $keyboard }) {
    $button = $button.nodeName.toUpperCase() === 'I' ? $button.parentNode : $button;

    const { action } = $button.dataset;

    switch (action) {
      case 'close': {
        $keyboard.classList.remove('active');
        break;
      }
      case 'bksp':  {
        $search.value = $search.value.substring(0, $search.value.length - 1);
        break;
      }
      case 'close': {
        $keyboard.classList.remove('active');
        break;
      }
      case 'page-1': case 'page-2': {
        $($keyboard.querySelector('.page')).hide();
        $("#gurmukhi-keyboard-" + action).show();
        break;
      }
      default: {
        $search.value += $button.dataset.value || $button.innerText;
      }
    }
  }

  return h('div', { class: 'gurmukhi-keyboard gurbani-font', click }, [
    h('div', { class: 'page' , style: 'display: block;' , id: 'gurmukhi-keyboard-page-1' }, [
      h('div', { class: 'keyboard-row' }, [
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 'a'),
          h('button', { type: 'button' }, 'A'),
          h('button', { type: 'button' }, 'e'),
          h('button', { type: 'button' }, 's'),
          h('button', { type: 'button' }, 'h'),
        ]),
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 'k'),
          h('button', { type: 'button' }, 'K'),
          h('button', { type: 'button' }, 'g'),
          h('button', { type: 'button' }, 'G'),
          h('button', { type: 'button' }, '|'),
        ]),
      ]),
      h('div', { class: 'keyboard-row' }, [
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 'c'),
          h('button', { type: 'button' }, 'C'),
          h('button', { type: 'button' }, 'j'),
          h('button', { type: 'button' }, 'J'),
          h('button', { type: 'button' }, '\\'),
        ]),
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 't'),
          h('button', { type: 'button' }, 'T'),
          h('button', { type: 'button' }, 'f'),
          h('button', { type: 'button' }, 'F'),
          h('button', { type: 'button' }, 'x'),
        ]),
      ]),
      h('div', { class: 'keyboard-row' }, [
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 'q'),
          h('button', { type: 'button' }, 'Q'),
          h('button', { type: 'button' }, 'd'),
          h('button', { type: 'button' }, 'D'),
          h('button', { type: 'button' }, 'n'),
        ]),
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 'p'),
          h('button', { type: 'button' }, 'P'),
          h('button', { type: 'button' }, 'b'),
          h('button', { type: 'button' }, 'B'),
          h('button', { type: 'button' }, 'm'),
        ]),
      ]),
      h('div', { class: 'keyboard-row' }, [
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 'X'),
          h('button', { type: 'button' }, 'r'),
          h('button', { type: 'button' }, 'l'),
          h('button', { type: 'button' }, 'v'),
          h('button', { type: 'button' }, 'V'),
        ]),
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, '&nbsp;'),
          h('button', { type: 'button' }, '&nbsp;'),
          h('button', { type: 'button' , 'data-action': 'close' }, [
            h('i', {class: 'fa fa-times'}),
          ]),
          h('button', { type: 'button' , 'data-action': 'page-2' }, 'uI'),
          h('button', { type: 'button' , 'data-action': 'bksp' }, [
            h('i', {class: 'fa fa-long-arrow-left'}),
          ]),
        ]),
      ]),
    ]),
    h('div', { class: 'page' , id: 'gurmukhi-keyboard-page-2' }, [
      h('div', { class: 'keyboard-row' }, [
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, '1'),
          h('button', { type: 'button' }, '2'),
          h('button', { type: 'button' }, '3'),
          h('button', { type: 'button' }, '4'),
          h('button', { type: 'button' }, '5'),
        ]),
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, '6'),
          h('button', { type: 'button' }, '7'),
          h('button', { type: 'button' }, '8'),
          h('button', { type: 'button' }, '9'),
          h('button', { type: 'button' }, '0'),
        ]),
      ]),
      h('div', { class: 'keyboard-row' }, [
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 'w'),
          h('button', { type: 'button' }, 'i'),
          h('button', { type: 'button' }, 'I'),
          h('button', { type: 'button' }, 'u'),
          h('button', { type: 'button' }, 'U'),
        ]),
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 'y'),
          h('button', { type: 'button' }, 'Y'),
          h('button', { type: 'button' }, 'o'),
          h('button', { type: 'button' }, 'O'),
          h('button', { type: 'button' }, 'M'),
        ]),
      ]),
      h('div', { class: 'keyboard-row' }, [
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 'N'),
          h('button', { type: 'button' }, 'W'),
          h('button', { type: 'button' }, '`'),
          h('button', { type: 'button' }, '~'),
          h('button', { type: 'button' }, 'R'),
        ]),
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 'H'),
          h('button', { type: 'button' }, '˜'),
          h('button', { type: 'button' }, '´'),
          h('button', { type: 'button' }, 'Í'),
          h('button', { type: 'button' }, 'Ï'),
        ]),
      ]),
      h('div', { class: 'keyboard-row' }, [
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, 'ç'),
          h('button', { type: 'button' }, 'E'),
          h('button', { type: 'button' }, '^'),
          h('button', { type: 'button' }, '&nbsp;'),
          h('button', { type: 'button' }, '&nbsp;'),
        ]),
        h('div', { class: 'keyboard-row-set' }, [
          h('button', { type: 'button' }, '&nbsp;'),
          h('button', { type: 'button' }, '&nbsp;'),
          h('button', { type: 'button' , 'data-action': 'close' }, [
            h('i', {class: 'fa fa-times'}),
          ]),
          h('button', { type: 'button' , 'data-action': 'page-1' }, 'a'),
          h('button', { type: 'button' , 'data-action': 'bksp' }, [
            h('i', {class: 'fa fa-long-arrow-left'}),
          ]),
        ]),
      ]),
    ]),
  ]);
}
