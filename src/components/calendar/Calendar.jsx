import React, { useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import { fetchEvents, createEvent, deleteEvent } from '../../gateway/events.js';
import PropTypes from 'prop-types';
import './calendar.scss';

const Calendar = ({
  weekDates,
  setUpdatedEvent,
  setIsHidden,
  isHidden,
  updatedEvent,
  changeValue,
}) => {
  const [events, setEvents] = useState([]);

  const fetchAllEvents = () => {
    fetchEvents()
      .then(eventsList =>
        setEvents(
          eventsList.map(event => ({
            ...event,
            dateFrom: new Date(event.dateFrom),
            dateTo: new Date(event.dateTo),
          })),
        ),
      )
      .catch(() => alert('Server Error'));
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const onCreateEvent = eventData => {
    createEvent(eventData).then(() => fetchAllEvents());
  };

  const onDeleteEvent = id => {
    deleteEvent(id).then(() => fetchAllEvents());
  };
  return (
    <section className="calendar">
      <Modal
        setIsHidden={setIsHidden}
        setUpdatedEvent={setUpdatedEvent}
        isHidden={isHidden}
        onCreateEvent={onCreateEvent}
        updatedEvent={updatedEvent}
      />
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            onDeleteEvent={onDeleteEvent}
            setIsHidden={setIsHidden}
            changeValue={changeValue}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  isHidden: PropTypes.bool.isRequired,
  setIsHidden: PropTypes.func.isRequired,
};

export default Calendar;
