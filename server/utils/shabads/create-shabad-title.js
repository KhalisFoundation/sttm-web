/**
 *
 * @param {object} shabad - The shabad obj
 **/
export const createShabadTitle = (shabad) => {
  if (!shabad) return '';
  const shabadInEnglish = shabad.translation.en.bdb || '';
  const shabadUnicode = shabad.verse.unicode || '';
  return `Shabad ${shabadInEnglish}. ${shabadUnicode}`
}