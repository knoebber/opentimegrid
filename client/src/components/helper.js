export function titleCase(str) {
  return str[0].toUpperCase() + str.toLowerCase().slice(1);
}

export const viewTypes = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
};

export const dateFormats = {
  DAY: 'MMMM D, YYYY',
  WEEK: 'MMMM YYYY',
  MONTH: 'MMMM YYYY',
  YEAR: 'YYYY',
};

export const viewTypeList = Object.keys(viewTypes);
