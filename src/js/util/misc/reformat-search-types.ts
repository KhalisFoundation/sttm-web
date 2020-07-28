// This is used for searchType options in HomePage and SearchPage
export const reformatSearchTypes = (types: string[]) => {
  const typesObjArr = types.map((type, index) => ({ type, value: index }))

  // reformat to put Main Letters (Gurmukhi) infront of Full Word (Gurmukhi)
  const typeObjToAdjust = typesObjArr.pop();

  // Creating new array by adjusting a type object at index 2
  return [...typesObjArr.slice(0, 2), typeObjToAdjust, ...typesObjArr.slice(2)]
}
