import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function DayColumn({ days }) {
  return days.map((d, i) => (
    <div
      key={d.renderKey}
      className={`half-view-day-cell${i === 30 ? ' last-item' : ''}${d.empty ? ' empty' : ''}`}
      style={{ gridRow: i + 2, gridColumn: d.col }}
    >
      { !d.empty && (
        <>
          <span className="date-cell">{d.date}</span>
          <span className="dayname-cell">{d.dayname}</span>
          <span className="data-cell" />
        </>
      )}
    </div>
  ));
}

DayColumn.propTypes = {
  days: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function makeDayColumnState(dj, col, empty) {
  return {
    col,
    date: dj.format('D'),
    dayname: dj.format('dd'),
    empty,
    renderKey: dj.format('YYMD'),
    unix: dj.unix(),
  };
}

export default function HalfView(props) {
  const {
    day,
    month,
    year,
  } = props;

  const [state, setState] = useState([]);
  useEffect(() => {
    const result = [];
    for (let i = 0; i < 6; i += 1) {
      const dj = dayjs().year(year).month(month + i - 1).date(1);
      const current = {
        days: [],
        display: dj.format('MMMM'),
        renderKey: dj.format('YYYYM'),
        unix: dj.unix(),
      };

      const endOfMonth = dj.endOf('month').date();
      for (let j = 1; j <= 31; j += 1) {
        current.days.push(makeDayColumnState(
          dj.date(j),
          i + 1,
          j > endOfMonth,
        ));
      }
      result.push(current);
    }
    setState(result);
  }, [day, month, year]);

  return (
    <div className="half-view-grid">
      {state.map(({ display, renderKey }, i) => (
        <div
          key={renderKey}
          style={{ gridArea: `1 / ${i + 1}` }}
        >
          <strong>{display}</strong>
        </div>
      ))}
      {state.map(({ days, renderKey }) => (
        <DayColumn
          key={renderKey}
          days={days}
        />
      ))}
    </div>
  );
}

HalfView.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
