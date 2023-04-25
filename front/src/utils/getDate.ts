interface IGetDate {
  todayDate: Date;
  todayMonth: string | number;
  todayDay: string | number;
}

const getDate = (): IGetDate => {
  const todayDate = new Date();
  const todayMonth =
    todayDate.getMonth() + 1 < 10
      ? `0${todayDate.getMonth() + 1}`
      : `${todayDate.getMonth()} + 1`;
  const todayDay =
    todayDate.getDate() < 10
      ? `0${todayDate.getDate()}`
      : `${todayDate.getDate()}`;

  return { todayDate, todayMonth, todayDay };
};

export default getDate;
