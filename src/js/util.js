export const entries = obj => Object.keys(obj).map(key => [key, obj[key]]);
export const createScript = src => h('script', { src });
export const createScripts = (...srces) => srces.map(createScript);