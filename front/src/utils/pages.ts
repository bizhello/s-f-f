// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPageCount = (totalCount: number, limit: number) => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages: number): Array<number> => {
  let res = []

  for (let i = 0; i < totalPages; i++) {
    res.push(i + 1)
  }

  return res;
}
