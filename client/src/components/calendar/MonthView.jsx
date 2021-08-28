import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  dayNamesShort,
  makeDayState,
} from '../helper';

function makeMonthState(monthNumber) {
  const days = [];

  const month = dayjs().month(monthNumber - 1);

  const firstDateInMonth = month.date(1);
  const firstDayNameIndex = firstDateInMonth.day();

  // Set first day in month.
  days[firstDayNameIndex] = makeDayState(firstDateInMonth, 'MMM D');

  // Backfill days from last month.
  for (let i = 0; i < firstDayNameIndex; i += 1) {
    const dj = firstDateInMonth.date((-1 * firstDayNameIndex) + i + 1);
    days[i] = makeDayState(dj, 'D');
  }

  let dayCount = 1;

  // Month view always have 35 days - 5 rows, 7 columns.
  while (days.length < 35) {
    dayCount += 1;
    const dj = month.date(dayCount);
    days.push(makeDayState(dj, dj.date() === 1 ? 'MMM D' : 'D'));
  }

  return {
    days,
    month,
  };
}

export default function MonthView(props) {
  const {
    month,
  } = props;

  const [monthState, setMonthState] = useState({ days: [], month: '' });

  useEffect(() => {
    setMonthState(makeMonthState(month));
  }, [month]);

  const {
    days,
  } = monthState;

  return (
    <>
      <div className="day-name-grid">
        {dayNamesShort.map((name) => <div key={name} className="day-name"><strong>{name}</strong></div>)}
      </div>
      <div className="month-grid">
        {days.map(({ display, renderKey, isToday }) => (
          <div key={renderKey} className={`month-day${isToday ? ' today' : ''}`}>
            <p><strong>{display}</strong></p>
          </div>
        ))}
      </div>
    </>
  );
}

MonthView.propTypes = {
  month: PropTypes.number.isRequired,
};
