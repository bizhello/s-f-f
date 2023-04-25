const dateReverse = (date: string): string => {
  return date.split('-').reverse().join('.');
};

export default dateReverse;
