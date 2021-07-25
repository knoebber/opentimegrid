import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Calendar from './components/Calendar';

ReactDOM.render(
  <React.StrictMode>
    <Calendar
      title="Calendar Thing"
    />
  </React.StrictMode>,
  document.getElementById('root'),
);
