import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import Calendar from './calendar';
import Home from './home';

const routes = [
  {
    text: 'Calendar',
    path: '/calendar',
    component: Calendar,
  },
  {
    text: 'Home',
    path: '',
    component: Home,
  },
];

// So that home appears first and the <Switch> still works.
const links = [...routes].reverse();

export default function Nav() {
  return (
    <Router>
      <nav>
        {links.map(({ text, path }) => (<Link key={path} to={path}>{text}</Link>))}
      </nav>
      <main>
        <h1>Open Time Grid</h1>
        <Switch>
          {routes.map(({ component: Component, path }) => (
            <Route
              key={path}
              path={path}
            >
              <Component />
            </Route>
          ))}
        </Switch>
      </main>
    </Router>
  );
}
