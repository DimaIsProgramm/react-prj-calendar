import React, { useState } from 'react';
import './event.scss';
import '../../common.scss';
import PropTypes from 'prop-types';

const Event = ({ height, marginTop, title, time, onDeleteEvent, id }) => {
  const [deleteEventVisible, setDeleteEventVisible] = useState(false);
  const eventStyle = {
    height,
    marginTop,
  };

  const handleClose = () => {
    setDeleteEventVisible(false);
  };
  return (
    <>
      <div
        style={eventStyle}
        className="event"
        onClick={() => {
          setDeleteEventVisible(true);
        }}
      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      {deleteEventVisible && (
        <div className="popup">
          <button className="close-popup__btn" onClick={handleClose}>
            +
          </button>
          <button onClick={() => onDeleteEvent(id)} className="delete-event-btn">
            <i className="fas fa-trash-alt"></i> Delete
          </button>
        </div>
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
