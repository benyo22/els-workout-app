export const getStartOfWeek = (date) => {
  const d = new Date(date);
  d.setDate(d.getDate() - (d.getDay() === 0 ? 6 : d.getDay() - 1));
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getEndOfWeek = (date) => {
  const d = new Date(date);
  d.setDate(d.getDate() + (7 - (d.getDay() === 0 ? 7 : d.getDay())));
  d.setHours(23, 59, 59, 999);
  return d;
};

export const formatSecToHourMin = (durationSec) => {
  const hours = Math.floor(durationSec / 3600);
  const minutes = Math.floor((durationSec % 3600) / 60);
  return `${hours} óra ${minutes} perc`;
};

export const formatWeight = (weight) => {
  return `${weight} kg`;
};

// export const getHungarianISOString = (date) => {
//   const offsetInMs = date.getTimezoneOffset() * 60 * 1000;
//   const adjustedDate = new Date(date.getTime() - offsetInMs);
//   return adjustedDate.toISOString();
// };
