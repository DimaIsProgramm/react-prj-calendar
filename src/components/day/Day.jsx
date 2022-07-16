import React from 'react';
import Hour from '../hour/Hour';
import PropTypes from 'prop-types';
import './day.scss';

const Day = ({ dataDay, dayEvents, isCurrentTime, onDeleteEvent, setIsHidden }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);
        const isToday = isCurrentTime ? new Date().getHours() === hour : false;
        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            isToday={isToday}
            onDeleteEvent={onDeleteEvent}
            setIsHidden={setIsHidden}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.array.isRequired,
  isCurrentTime: PropTypes.bool.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  setIsHidden: PropTypes.func.isRequired,
};

export default Day;
