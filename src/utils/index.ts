export const minutesToWords = (num: number): string => {
  num = Math.ceil(num);
  const minutes = num % 60;
  const _hours = Math.floor(num / 60);
  const hours = _hours % 24;
  const days = Math.floor(_hours / 24);

  const readableMin = `${minutes} min`;
  const readableHours =
    hours > 0 ? ` ${hours} ${hours > 1 ? 'hrs' : 'hr'} ` : '';
  const readbleDays = days > 0 ? ` ${days} d` : '';

  return `${readbleDays}${readableHours}${readableMin}`;
};
