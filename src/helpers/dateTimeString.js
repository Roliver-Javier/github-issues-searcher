const getDiffDays = (date) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  const dateTranform = new Date(date);
  return Math.round(Math.abs((today - dateTranform) / oneDay));
};

export const getDateFormat = (created_at) => {
  const days = getDiffDays(created_at);
  const dateFormater =
    days === 1 ? `Yesteday` : days === 0 ? `Today` : `${days} days ago`;
  return dateFormater;
};
