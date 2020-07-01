/**
 * Throws given error. This is a workaround for absence of throw expressions.
 * Calling this function lets you throw an error inline (eg. JSX)
 *
 * @param {string} msg
 * @param {*} err
 */
export const throwError = (msg: string, err: any) => {
  // eslint-disable-next-line no-console
  console.warn(err);
  throw new Error(err);
};
