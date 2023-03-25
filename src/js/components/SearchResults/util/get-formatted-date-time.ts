export const getFormattedDateTime = (date: Date) => {
  const dateTime = new Date(date);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  const newDate = dateTime.getDate();
  const monthIndex = dateTime.getMonth();
  const year = dateTime.getFullYear();
  const time = dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const formattedDateTime = monthNames[monthIndex]+ ' ' + newDate + ' , ' + year + ' | ' + time;
  return formattedDateTime;
}
