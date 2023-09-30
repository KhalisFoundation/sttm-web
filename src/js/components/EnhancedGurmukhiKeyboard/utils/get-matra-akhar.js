import { defaultMatraValue, matras } from '../constants';
export const getMatraAkhar = (matra, query) => {
  const lastChar = query[query.length - 1];
  const matraValue = defaultMatraValue[matra];
  const notMatraRegex = new RegExp("[^" + matra + "]", "g");

  if (query.length && !matras.includes(lastChar) && matraValue) {
    return matraValue.replace(notMatraRegex, lastChar);
  }

  return matraValue;

}