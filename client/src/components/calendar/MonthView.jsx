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

export default function MonthView(props) {
  const {
    month,
  } = props;

  const [monthState, setMonthState] = useState(makeMonthState(month));

  useEffect(() => {
    setMonthState(makeMonthState(month));
  }, [month]);

  const {
    days,
  } = monthState;

  return (
    <>
      <div className="day-name-grid">
        {dayNames.map((name) => <div key={name} className="day-name"><strong>{name}</strong></div>)}
      </div>
      <div className="month-grid">
        {days.map(({ display, unix }) => (
          <div key={unix} className="month-day">
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
