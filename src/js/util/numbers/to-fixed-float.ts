
export const toFixedFloat = (val: number, digits: number = 1) => {
  console.log(val, ' val is this');
  return parseFloat(Number(val).toFixed(digits));
}