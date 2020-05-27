const suffix = suffix => (value = '') =>
  `${value}${value === '' ? '' : ' - '}${suffix}`;

export const suffixAppName = suffix('SikhiToTheMax');
