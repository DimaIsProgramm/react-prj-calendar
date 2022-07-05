import moment from 'moment';
import React, { useEffect, useState } from 'react';
import validateDataEvent from './eventValidation.js';
import createNumbersArray from '../../scripts/createNumbersArray.js';

const EventForm = ({ updateEvent, onCreateEvent, currentEvent, events }) => {
  const selectMinutesArr = ['00', '15', '30', '45'];
  const selectHoursArr = createNumbersArray(0, 23).map(hour => (hour < 10 ? '0' + hour : hour));
  const allowedFields = ['id', 'title', 'start', 'end', 'description'];

  const removeSameFields = obj => {
    Object.keys(obj).forEach(key => {
      if (!allowedFields.includes(key)) delete obj[key];
    });
  };

  const baseEvent = {
    title: '',
    date: moment().format('YYYY-MM-DD'),
    startHours: moment().format('HH'),
    startMinutes: '00',
    endHours: +moment().format('HH') + 1,
    endMinutes: '00',
    description: '',
  };

  const [event, setEvent] = useState(currentEvent || baseEvent);

  const prepareEvent = event => {
    event.preventDefault();

    const eventObj = Object.assign(
      {
        start: moment(event.day)
          .set('hour', event.startHours)
          .set('minute', event.startMinutes)
          .toISOString(),
        end: moment(event.day)
          .set('hour', event.endHours)
          .set('minute', event.endMinutes)
          .toISOString(),
      },
      event,
    );

    removeSameFields(eventObj);

    validateDataEvent(eventObj, events)
      .then(res => {
        if (res.errors) throw new Error(res.errors);
        eventObj.id ? updateEvent(eventObj) : onCreateEvent(eventObj);
      })
      .catch(error => alert(error));
  };

  const prepareEventObj = eventObj => {
    const editEvent = Object.assign({}, eventObj);
    editEvent.date = moment(editEvent.start).format('YYYY-MM-DD');
    editEvent.startHours = moment(editEvent.start).format('HH');
    editEvent.startMinutes = moment(editEvent.start).format('mm');
    editEvent.endHours = moment(editEvent.end).format('HH');
    editEvent.endMinutes = moment(editEvent.end).format('mm');
    delete editEvent.start;
    delete editEvent.end;
    return editEvent;
  };

  const onChangeInput = event => {
    event.persist();
    setEvent(prevEvent => ({
      ...prevEvent,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (!currentEvent || !currentEvent.id) return;
    setEvent(prepareEventObj(currentEvent));
  }, [currentEvent]);

  return (
    <form className="event-form" onSubmit={prepareEvent}>
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
          value={event.date}
          onChange={onChangeInput}
        />
        <select
          className="event-form__time-bar"
          name="startHours"
          onChange={onChangeInput}
          value={event.startHours}
        >
          {selectHoursArr.map(hour => {
            return (
              <option key={hour} value={hour}>
                {hour}
              </option>
            );
          })}
        </select>
        {' : '}
        <select
          className="event-form__time-bar"
          name="startMinutes"
          onChange={onChangeInput}
          value={event.startMinutes}
        >
          {selectMinutesArr.map(minutes => {
            return (
              <option key={minutes} value={minutes}>
                {minutes}
              </option>
            );
          })}
        </select>
        <span> — </span>
        <select
          className="event-form__time-bar"
          name="endHours"
          onChange={onChangeInput}
          value={event.endHours}
        >
          {selectHoursArr.map(hour => {
            return (
              <option key={hour} value={hour}>
                {hour}
              </option>
            );
          })}
        </select>
        {' : '}
        <select
          className="event-form__time-bar"
          name="endMinutes"
          onChange={onChangeInput}
          value={event.endMinutes}
        >
          {selectMinutesArr.map(minutes => {
            return (
              <option key={minutes} value={minutes}>
                {minutes}
              </option>
            );
          })}
        </select>
      </div>
      <textarea
        name="description"
        placeholder="Description"
        className="event-form__field"
        onChange={onChangeInput}
        value={event.description}
        rows="5"
      ></textarea>
      <button type="submit" className="event-form__submit-btn">
        {event.id ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default EventForm;
