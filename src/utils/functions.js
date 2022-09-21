export const getSelectedValue = (object) => {
  return Object.keys(object).filter((item) => object[item] === true);
};

export const getConvertedDate = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;

  return year + "-" + month + "-" + day;
};
