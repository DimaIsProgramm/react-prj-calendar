import React, { useEffect } from 'react';
import classnames from 'classnames';
import './modal.scss';
import moment from 'moment';
import { fetchEvents, createEvents, getEvents } from '../../gateway/events.js';
import EventForm from '../event/EventForm';

const Modal = ({
  isHidden,
  onUpdateEvent,
  setIsHidden,
  setEvents,
  onCreateEvent,
  currentEvent,
  events,
}) => {
  const closeHanlder = () => {
    setIsHidden(true);
  };

  if (isHidden) {
    return null;
  }

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={closeHanlder}>
            +
          </button>
          <EventForm
            events={events}
            onCreateEvent={onCreateEvent}
            onUpdateEvent={onUpdateEvent}
            currentEvent={currentEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
