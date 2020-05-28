export const timeMath = {
  isValidHour: (hours: number) => {
    if (hours < 0 || hours >= 24) {
      throw new Error("Invalid range for hours, it should be in the range 0 - 24");
    }
  },
  isValidMin: (mins: number) => {
    if (mins < 0 || mins > 60) {
      throw new Error("Invalid range for minutes, it should be in 0 - 60 ");
    }
    return true;
  },
  parseTime: (time: string): [Date, Date?] => {
    const timeRange = time.split('-'); // 4:30 - 6:30
    const timeRangeArr = timeRange // [4:30, 6:30]
      .map(tR => tR.split(':')) // [[4,30],[6,30]]
      .map(tRStr => [parseInt(tRStr[0], 10), parseInt(tRStr[1], 10)]); //[[4, 30], [6, 30]]

    const time1Hours = timeRangeArr[0][0];
    const time1Mins = timeRangeArr[0][1];

    const time2Hours = timeRangeArr[1][0];
    const time2Mins = timeRangeArr[1][1];

    const time1 = timeMath.getExactTime(time1Hours, time1Mins);
    const time2 = timeMath.getExactTime(time2Hours, time2Mins);

    return [time1, time2];
  },
  isInRange: (time1: Date, time2: Date) => {
    const currentDateTime = new Date();
    return new Date(time1) <= currentDateTime && currentDateTime <= new Date(time2)
  },
  getExactTime: (hours: number, mins: number): Date => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    if (timeMath.isValidMin(mins) && timeMath.isValidHour(hours)) {
      return new Date(year, month, date, hours, mins, 0);
    }
    return new Date();
  }
}