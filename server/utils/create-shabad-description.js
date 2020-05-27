import { translationMap, getWriter, getSource } from '../../src/js/util/api/shabad';

/**
 *
 * @param {object} shabad - The shabad obj
 **/
export const createShabadDescription = (shabad) => {
  if (!shabad) return '';
  const writerName = getWriter(shabad).english;
  const sourceName = getSource(shabad);
  return `${translationMap(shabad).english} shabad from ${sourceName}  ${writerName && ` written by ${writerName}`} `;
}