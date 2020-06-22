
export const toFixedFloat = (val: number, digits: number = 1) => {
  return parseFloat(Number(val).toFixed(digits));
}