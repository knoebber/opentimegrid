import React from 'react';
import PropTypes from 'prop-types';

export default function YearView(props) {
  const {
    day,
    month,
    year,
  } = props;

  return (
    <strong>{`Year view: ${year} ${month} ${day}`}</strong>
  );
}

YearView.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
