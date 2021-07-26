import React from 'react';
import PropTypes from 'prop-types';

export default function WeekView(props) {
  const {
    day,
    month,
    year,
  } = props;

  return (
    <strong>{`Week view: ${year} ${month} ${day}`}</strong>
  );
}

WeekView.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
