
export const getBooleanFromLocalStorage = (key: string, defaultValue: string = null): boolean | string => {
  const value = localStorage.getItem(key);
  if (value === null) return defaultValue;
  return value === 'true';
};
