export const selectItemInArray = (item: string | number, arr: string[] | number[]) =>
  arr.includes(item) ? arr.filter(k => k !== item) : [...arr, item];
