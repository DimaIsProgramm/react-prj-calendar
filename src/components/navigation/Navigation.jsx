import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates, nextHandler }) => {
  const isCurrentDay = day => moment().isSame(day, 'day');
  return (
    <header
      className="calendar__header"
      onChange={() => {
        console.log('click');
        nextHandler();
      }}
    >
      {weekDates.map(dayDate => (
        <div key={dayDate.getDate()} className="calendar__day-label day-label">
          <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
          <span
            className={classnames('calendar__day-number', {
              'day-label__current-day': isCurrentDay(dayDate),
            })}
          >
            {dayDate.getDate()}
          </span>
        </div>
      ))}
    </header>
  );
};

export default Navigation;

Navigation.propTypes = {
  isCurrentDay: PropTypes.func,
  weekDates: PropTypes.array.isRequired,
};
