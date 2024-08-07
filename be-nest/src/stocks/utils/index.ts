export const mergeObjSameDate = (arrays: any[][]): any[] => {
  const merged = {};

  arrays.forEach((array) => {
    array.forEach((item) => {
      const date = item.date;
      if (merged[date]) {
        merged[date] = { ...merged[date], ...item };
      } else {
        merged[date] = { ...item };
      }
    });
  });

  return Object.values(merged);
};
