import { defaultMatraValue } from '../constants';
import { getMatraAkhar } from './get-matra-akhar';

export const getKeyboardKeyValue = (keyboardKey, query) => {
  const labelVal =
    Object.keys(defaultMatraValue).includes(keyboardKey) ?
      getMatraAkhar(keyboardKey, query) : keyboardKey;

  const lastChar = query[query.length - 1] || [];

  if (lastChar.includes(labelVal)) {
    return keyboardKey;
  }
  return labelVal;
}
