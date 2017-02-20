function h(type = 'div', attributes = { }, children = '') {
  let el = document.createElement(type);

  Object.keys(attributes).forEach(key => {
    let value = attributes[key];
    if (typeof value === 'function') {
      el.addEventListener(key, e => value(e), false);
    } else {
      el.setAttribute(key, value);
    }
  });

  if (children instanceof Array) {
    children.forEach(child => el.appendChild(child));
  } else if (children instanceof HTMLElement) {
    el.appendChild(children);
  } else if (typeof children === 'string') {
    el.innerHTML = children;
  }

  return el;
}
