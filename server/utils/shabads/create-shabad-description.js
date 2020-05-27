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
  const writerName = getWriter(shabad).english;
  const shabadMeaning = translationMap.english(shabad);
  const sourceName = shabadInfo ? getSource(shabadInfo) : '';
  const shabadUnicode = getUnicodeVerse(shabad);

  return `${shabadMeaning} ${shabadUnicode} shabad ${sourceName && `from ${sourceName}`} ${writerName && ` written by ${writerName}`}`;
}