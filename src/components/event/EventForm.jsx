import moment from 'moment';
import { getDateTime } from '../../utils/dateUtils.js';
import React, { useState } from 'react';

const EventForm = ({ onCreateEvent, setIsHidden }) => {
  const [event, setEvent] = useState({
    title: '',
    date: moment(new Date()).format('YYYY-MM-DD'),
    startTime: moment(new Date()).format('HH:mm'),
    endTime: moment(new Date()).format('HH:mm'),
    description: '',
  });

  const onChangeInput = e => {
    const { name, value } = e.target;

    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const onSubmitModal = e => {
    e.preventDefault();

    const curentEvent = {
      title,
      description,
      dateFrom: getDateTime(date, startTime),
      dateTo: getDateTime(date, endTime),
    };
    onCreateEvent(curentEvent);
    setIsHidden(true);
  };
  const { title, date, description, startTime, endTime } = event;

  return (
    <form className="event-form" onSubmit={onSubmitModal}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="event-form__field"
        value={event.title}
        onChange={onChangeInput}
      />
      <div className="event-form__time">
        <input
          type="date"
          name="date"
          className="event-form__field"
          value={date}
          onChange={onChangeInput}
        />
        <input
          type="time"
          name="startTime"
          className="event-form__field"
          value={startTime}
          onChange={onChangeInput}
        />
        <span>-</span>
        <input
          type="time"
          name="endTime"
          className="event-form__field"
          value={endTime}
          onChange={onChangeInput}
        />
      </div>
      <textarea
        name="description"
        placeholder="Description"
        className="event-form__field"
        onChange={onChangeInput}
        value={event.description}
        rows="5"
      ></textarea>
      <button type="submit" className="event-form__submit-btn" onClick={onCreateEvent}>
        {event.id ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default EventForm;
