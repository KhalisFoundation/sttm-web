export const timeMath = {
  isValidHour(hours: number) {
    if (hours < 0 || hours >= 24) {
      throw new Error("Invalid range for hours, it should be in the range 0 - 24");
    }
  },
  isValidMin(mins: number) {
    if (mins < 0 || mins > 60) {
      throw new Error("Invalid range for minutes, it should be in 0 - 60 ");
    }
    return true;
  },
  getExactTime(hours: number, mins: number) {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    if (timeMath.isValidMin(mins) && timeMath.isValidHour(hours)) {
      return new Date(year, month, date, hours, mins, 0);
    }
  }
}