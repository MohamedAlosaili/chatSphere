export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const relativeTime = (date: string) => {
  const originalTime = new Date(date);

  const originalTimeInSeconds = Math.floor(originalTime.getTime() / 1000);
  const now = Math.floor(Date.now() / 1000);

  const day = 24 * 60 * 60;
  const week = 7 * day;

  const difference = now - originalTimeInSeconds;

  if (difference < day) {
    return originalTime.toLocaleTimeString(undefined, { timeStyle: "short" });
  } else if (difference < week) {
    return weekDays[originalTime.getDay()];
  } else {
    return originalTime.toLocaleDateString();
  }
};

export default relativeTime;
