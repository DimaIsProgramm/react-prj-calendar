import React from 'react';
import Day from '../day/Day';
import moment from 'moment';
import events from '../../gateway/events';

import './week.scss';

const Week = ({ weekDates, setUpdateEvents, newValue, events, setIsHidden, isHidden }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        //getting all events from the day we will render
        const dayEvents = events.filter(
          event => event.dateFrom > dayStart && event.dateTo < dayEnd,
        );
        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart}
            dayEvents={dayEvents}
            setUpdateEvents={setUpdateEvents}
            newValue={newValue}
            setIsHidden={setIsHidden}
            isHidden={isHidden}
          />
        );
      })}
    </div>
  );
};

export default Week;
