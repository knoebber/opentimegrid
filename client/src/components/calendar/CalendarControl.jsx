import React, {
  useCallback,
  useEffect,
  useReducer,
} from 'react';
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

function nextAndPrevious(dj, viewType) {
  if (viewType === viewTypes.YEAR) return { next: dj.add(1, 'year'), previous: dj.subtract(1, 'year') };
  if (viewType === viewTypes.MONTH) return { next: dj.add(1, 'month'), previous: dj.subtract(1, 'month') };
  if (viewType === viewTypes.WEEK) return { next: dj.add(7, 'day'), previous: dj.subtract(7, 'day') };
  if (viewType === viewTypes.DAY) return { next: dj.add(1, 'day'), previous: dj.subtract(1, 'day') };
  return { next: dj, previous: dj };
}

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
  const { next, previous } = nextAndPrevious(dj, viewType);

  return {
    nextLink: generatePath(calendarPath, makePathParams(viewType, next)),
    previousLink: generatePath(calendarPath, makePathParams(viewType, previous)),
    todayLink: generatePath(calendarPath, makePathParams(viewType, dayjs())),
    title: dj.format(dateFormats[viewType]),
  };
}

// Gets url params for a hotkey.
function getParamsForHotkey(key, dj, viewType) {
  const { next, previous } = nextAndPrevious(dj, viewType);
  switch (key.toLowerCase()) {
    case 'd':
      return makePathParams(viewTypes.DAY, dj);
    case 'w':
      return makePathParams(viewTypes.WEEK, dj);
    case 'm':
      return makePathParams(viewTypes.MONTH, dj);
    case 'q':
      return makePathParams(viewTypes.QUARTER, dj);
    case 'h':
      return makePathParams(viewTypes.HALF, dj);
    case 'y':
      return makePathParams(viewTypes.YEAR, dj);
    case 't':
    case 'home':
      return makePathParams(viewType, dayjs());
    case '<':
    case 'arrowleft':
    case 'k':
      return makePathParams(viewType, previous);
    case '>':
    case 'arrowright':
    case 'j':
      return makePathParams(viewType, next);
    default:
      return null;
  }
}

export default function CalendarControl(props) {
  const {
    day,
    month,
    pathname,
    pushHistory,
    viewType,
    year,
  } = props;

  const [state, dispatch] = useReducer(reducer, {
    nextLink: '',
    previousLink: '',
    title: '',
    todayLink: '',
  });

  const {
    nextLink,
    previousLink,
    redirect,
    title,
    todayLink,
  } = state;

  const onKeydown = useCallback((e) => {
    const { key, target: { localName: tagName } } = e;
    if (tagName !== 'body') return;

    const dj = dayjs().year(year).month(month - 1).date(day);
    const params = getParamsForHotkey(key, dj, viewType);
    if (params) {
      pushHistory(generatePath(calendarPath, params));
    }
  }, [day, month, viewType, year, pushHistory]);

  useEffect(() => {
    window.addEventListener('keydown', onKeydown, true);
    return () => window.removeEventListener('keydown', onKeydown, true);
  }, [onKeydown]);

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

  const isToday = todayLink === pathname;

  return (
    <div className="calendar-controls">
      <div>
        <Link to={todayLink}>
          <button type="button" disabled={isToday}>Today</button>
        </Link>
        <Link to={previousLink}>
          <button type="button">Previous</button>
        </Link>
        <Link to={nextLink}>
          <button type="button">Next</button>
        </Link>
      </div>
      <h2>
        {title}
      </h2>
      <div>
        {viewTypeList.map((v) => (
          <Link
            key={v}
            to={generatePath(calendarPath, {
              day,
              month,
              viewType: v.toLowerCase(),
              year,
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
  pathname: PropTypes.string.isRequired,
  pushHistory: PropTypes.func.isRequired,
  viewType: PropTypes.oneOf(viewTypeList).isRequired,
  year: PropTypes.number.isRequired,
};
