import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link, Redirect, generatePath } from 'react-router-dom';
import {
  dayPath,
  monthPath,
  weekPath,
  yearPath,
  makePathParams,
} from './paths';
import { viewTypes, yearMonthDay } from '../helper';

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

  const dj = yearMonthDay(year, month, day);

  switch (viewType) {
    case viewTypes.YEAR: {
      const next = dj.add(1, 'year');
      const previous = dj.subtract(1, 'year');
      return {
        title: dj.format('YYYY'),
        nextLink: generatePath(yearPath, makePathParams(next)),
        previousLink: generatePath(yearPath, makePathParams(previous)),
      };
    }
    case viewTypes.WEEK: {
      const next = dj.add(7, 'day');
      const previous = dj.subtract(7, 'day');
      return {
        title: dj.format('MMMM YYYY'),
        nextLink: generatePath(weekPath, makePathParams(next)),
        previousLink: generatePath(weekPath, makePathParams(previous)),
      };
    }
    case viewTypes.MONTH: {
      const next = dj.add(1, 'month');
      const previous = dj.subtract(1, 'month');
      return {
        title: dj.format('MMMM YYYY'),
        nextLink: generatePath(monthPath, makePathParams(next)),
        previousLink: generatePath(monthPath, makePathParams(previous)),
      };
    }
    case viewTypes.DAY: {
      const next = dj.add(1, 'day');
      const previous = dj.subtract(1, 'day');
      return {
        title: dj.format('MMMM D, YYYY'),
        nextLink: generatePath(dayPath, makePathParams(next)),
        previousLink: generatePath(dayPath, makePathParams(previous)),
      };
    }
    default:
      return state;
  }
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
  });

  const {
    nextLink,
    previousLink,
    redirect,
    title,
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
    // Default is month view at now.
    return (
      <Redirect to={generatePath(monthPath, makePathParams(dayjs()))} />
    );
  }

  return (
    <div className="calendar-controls">
      <Link to={previousLink}><button type="button">Previous</button></Link>
      <h2>{title}</h2>
      <Link to={nextLink}><button type="button">Next</button></Link>
    </div>
  );
}

CalendarControl.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  viewType: PropTypes.oneOf(Object.values(viewTypes)).isRequired,
  year: PropTypes.number.isRequired,
};
