const matrasThatAppearAtRightSideOfChar = 'wIuUyYoOW';
const halfCharThatAppearAtRightSideOfChar = 'Í´R@˜®';
const nasalSoundCaharacter = 'NMµ';
const sihari = 'i';
const allMatrasHalfCharAndNasalSoundChar =
  sihari +
  matrasThatAppearAtRightSideOfChar +
  halfCharThatAppearAtRightSideOfChar +
  nasalSoundCaharacter;
const unicodeMatras = 'ਾਿੀੁੂੇੈੋੌੰਂ';

// Look for consonants and break word
export function fixLarivaarGurmukhiFont(str: string) {
  const arrWordBreak = [];
  // search and break till next consonant
  let segmentedStr = '';

  for (let i = 0; i < str.length; i++) {
    segmentedStr += str[i];
    // handle sihari exeption
    // add to the segment string and ignore other checks
    if (isSihari(str[i])) {
      continue;
    }
    if (isConsonant(str[i + 1]) || isSihari(str[i + 1])) {
      arrWordBreak.push(segmentedStr);
      segmentedStr = '';
    }
  }
  return arrWordBreak;
}

// In unicode All matras are right hand sided
// and matras comes after main consonant and half character
// we need to break word after Matras not consonant
export function fixLarivaarUnicode(str: string) {
  const arrWordBreak = [];
  // search and break till next consonant
  let segmentedStr = '';

  for (let i = 0; i < str.length; i++) {
    segmentedStr += str[i];
    // exception for half character
    if (str[i + 1] === '੍') {
      segmentedStr += str[i + 1];
      i = i + 1;
      continue;
    }
    if (!isUnicodeConsonant(str[i + 1])) {
      arrWordBreak.push(segmentedStr);
      segmentedStr = '';
    }
  }
  return arrWordBreak;
}

const isConsonant = (char: string) =>
  allMatrasHalfCharAndNasalSoundChar.includes(char) === false;
const isUnicodeConsonant = (char: string) =>
  unicodeMatras.includes(char) === false;
const isSihari = (char: string) => char === sihari;
