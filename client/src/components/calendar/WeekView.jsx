import React from 'react';
import PropTypes from 'prop-types';

export default function MonthView(props) {
  const {
    day,
    month,
    year,
  } = props;

  return (
    <strong>{`Month view: ${year} ${month} ${day}`}</strong>
  );
}

MonthView.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
