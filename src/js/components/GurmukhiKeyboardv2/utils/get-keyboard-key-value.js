import { matraAkhar, defaultMatraValue } from '../constants';

export const getKeyboardKeyValue = (keyboardKey, query) => {
  const labelVal =
    Object.keys(defaultMatraValue).includes(keyboardKey) ?
      matraAkhar(keyboardKey, query) : keyboardKey;

  const lastChar = query[query.length - 1] || [];

  if (lastChar.includes(labelVal)) {
    return keyboardKey;
  }
  return labelVal;
}
