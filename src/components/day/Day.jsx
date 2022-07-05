import React, { useState, useEffect } from 'react';
import Hour from '../hour/Hour';
import PropTypes from 'prop-types';
import moment from 'moment';
import './day.scss';

const Day = ({ dataDay, dayEvents, newValue, setUpdateEvents, setIsHidden, isHidden }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  const startPoint =
    Number(moment().local().format('HH')) * 60 -
    Number(moment().local().format('HH')) +
    Number(moment().local().format('mm'));

  const [redline, setRedline] = useState(startPoint);

  const redlineElem = <div className="red-line" style={{ top: redline + 'px' }}></div>;
  useEffect(() => {
    const timerId = setInterval(() => {
      setRedline(redline => redline + 1);
    }, 60000);
    return () => clearInterval(timerId);
  });
  const checkCurrentDay = () =>
    moment().local().format('YYYY MM DD') === moment(dataDay).format('YYYY MM DD');

  return (
    <div className="calendar__day" data-day={dataDay}>
      {checkCurrentDay() && redlineElem}
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => {
          return (
            Number(moment(event.dateFrom).format('HH')) === hour &&
            Number(moment(event.dateFrom).format('DD')) === dataDay
          );
        });

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
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

export default Day;
