import React from 'react';
import PropTypes from 'prop-types';

export default function DayView(props) {
  const {
    day,
    month,
    year,
  } = props;

  return (
    <strong>{`Day view: ${year} ${month} ${day}`}</strong>
  );
}

DayView.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
