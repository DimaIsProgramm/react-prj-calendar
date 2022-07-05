import React, { useState } from 'react';
import moment from 'moment';
import { deleteEvent, fetchEvents } from '../../gateway/events';

import './event.scss';
import '../../common.scss';

const Event = ({ height, marginTop, title, time, setIsHidden, hourEvents, setUpdateEvents }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [deleteEventVisible, setDeleteEventVisible] = useState(false);
  let newHeight;
  if (height < Number('15%')) {
    newHeight = '15%';
    height = newHeight;
    return newHeight;
  }
  const newEventStyle = {
    height: newHeight,
    marginTop,
  };
  const handleClick = e => {
    e.stopPropagation();
    setIsHidden();
    setDeleteEventVisible(!deleteEventVisible);
  };

  const handleDelete = e => {
    e.stopPropagation();

    setIsHidden(false);

    return hourEvents.map(({ id, date, dateFrom }) => {
      let start = moment().format('YYYY/MM/DD HH:mm');
      let difference = moment
        .duration(moment(dateFrom, 'YYYY/MM/DD HH:mm').diff(moment(start, 'YYYY/MM/DD HH:mm')))
        .asHours();

      if (difference <= 0.25 && difference > 0 && moment().format('YYYY-MM-DD') === date) {
        alert('You can not delete event earlier than 15 min');
        return;
      } else {
        deleteEvent(id).then(() => fetchEvents(setUpdateEvents));
      }
    });
  };

  return (
    <div style={eventStyle} className="event" onClick={handleClick}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {isDeleteEventVisible ? (
        <button onClick={handleDelete} className="delete-event-btn">
          <i className="fas fa-trash-alt"></i>
          <span>Delete</span>
        </button>
      ) : null}
    </div>
  );
};

export default Event;
