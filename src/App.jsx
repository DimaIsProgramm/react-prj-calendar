import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { getWeekStartDate, generateWeekRange, getMonthShown } from '../src/utils/dateUtils.js';
import './common.scss';
import PropTypes from 'prop-types';

const App = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [week, setWeek] = useState(generateWeekRange(getWeekStartDate(new Date())));

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
        setIsHidden={setIsHidden}
        todayHandler={todayHandler}
      />
      <Calendar setIsHidden={setIsHidden} weekDates={weekDates} isHidden={isHidden} />
    </>
  );
};

export default App;
