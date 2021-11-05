import React from 'react';
import PropTypes from 'prop-types';
import { hours } from '../helper';

export default function HourArea(props) {
  const {
    rowStart,
  } = props;

  return hours.map(({ hour, display }) => (
    <div
      className={`hour-area${!display ? ' last-item' : ''}`}
      key={hour}
      style={{ gridRow: hour + rowStart }}
    />
  ));
}
HourArea.propTypes = {
  rowStart: PropTypes.number.isRequired,
};
