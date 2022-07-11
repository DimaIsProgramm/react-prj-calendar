import Event from '../event/Event';
import React from 'react';
import { formatMins } from '../../../src/utils/dateUtils.js';
import Redline from '../hour/Redline';
import PropTypes from 'prop-types';

const Hour = ({ dataHour, hourEvents, isToday, onDeleteEvent }) => {
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {isToday && <Redline />}

      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;
        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
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
