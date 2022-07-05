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
