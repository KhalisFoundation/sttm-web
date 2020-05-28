/**
 * Manipulates the date string
 */
export const dateMath = {
  algebra: (inputDate: Date, operator: string, days: number) => {
    const da = new Date(inputDate);
    let newDay: number = 0; //assigned default value to pass typescript error check
    switch (operator) {
      case '+':
      case 'plus':
        newDay = da.getDate() + days;
        break;
      case '-':
      case 'minus':
        newDay = da.getDate() - days;
        break;
    }
    da.setDate(newDay);
    return da.toLocaleDateString('zh-tw'); // yyyy-m-d
  },
  isBefore: (date1: Date, date2: Date) => new Date(date1) < new Date(date2),
  isAfter: (date1: Date, date2: Date) => new Date(date1) > new Date(date2),
  expand: (date: Date, year: boolean = true) => {
    const inDate = new Date(date);
    let options;
    year ?
      options = { year: 'numeric', month: 'short', day: 'numeric' } :
      options = { month: 'short', day: 'numeric' };
    return inDate.toLocaleDateString('en', options);
  },
  isFuture: (date: Date) => dateMath.isBefore(new Date(), date),
};
