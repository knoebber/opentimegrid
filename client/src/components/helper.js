import dayjs from 'dayjs';

export function titleCase(str) {
  return str[0].toUpperCase() + str.toLowerCase().slice(1);
}

// dj is a dayjs object.
export function makeDayState(dj, format) {
  return {
    display: dj.format(format),
    isToday: dayjs().isSame(dj, 'day'),
    unix: dj.unix(),
    renderKey: dj.format('YYYYMD'),
  };
}

export const viewTypes = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  QUARTER: 'QUARTER',
  HALF: 'HALF',
  YEAR: 'YEAR',
};

export const dateFormats = {
  DAY: 'dddd, MMMM D, YYYY',
  WEEK: 'MMMM YYYY',
  MONTH: 'MMMM YYYY',
  QUARTER: 'MMMM YYYY',
  HALF: 'YYYY',
  YEAR: 'YYYY',
};

export const viewTypeList = Object.keys(viewTypes);

// 1AM to 11PM;
export const hours = Array
  .from({ length: 24 })
  .map((_, i) => {
    if (i === 23) {
      return { hour: i };
    }
    return {
      hour: i,
      display: `${(i % 12) + 1}${i < 11 ? 'AM' : 'PM'}`,
    };
  });

export const dayNamesShort = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
];
export const dayNamesFulll = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
