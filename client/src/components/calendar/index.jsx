import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import CalendarControl from './CalendarControl';
import DayView from './DayView';
import MonthView from './MonthView';
import WeekView from './WeekView';
import QuarterView from './QuarterView';
import HalfView from './HalfView';
import YearView from './YearView';
import * as paths from './paths';
import { viewTypes } from '../helper';

const routes = [
  {
    component: YearView,
    path: paths.yearPath,
    viewType: viewTypes.YEAR,
  },
  {
    component: HalfView,
    path: paths.halfPath,
    viewType: viewTypes.HALF,
  },
  {
    component: QuarterView,
    path: paths.quarterPath,
    viewType: viewTypes.QUARTER,
  },
  {
    component: MonthView,
    path: paths.monthPath,
    viewType: viewTypes.MONTH,
  },
  {
    component: WeekView,
    path: paths.weekPath,
    viewType: viewTypes.WEEK,
  },
  {
    component: DayView,
    path: paths.dayPath,
    viewType: viewTypes.DAY,
  },
  {
    component: () => null,
    path: paths.basePath,
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
            location: { pathname },
            match: {
              params: {
                day,
                month,
                year,
              },
            },
          }) => (
            <>
              <CalendarControl
                day={parseInt(day, 10)}
                month={parseInt(month, 10)}
                pathname={pathname}
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
