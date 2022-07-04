import React, { useEffect } from 'react';
import classnames from 'classnames';
import './modal.scss';
import moment from 'moment';
import { fetchEvents, createEvents, getEvents } from '../../gateway/events.js';

const Modal = ({ isHidden, updateEvent, setUpdateEvent, setIsHidden, setEvents }) => {
  const handleChange = event => {
    const { name, value } = event.target;
    const { date, startTime, endTime } = updateEvent;

    let startEvent;
    let endEvent;

    if (event && name === 'startTime') {
      startEvent = date + '' + value;
      endEvent = date + '' + endTime;
    }
    if (event && name === 'endTime') {
      startEvent = date + '' + startTime;
      endEvent = date + '' + value;
    }

    setUpdateEvent(prevState => ({
      ...prevState,
      [name]: value,
      dateFrom: startEvent,
      dateTo: endEvent,
    }));
  };

  useEffect(() => {
    getEvents().then(events => {
      setEvents(events);
    });
  }, []);
  const handleSubmit = (event, eventData) => {
    const { startTime, endTime, dateFrom } = eventData;
    if (String(startTime.slice(3, 5)) !== '00' && Number(startTime.slice(3, 5)) % 15 !== 0) {
      alert('Time must be a multiple of 15 minutes');
      return;
    }
    if (String(endTime.slice(3, 5)) !== '00' && Number(endTime.slice(3, 5)) % 15 !== 0) {
      alert('Time must be a multiple of 15 minutes');
      return;
    }
    if (startTime === endTime || Number(endTime.slice(0, 2)) < Number(startTime.slice(0, 2))) {
      alert('Select another time');
      return;
    }
    if (moment(dateFrom).format('DD') !== moment(dateFrom).format('DD')) {
      alert('The event must end in one day');
      return;
    }
    if (Number(endTime.slice(0, 2)) - Number(startTime.slice(0, 2)) > 6) {
      alert("The event can't last more than 6 hours");
      return;
    }
    getEvents().then(events => {
      const sameEvents = events.some(
        event => String(moment(event.dateFrom)) === String(moment(dateFrom)),
      );

      if (sameEvents) {
        alert('You already have events at this time');
        return;
      }
      return createEvents(eventData).then(() => fetchEvents(setEvents));
    });
    event.preventDefault();
    event.target.reset();
  };
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
          <form className="event-form" onSubmit={event => handleSubmit(event, updateEvent)}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={handleChange}
                value={updateEvent.date}
                step="1"
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={handleChange}
                value={updateEvent.startTime}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={handleChange}
                value={updateEvent.endTime}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
