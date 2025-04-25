export const getHourMinFromSeconds = (durationSec) => {
  const hours = Math.floor(durationSec / 3600);
  const minutes = Math.floor((durationSec % 3600) / 60);
  return `${hours} óra ${minutes} perc`;
};
