type TArg = Date | null | undefined;

const parseDateInString = (arg: TArg): string => {
  if (!arg) {
    return '';
  }
  const date = new Date(arg);
  const textMonth =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const texDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return `${date.getFullYear()}-${textMonth}-${texDay}`;
};

export default parseDateInString;
