export const getStartOfWeek = (date) => {
  const d = new Date(date);
  d.setDate(d.getDate() - (d.getDay() === 0 ? 6 : d.getDay() - 1));
  return d;
};

export const getEndOfWeek = (date) => {
  const d = new Date(date);
  d.setDate(d.getDate() + (7 - d.getDay()));
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
