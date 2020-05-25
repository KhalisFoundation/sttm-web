import { SOURCES } from '@sttm/banidb';

const suffix = suffix => (value = '') =>
  `${value}${value === '' ? '' : ' - '}${suffix}`;

export const suffixAppName = suffix('SikhiToTheMax');
