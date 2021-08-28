import React from 'react';
import { hours } from '../helper';

export default function DayView() {
  return (
    <div className="day-hour-grid">
      {hours.map(({ hour, display }) => (
        <div key={hour} className="day-hour-text">
          <span>{display}</span>
        </div>
      ))}
      <div className="day-hour-separator" />
      {hours.map(({ hour }) => (
        <div key={hour} className="day-hour-area" />
      ))}
    </div>
  );
}
