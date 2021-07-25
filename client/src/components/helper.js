import dayjs from 'dayjs';

export const viewTypes = {
  DAY: 'day',
  MONTH: 'month',
  WEEK: 'week',
  YEAR: 'year',
};

export function yearMonthDay(year, month, day) {
  return dayjs().year(year).month(month - 1).date(day);
}
