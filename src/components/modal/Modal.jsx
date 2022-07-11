import React, { useEffect } from 'react';
import './modal.scss';
import EventForm from '../event/EventForm';

const Modal = ({ isHidden, setIsHidden, onCreateEvent }) => {
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
          <EventForm setIsHidden={setIsHidden} onCreateEvent={onCreateEvent} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
