import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import moment from 'moment';
import { getWeekStartDate, generateWeekRange, getMonthShown } from '../src/utils/dateUtils.js';
import './common.scss';
import PropTypes from 'prop-types';

const App = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [events, setEvents] = useState([]);
  const [week, setWeek] = useState(generateWeekRange(getWeekStartDate(new Date())));
  const [currentEvent, setCurentEvent] = useState(null);
  const [updateEvent, setUpdateEvent] = useState({
    date: '',
    startTime: '',
    endTime: '',
    dateFrom: '',
    dateTo: '',
  });

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
  const weekDayStart = new Date(week[0]);
  const weekDates = generateWeekRange(getWeekStartDate(weekDayStart));

  const prevHandler = () => {
    setWeek(
      generateWeekRange(
        getWeekStartDate(new Date(weekDayStart.setDate(weekDayStart.getDate() - 7))),
      ),
    );
  };
  const nextHandler = () => {
    setWeek(
      generateWeekRange(
        getWeekStartDate(new Date(weekDayStart.setDate(weekDayStart.getDate() + 7))),
      ),
    );
  };

  const todayHandler = () => {
    const today = generateWeekRange(getWeekStartDate(new Date()));
    setWeek(today);
  };

  return (
    <>
      <Header
        monthShown={getMonthShown(week[0])}
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
        setIsHidden={setIsHidden}
        onUpdateEvent={onUpdateEvent}
        onCreateEvent={onCreateEvent}
        events={events}
        currentEvent={currentEvent}
      />
    </>
  );
};

export default App;
