export const sanitizeHash = (...args) => args.map(a => a.replace(/ /gi, '')).join('-');
