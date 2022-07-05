import React from 'react';
import moment from 'moment';
import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({
  dataHour,
  hourEvents,
  newValue,
  dataDay,
  setUpdateEvents,
  isHidden,
  setIsHidden,
}) => {
  const handleClick = event => {
    setIsHidden(true);

    const creatStartEventData =
      moment().format('YYYY-MM-') +
      formatMins(Number(dataDay)) +
      'T' +
      formatMins(Number(event.target.dataset.time) - 1) +
      ':00';

    newValue(creatStartEventData);

    return creatStartEventData;
  };
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1} onClick={handleClick}>
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        return (
          <Event
            key={id}
            height={Number(moment(dateFrom).format('mm')) - Number(moment(dateTo).format('mm'))}
            marginTop={moment(dateFrom).format('mm') + 'px'}
            time={`${moment(dateFrom).format('HH:mm')} - ${moment(dateTo).format('HH:mm')}`}
            title={title}
            setIsHidden={setIsHidden}
            setUpdateEvents={setUpdateEvents}
            hourEvents={hourEvents}
            isHidden={isHidden}
          />
        );
      })}
    </div>
  );
};

export default Hour;
