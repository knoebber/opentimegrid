import React from 'react';
import PropTypes from 'prop-types';
import { hours } from '../helper';

export default function HoursInDay(props) {
  const {
    currentHour,
    isToday,
    rowStart,
  } = props;

  return hours.map(({ hour, display }, i) => (
    <div
      key={hour}
      className="hours-in-day-text"
      style={{ gridRow: rowStart + i }}
    >
      { display && (
        <span className={`${isToday && currentHour === hour + 1 ? 'today' : ''}`}>
          {display}
        </span>
      )}
    </div>
  ));
}

HoursInDay.propTypes = {
  currentHour: PropTypes.number.isRequired,
  isToday: PropTypes.bool.isRequired,
  rowStart: PropTypes.number.isRequired,
};
