import { SEARCH_TYPES } from '@/constants';

// This is used for searchType options in HomePage and SearchPage
export const reformatSearchTypes = (searchType: string[]) => {
  console.log(searchType,SEARCH_TYPES.ASK_A_QUESTION )
  const searchTypesObjArr = searchType.map((searchTerm, index) => ({ type: searchTerm, value: index }))
  console.log(searchTypesObjArr, 'search types obj arr')
  const mainLetterSearchIdx = SEARCH_TYPES.MAIN_LETTERS;
  const romanizedFirstLettersSearchIdx = SEARCH_TYPES.ROMANIZED_FIRST_LETTERS_ANYWHERE;
  const mainLetterSearchObj = searchTypesObjArr[mainLetterSearchIdx];
  const romanizedFirstLetterSearchObj = searchTypesObjArr[romanizedFirstLettersSearchIdx];

  // Since splice can mess up with indexs so have to apply in reverse order
  searchTypesObjArr.splice(romanizedFirstLettersSearchIdx, 1);
  searchTypesObjArr.splice(mainLetterSearchIdx, 1);

  // Creating new array by adjusting a type object at index 2
  return [
    ...searchTypesObjArr.slice(0, 2),
    romanizedFirstLetterSearchObj,
    mainLetterSearchObj,
    ...searchTypesObjArr.slice(2)
  ]

}
