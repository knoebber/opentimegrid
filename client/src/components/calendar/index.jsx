import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import CalendarControl from './CalendarControl';
import DayView from './DayView';
import MonthView from './MonthView';
import WeekView from './WeekView';
import YearView from './YearView';
import {
  basePath,
  dayPath,
  monthPath,
  weekPath,
  yearPath,
} from './paths';
import { viewTypes } from '../helper';

const routes = [
  {
    component: YearView,
    path: yearPath,
    viewType: viewTypes.YEAR,
  },
  {
    component: MonthView,
    path: monthPath,
    viewType: viewTypes.MONTH,
  },
  {
    component: WeekView,
    path: weekPath,
    viewType: viewTypes.WEEK,
  },
  {
    component: DayView,
    path: dayPath,
    viewType: viewTypes.DAY,
  },
  {
    component: () => null,
    path: basePath,
    viewType: viewTypes.DAY,
  },
];

export default function Calendar() {
  return (
    <Switch>
      {routes.map(({ component: Component, path, viewType }) => (
        <Route
          key={path}
          path={path}
          render={({
            history: { push },
            match: {
              params: {
                year,
                month,
                day,
              },
            },
          }) => (
            <>
              <CalendarControl
                day={parseInt(day, 10)}
                month={parseInt(month, 10)}
                pushHistory={push}
                viewType={viewType}
                year={parseInt(year, 10)}
              />
              <Component
                year={parseInt(year, 10)}
                month={parseInt(month, 10)}
                day={parseInt(day, 10)}
              />
            </>
          )}
        />
      ))}
    </Switch>
  );
}
