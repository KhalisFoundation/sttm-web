export const getNumberFromLocalStorage = (key: string, defaultValue = null): number => {
  const value = localStorage.getItem(key);
  if (value === null) return defaultValue;
  return parseFloat(value, 10);
};
