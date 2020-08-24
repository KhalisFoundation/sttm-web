// This is used for searchType options in HomePage and SearchPage
export const reformatSearchTypes = (searchType: string[]) => {
  const searchTypesObjArr = searchType.map((searchType, index) => ({ type: searchType, value: index }))

  // reformat to put Main Letters (Gurmukhi) infront of Full Word (Gurmukhi)
  const mainLetterSearchObj = searchTypesObjArr.pop();

  // Creating new array by adjusting a type object at index 2
  const reformattedSearchTypes = [...searchTypesObjArr.slice(0, 2), mainLetterSearchObj, ...searchTypesObjArr.slice(2)]
  return reformattedSearchTypes;
}
