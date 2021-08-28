import dayjs from 'dayjs';

export function titleCase(str) {
  return str[0].toUpperCase() + str.toLowerCase().slice(1);
}

// dj is a dayjs object.
export function makeDayState(dj, format) {
  console.log(dayjs().toString(), dj.toString(), dayjs().isSame(dj, 'day'));
  return {
    display: dj.format(format),
    isToday: dayjs().isSame(dj, 'day'),
    unix: dj.unix(),
    renderKey: dj.date() * dj.month() * dj.year(),
  };
}

export const viewTypes = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
};

export const dateFormats = {
  DAY: 'dddd, MMMM D, YYYY',
  WEEK: 'MMMM YYYY',
  MONTH: 'MMMM YYYY',
  YEAR: 'YYYY',
};

export const viewTypeList = Object.keys(viewTypes);

// 1AM to 11PM;
export const hours = Array
  .from({ length: 23 })
  .map((_, i) => ({
    hour: i,
    display: `${(i % 12) + 1}${i < 11 ? 'AM' : 'PM'}`,
  }));

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
