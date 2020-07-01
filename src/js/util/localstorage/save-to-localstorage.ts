//   Saves to localStorage in next animation frame.

export const saveToLocalStorage = (key: string, value: string) =>
  requestAnimationFrame(() => localStorage.setItem(key, value));
