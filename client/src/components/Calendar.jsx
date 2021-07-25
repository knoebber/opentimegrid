import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// dj is a dayjs object.
function makeDayState(dj) {
  const date = dj.date();
  return {
    display: date === 1 ? dj.format('MMM D') : date,
    unix: dj.unix(),
  };
}

function makeMonthState(monthNumber) {
  const days = [];

  const month = dayjs().month(monthNumber);

  const firstDateInMonth = month.date(1);
  const firstDayNameIndex = firstDateInMonth.day();

  days[firstDayNameIndex] = makeDayState(firstDateInMonth);

  // Backfill days from last month.
  for (let i = 0; i < firstDayNameIndex; i += 1) {
    days[i] = makeDayState(firstDateInMonth.date((-1 * firstDayNameIndex) + i + 1));
  }

  let dayCount = 1;

  // Month view always have 35 days - 5 rows, 7 columns.
  while (days.length < 35) {
    dayCount += 1;
    days.push(makeDayState(month.date(dayCount)));
  }

  return {
    days,
    month,
  };
}

export default function Calendar(props) {
  const {
    title,
  } = props;

  const [monthNumber, setMonthNumber] = useState(dayjs().month());
  const [monthState, setMonthState] = useState(makeMonthState(monthNumber));

  useEffect(() => {
    setMonthState(makeMonthState(monthNumber));
  }, [monthNumber]);

  const {
    days,
    month,
  } = monthState;

  return (
    <>
      <h1>{title}</h1>
      <div className="month-controls">
        <button type="button" onClick={() => setMonthNumber(monthNumber - 1)}>Prev</button>
        <strong>{month.format('MMMM YYYY')}</strong>
        <button type="button" onClick={() => setMonthNumber(monthNumber + 1)}>Next</button>
      </div>
      <div className="dayname-grid">
        {dayNames.map((name) => <div key={name} className="dayname"><strong>{name}</strong></div>)}
      </div>
      <div className="month-grid">
        {days.map(({ display, unix }) => (
          <div key={unix} className="day">
            <p><strong>{display}</strong></p>
          </div>
        ))}
      </div>
    </>
  );
}

Calendar.propTypes = {
  title: PropTypes.string.isRequired,
};
