import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import HourArea from './HourArea';
import HoursInDay from './HoursInDay';
import { makeDayState } from '../helper';

export default function WeekView(props) {
  const {
    day,
    month,
    year,
  } = props;

  const [state, setState] = useState([]);
  useEffect(() => {
    const dj = dayjs().year(year).month(month - 1).date(day);
    const sunday = dj.subtract(dj.day(), 'day');
    const result = [];
    for (let i = 0; i < 7; i += 1) {
      result[i] = makeDayState(sunday.add(i, 'day'), 'ddd MM/DD');
    }
    setState(result);
  }, [day, month, year]);

  return (
    <div className="week-view-grid">
      <HoursInDay
        currentHour={0}
        isToday={false}
        rowStart={2}
      />
      <div
        className="day-hour-separator"
        style={{ gridRow: '2 / 26' }}
      />
      {state.map(({ display, renderKey, isToday }, i) => (
        <div
          key={renderKey}
          style={{ gridArea: `1 / ${i + 3}` }}
        >
          <strong className={isToday ? 'today' : ''}>{display}</strong>
        </div>
      ))}
      {state.map(({ renderKey }) => (
        <HourArea
          key={renderKey}
          rowStart={2}
        />
      ))}
    </div>
  );
}

WeekView.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
