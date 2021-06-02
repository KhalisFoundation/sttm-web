export const getStringFromLocalStorage = (key: string, defaultValue = null): string => {
  const value = localStorage.getItem(key);
  if (value === null) return defaultValue;
  return value;
};
