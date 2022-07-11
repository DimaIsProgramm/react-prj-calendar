import React from 'react';
import moment from 'moment';

const Redline = ({ day }) => {
  return (
    <div
      className=" red-line"
      style={{ top: `${moment(new Date()).diff(day, 'minutes')}px` }}
    ></div>
  );
};

export default Redline;
const checkCurrentDay = () =>
  moment(new Date().format('YYYY MM DD')) === moment(day).format('YYYY MM DD');

const filteredEvents = () => {
  const eventsArray = events.filter(
    event => moment(event.start).format('YYYY MM DD') == moment(day).format('YYYY MM DD'),
  );
  return eventsArray;
};
