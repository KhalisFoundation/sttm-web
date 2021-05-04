interface IIsKeyExists {
  object: {
    [key: string]: string | boolean | number
  };
}
export const isKeyExists = (object: IIsKeyExists, key: string) => {
  return object.hasOwnProperty(key)
}