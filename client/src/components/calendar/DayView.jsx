import React from 'react';

// 1AM to 11PM;
const hours = Array
  .from({ length: 23 })
  .map((_, i) => ({
    hour: i,
    display: `${(i % 12) + 1}${i < 11 ? 'AM' : 'PM'}`,
  }));

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
