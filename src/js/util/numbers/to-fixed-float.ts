
export const toFixedFloat = (val: number, digits: number = 1) => {
  return parseFloat(val.toFixed(digits));
}