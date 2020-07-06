import { isFalsy } from "../misc";

export const getArrayFromLocalStorage = (key: string, defaultValue = []) => {
  const value = localStorage.getItem(key) as string;

  if (isFalsy(value)) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch (err) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
};