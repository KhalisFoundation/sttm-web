export const isListOfShabads = (object: { hasOwnProperty: (arg0: string) => any }) => {
  return object.hasOwnProperty('shabadIds')
}