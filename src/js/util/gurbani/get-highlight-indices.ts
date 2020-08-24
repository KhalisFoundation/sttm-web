import { numbersRange } from "../numbers";
import { SEARCH_TYPES, SEARCH_TYPES_NOT_ALLOWED_KEYS, GURMUKHI_TO_ENGLISH_MAP } from "../../constants";
import { getHighlightingEndpoints } from "./get-highlighting-endpoints";

export const getHighlightIndices = (
  baani: string,
  query: string,
  type: number,
): any[] => {

  let start = -1;
  let end = -1;
  let highlightIndices = [];

  const isSearchTypeMainLetters = type === SEARCH_TYPES.MAIN_LETTERS;
  const isSearchTypeRomanizedFirstLetters = type === SEARCH_TYPES.ROMANIZED_FIRST_LETTERS_ANYWHERE;
  const isSearchTypeEnglishWord = type === SEARCH_TYPES.ENGLISH_WORD;
  // Handles " search operator
  let mainQuery = query.replace(/"/g, '');

  //Handles - search operator
  mainQuery = mainQuery.replace(/[-][ ,\w,),(]*/g, '');

  if (baani === null) {
    return [start, end];
  }

  // if (isSearchTypeMainLetter) {
  //   const notAllowedKeys = SEARCH_TYPES_NOT_ALLOWED_KEYS[SEARCH_TYPES.MAIN_LETTERS]
  //   const removeLettersRegex = new RegExp(notAllowedKeys.join('|'), 'g') // eg  w|i|x|a ...
  //   baani = baani.replace(removeLettersRegex, '');
  // }

  let baaniWords = baani.split(' ');
  switch (type) {
    // TODO: This is obviously not the best way to handle it.
    case SEARCH_TYPES.ROMANIZED: {
      mainQuery = mainQuery
        .split(' ')
        .map(w => w[0])
        .join('');
    }
    case SEARCH_TYPES.FIRST_LETTERS: // eslint-disable-line no-fallthrough
    case SEARCH_TYPES.FIRST_LETTERS_ANYWHERE: {
      // remove i from start of words
      baaniWords = baaniWords.map(w => (w.startsWith('i') ? w.slice(1) : w));
      const baaniLetters = baaniWords.map(word => word[0]).join('');
      let q = mainQuery.split('+');
      q.forEach(subQuery => {
        if (subQuery.includes('*')) {
          let subWords = subQuery.split('*');
          subWords.forEach(sw => {
            start = baaniLetters.indexOf(sw);
            end = start + sw.length;
            highlightIndices = highlightIndices.concat(numbersRange(start, end - 1, 1));
          });
        } else {
          start = baaniLetters.indexOf(subQuery);
          end = start + subQuery.length;
          highlightIndices = highlightIndices.concat(numbersRange(start, end - 1, 1));
        }
      });
      break;
    }

    case SEARCH_TYPES.ENGLISH_WORD: // eslint-disable-line no-fallthrough
    case SEARCH_TYPES.GURMUKHI_WORD: {
      // case SEARCH_TYPES.MAIN_LETTERS: { // it covers the case when only two words are together

      // if (isSearchTypeMainLetter) {
      //   mainQuery = mainQuery.toLowerCase();
      //   baani = baani.toLowerCase();
      //   baaniWords = baani.split(" ");
      // }

      let q = mainQuery.split('+');
      q = q.map(r => r.trim());
      q.forEach(subQuery => {
        if (subQuery.includes('*')) {
          let subWords = subQuery.split('*');
          subWords = subWords.map(sw => sw.trim()).filter(w => w.length > 0);
          subWords.forEach(akhar => {
            let location = baaniWords.indexOf(akhar);
            location = location === -1 ? baaniWords.findIndex(w => w.includes(akhar)) : location;
            baaniWords[location] = '';
            highlightIndices.push(location);
          });
        } else {
          const [start, end] = getHighlightingEndpoints(baani, subQuery);

          if (start !== -1) {
            highlightIndices = highlightIndices.concat(numbersRange(start, end, 1));
          }
        }
      });
      break;
    }

    case SEARCH_TYPES.ROMANIZED_FIRST_LETTERS_ANYWHERE: {
      baaniWords = baaniWords.map(w => (w.startsWith('i') ? w.slice(1) : w));
      const baaniLetters = baaniWords.map(word => word[0]).join('');

      let q = mainQuery.split('+');
      q.forEach(subQuery => {
        if (subQuery.includes('*')) {
          let subWords = subQuery.split('*');
          subWords.forEach(sw => {
            start = baaniLetters.indexOf(sw);
            end = start + sw.length;
            highlightIndices = highlightIndices.concat(numbersRange(start, end - 1, 1));
          });
        } else {

          // There are few gurmukhi letters
          // which have multiple mappings in english language
          // for eg q and t are used interchangeably
          
          const subQueryModified = subQuery
            .toLowerCase()
            .split('')
            .map((letter: string) => {
              const otherLetter = GURMUKHI_TO_ENGLISH_MAP[letter];
              if (otherLetter) {
                return `[${letter},${otherLetter}]`;
              }

              return letter;
            })
            .join('');

          const subQueryRegex = new RegExp(subQueryModified, 'g');
          start = baaniLetters.toLowerCase().search(subQueryRegex);

          if (start !== -1) {
            end = start + subQuery.length;
            highlightIndices = highlightIndices.concat(numbersRange(start, end - 1, 1));
          }
        }
      });
    }
      break;
  }


  // if there is no highlightIndices, we gonna do simple check
  if (!highlightIndices.length
    && !isSearchTypeMainLetters
    && !isSearchTypeRomanizedFirstLetters
  ) {

    // if we are checking for english translation,
    if (isSearchTypeEnglishWord) {

      const lettersToExcludeRegex = new RegExp('[\,\;\.\?\!]', 'g');
      // we need to check for lowercase letters for highlight as well.
      baaniWords = baaniWords.map(word => word.toLowerCase().replace(lettersToExcludeRegex, ''))
      query = query.toLowerCase();
    }

    baaniWords.forEach((word, idx) => {
      const isHighlightIdx = isSearchTypeEnglishWord ? word === query : word.includes(query);
      if (isHighlightIdx) {
        highlightIndices.push(idx);
      }
    });
  }


  return highlightIndices;
};
