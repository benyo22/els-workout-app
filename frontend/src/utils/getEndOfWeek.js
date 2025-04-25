export const getEndOfWeek = (date) => {
  const d = new Date(date);
  d.setDate(d.getDate() + (7 - (d.getDay() === 0 ? 7 : d.getDay())));
  d.setHours(23, 59, 59, 999);
  return d;
};
