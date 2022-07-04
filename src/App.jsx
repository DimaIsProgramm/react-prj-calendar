import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import moment from 'moment';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import './common.scss';
import PropTypes from 'prop-types';

const App = () => {
  const [month, setMonth] = useState(moment());
  const [isHidden, setIsHidden] = useState(true);
  const [events, setEvents] = useState([]);
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [updateEvent, setUpdateEvent] = useState({
    date: '',
    startTime: '',
    endTime: '',
    dateFrom: '',
    dateTo: '',
  });

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const isShowModal = () => {
    setIsHidden(false);
    setUpdateEvent({
      date: moment().format('YYYY-MM-DD'),
      startTime: moment().format('HH:mm'),
      endTime: moment().add(1, 'hour').format('HH:mm'),
      dateFrom: moment().format('YYYY-MM-DD') + '' + moment().format('HH:mm'),
      dateTo: moment().format('YYYY-MM-DD') + '' + moment().add(1, 'hour').format('HH:mm'),
    });
  };
  const newValue = newDate => {
    setUpdateEvent({
      date: moment(newDate).format('YYYY-MM-DD'),
      startTime: moment(newDate).format('HH:mm'),
      endTime: moment(newDate).add(1, 'hour').format('HH:mm'),
      dateFrom: moment(newDate).format('YYYY-MM-DD') + '' + moment(newDate).format('HH:mm'),
      dateTo:
        moment(newDate).format('YYYY-MM-DD') + '' + moment(newDate).add(1, 'hour').format('HH:mm'),
    });
  };

  const prevHandler = () => {
    setWeekStartDate(
      weekStartDate =>
        (weekStartDate = new Date(weekStartDate.setDate(weekStartDate.getDate() - 7))),
    );
    setMonth(prev => prev.clone().subtract(1, 'week'));
  };
  const nextHandler = () => {
    setWeekStartDate(
      weekStartDate =>
        (weekStartDate = new Date(weekStartDate.setDate(weekStartDate.getDate() + 7))),
    );
    setMonth(prev => prev.clone().add(1, 'week'));
  };

  const todayHandler = () => {
    setWeekStartDate(weekStartDate => (weekStartDate = new Date()));
    setMonth(moment());
  };

  return (
    <>
      <Header
        month={month}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
        isShowModal={isShowModal}
        todayHandler={todayHandler}
      />
      <Calendar
        newValue={newValue}
        setIsHidden={setIsHidden}
        nextHandler={nextHandler}
        weekDates={weekDates}
        events={events}
        isHidden={isHidden}
        setUpdateEvents={setEvents}
      />
      <Modal
        isHidden={isHidden}
        setEvents={setEvents}
        setIsHidden={setIsHidden}
        setUpdateEvent={setUpdateEvent}
        updateEvent={updateEvent}
      />
      ;
    </>
  );
};

export default App;
