import {
  translationMap,
  getWriter,
  getSource,
  getUnicodeVerse
} from '../../../src/js/util/api/shabad';

/**
 *
 * @param {object} shabad - The shabad obj
 * @param {object} shabadInfo - The shabadInfo obj
 **/
export const createShabadDescription = (shabad, shabadInfo) => {

  if (!shabad) return '';
  const shabadWriter = getWriter(shabad).english;
  const shabadSource = shabadInfo ? getSource(shabadInfo) : '';
  const shabadMeaning = translationMap.english(shabad);
  const shabadUnicode = getUnicodeVerse(shabad);

  return `${shabadMeaning} ${shabadUnicode} shabad ${shabadSource && `from ${shabadSource}`} ${shabadWriter && ` written by ${shabadWriter}`}`;
}