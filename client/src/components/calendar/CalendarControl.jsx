import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link, Redirect, generatePath } from 'react-router-dom';
import { calendarPath, makePathParams } from './paths';
import {
  dateFormats,
  titleCase,
  viewTypeList,
  viewTypes,
} from '../helper';

function reducer(state, {
  day,
  month,
  viewType,
  year,
}) {
  if (!day || !month || !year) {
    return {
      ...state,
      redirect: true,
    };
  }

  const dj = dayjs().year(year).month(month - 1).date(day);
  let previous;
  let next;

  if (viewType === viewTypes.YEAR) {
    next = dj.add(1, 'year');
    previous = dj.subtract(1, 'year');
  } else if (viewType === viewTypes.MONTH) {
    next = dj.add(1, 'month');
    previous = dj.subtract(1, 'month');
  } else if (viewType === viewTypes.WEEK) {
    next = dj.add(7, 'day');
    previous = dj.subtract(7, 'day');
  } else if (viewType === viewTypes.DAY) {
    next = dj.add(1, 'day');
    previous = dj.subtract(1, 'day');
  } else {
    return state;
  }

  return {
    nextLink: generatePath(calendarPath, makePathParams(viewType, next)),
    previousLink: generatePath(calendarPath, makePathParams(viewType, previous)),
    todayLink: generatePath(calendarPath, makePathParams(viewType, dayjs())),
    title: dj.format(dateFormats[viewType]),
  };
}

export default function CalendarControl(props) {
  const {
    day,
    month,
    viewType,
    year,
  } = props;

  const [state, dispatch] = useReducer(reducer, {
    title: '',
    nextLink: '',
    previousLink: '',
    todayLink: '',
  });

  const {
    nextLink,
    previousLink,
    redirect,
    title,
    todayLink,
  } = state;

  useEffect(() => {
    dispatch({
      day,
      month,
      viewType,
      year,
    });
  }, [day, month, viewType, year]);

  if (redirect) {
    return (
      <Redirect to={generatePath(calendarPath, makePathParams(viewTypes.MONTH, dayjs()))} />
    );
  }

  return (
    <div className="calendar-controls">
      <div>
        <Link to={todayLink}><button type="button">Today</button></Link>
        <Link to={previousLink}><button type="button">Previous</button></Link>
        <Link to={nextLink}><button type="button">Next</button></Link>
      </div>
      <h2>{title}</h2>
      <div>
        {viewTypeList.map((v) => (
          <Link
            key={v}
            to={generatePath(calendarPath, {
              day,
              month,
              year,
              viewType: v.toLowerCase(),
            })}
          >
            <button
              type="button"
              disabled={v === viewType}
            >
              {titleCase(v)}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

CalendarControl.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  viewType: PropTypes.oneOf(viewTypeList).isRequired,
  year: PropTypes.number.isRequired,
};
