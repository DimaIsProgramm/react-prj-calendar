import Event from '../event/Event';
import React from 'react';
import Redline from '../hour/Redline';
import PropTypes from 'prop-types';
import moment from 'moment';

const Hour = ({ dataHour, hourEvents, isToday, onDeleteEvent }) => {
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {isToday && <Redline />}

      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${moment(dateFrom).format('HH:mm')} - ${moment(dateTo).format('HH:mm')}`}
            title={title}
            onDeleteEvent={onDeleteEvent}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  isToday: PropTypes.bool.isRequired,
};

export default Hour;
