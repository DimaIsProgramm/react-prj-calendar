import React from 'react';
import Day from '../day/Day';
import moment from 'moment';
import PropTypes from 'prop-types';
import './week.scss';

const Week = ({ weekDates, events, setIsHidden, onDeleteEvent }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);
        const isCurrentTime =
          moment(dayStart).format('MMMM DD YYYY') === moment(new Date()).format('MMMM DD YYYY');
        const dayEvents = events.filter(
          event => event.dateFrom > dayStart && event.dateTo < dayEnd,
        );
        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            setIsHidden={setIsHidden}
            isCurrentTime={isCurrentTime}
            onDeleteEvent={onDeleteEvent}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  weekDates: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  setIsHidden: PropTypes.func.isRequired,
};

export default Week;
