export const getTotal = (sessions: number, price: number) => {
  if (isNaN(sessions) || isNaN(price)) return 0;
  return sessions * price;
};
