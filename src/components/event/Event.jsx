import React, { useState } from 'react';
import './event.scss';
import '../../common.scss';
import PropTypes from 'prop-types';

const Event = ({ height, marginTop, title, time, onDeleteEvent, id }) => {
  const [isEvent, setIsEvent] = useState(true);
  const [deleteEventVisible, setDeleteEventVisible] = useState(false);
  const eventStyle = {
    height,
    marginTop,
  };
  return (
    <>
      <div
        style={eventStyle}
        className="event"
        onClick={() => {
          setIsEvent(false);
          setDeleteEventVisible(true);
        }}
      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      {deleteEventVisible && (
        <button onClick={() => onDeleteEvent(id)} className="delete-event-btn">
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      )}
    </>
  );
};

Event.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
};

export default Event;
