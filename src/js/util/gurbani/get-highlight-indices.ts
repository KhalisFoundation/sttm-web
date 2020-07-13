import { numbersRange } from "../numbers";
import { SEARCH_TYPES } from "../../constants";
import { getHighlightingEndpoints } from "./get-highlighting-endpoints";

export const getHighlightIndices = (baani: string, query: string, type: number): any[] => {
  let start = -1;
  let end = -1;
  let highlightIndices = [];

  // Handles " search operator
  let mainQuery = query.replace(/"/g, '');

  //Handles - search operator
  mainQuery = mainQuery.replace(/[-][ ,\w,),(]*/g, '');

  if (baani === null) {
    return [start, end];
  }

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
      if (type == SEARCH_TYPES.ENGLISH_WORD) {
        mainQuery = mainQuery.toLowerCase();
        baani = baani.toLowerCase();
        baaniWords = baani.split(" ");
      }

      let q = mainQuery.split('+');
      q = q.map(r => r.trim());
      q.forEach(subQuery => {
        if (subQuery.includes('*')) {
          let subWords = subQuery.split('*');
          subWords = subWords.map(sw => sw.trim());
          subWords = subWords.filter(w => w.length > 0);
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
  }

  return highlightIndices;
};
