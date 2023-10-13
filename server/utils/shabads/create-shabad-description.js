import { SOURCES } from '@sttm/banidb';

/**
 *
 * @param {object} shabad - The shabad obj
 * @param {object} shabadInfo - The shabadInfo obj
 **/
export const createShabadDescription = (shabad, shabadInfo) => {

  if (!shabad) return '';
  const shabadWriter = shabad.writer ? shabad.writer.english : '';
  const shabadSource = shabadInfo ? SOURCES[shabadInfo.source.sourceId] : '';
  const shabadMeaning = shabad.translation.en.bdb || '';
  const shabadUnicode = shabad.verse.unicode || '';

  return `${shabadMeaning} ${shabadUnicode} shabad ${shabadSource ? `from ${shabadSource}` : ''} ${shabadWriter ? ` written by ${shabadWriter}` : ''}`;
}