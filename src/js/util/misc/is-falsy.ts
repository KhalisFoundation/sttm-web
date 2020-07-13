export const isFalsy = value =>
  [null, 'null', '', undefined, 'undefined'].some(v => value === v);
