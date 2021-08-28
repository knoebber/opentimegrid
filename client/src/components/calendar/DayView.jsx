import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import HourArea from './HourArea';
import HoursInDay from './HoursInDay';

export default function DayView(props) {
  const {
    day,
    month,
    year,
  } = props;

  const [dayState, setDayState] = useState({ isToday: false, currentHour: -1 });
  useEffect(() => {
    const dj = dayjs().year(year).month(month - 1).date(day);
    setDayState({
      isToday: dj.date() === day && dj.month() + 1 === month && dj.year() === year,
      currentHour: dayjs().hour(),
    });
  }, [day, month, year]);

  return (
    <div className="day-hour-grid">
      <HoursInDay
        currentHour={dayState.currentHour}
        isToday={dayState.isToday}
        rowStart={1}
      />
      <div
        className="day-hour-separator"
        style={{ gridRow: '1 / 25' }}
      />
      <HourArea rowStart={1} />
    </div>
  );
}
DayView.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
