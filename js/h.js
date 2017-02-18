'use strict';

function h() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var el = document.createElement(type);

  Object.keys(attributes).forEach(function (key) {
    var value = attributes[key];
    if (typeof value === 'function') {
      el.addEventListener(key, function (e) {
        return value(e);
      }, false);
    } else {
      el.setAttribute(key, value);
    }
  });

  if (children instanceof Array) {
    children.forEach(function (child) {
      return el.appendChild(child);
    });
  } else if (children instanceof HTMLElement) {
    el.appendChild(children);
  } else if (typeof children === 'string') {
    el.innerHTML = children;
  }

  return el;
}