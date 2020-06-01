type Time = [number, number]; // [ Hours , Mins ]

export const timeMath = {
  isValidHour: (hours: number) => {
    if ((hours < 0) || (hours >= 24)) {
      throw new Error("Invalid range for hours, it should be in the range 0 - 24");
    }
    return true;
  },
  isValidMinute: (mins: number) => {
    if ((mins < 0) || (mins > 60)) {
      throw new Error("Invalid range for minutes, it should be in 0 - 60 ");
    }
    return true;
  },
  isValidTimeInMinutes: (timeInMins: number) => {
    const maxTimeInMins = 24 * 60;
    if ((timeInMins < 0) || (timeInMins > maxTimeInMins)) {
      console.log(timeInMins, maxTimeInMins, ".........")
      throw new Error("Invalid value for time in mins");
    }

    return true;
  },
  parseTimeInMinutes: (timeInMins: number): Time | undefined => {
    if (timeMath.isValidTimeInMinutes(timeInMins)) {
      const mins = timeInMins % 60;
      const hours = (timeInMins - mins) / 60;
      return [hours, mins];
    }
  },
  calcTimeInMinutes: (hours: number, mins: number) => {
    if (timeMath.isValidHour(hours) && timeMath.isValidMinute(mins)) {
      return hours * 60 + mins;
    }
  },
  parseTime: (time1InMinutes: number, time2InMinutes: number): [Date, Date] => {

    const time1 = timeMath.parseTimeInMinutes(time1InMinutes);
    const time2 = timeMath.parseTimeInMinutes(time2InMinutes);

    const dateTime1 = time1 && timeMath.getExactTime(time1[0], time1[1]);
    const dateTime2 = time2 && timeMath.getExactTime(time2[0], time2[1]);

    return [dateTime1, dateTime2] as [Date, Date];
  },
  isInRange: (time1: Date, time2: Date) => {
    const currentDateTime = new Date();
    return (new Date(time1) <= currentDateTime) && (currentDateTime <= new Date(time2))
  },
  getExactTime: (hours: number, mins: number): Date => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    if (timeMath.isValidHour(hours) && timeMath.isValidMinute(mins)) {
      return new Date(year, month, date, hours, mins, 0);
    }
    return new Date();
  }
}