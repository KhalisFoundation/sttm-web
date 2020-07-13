export const sanitizeHash = (...args) =>
  args.map((a) => a.replace(/ /gi, '-')).join('_');

export const desanitzeHash = (hash: string) =>
  hash.replace('-', ' ').split('_');
