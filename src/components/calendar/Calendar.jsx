import React from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({ weekDates, today, newValue, setUpdateEvents, events, setIsHidden }) => {
  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            newValue={newValue}
            setUpdateEvents={setUpdateEvents}
            events={events}
            setIsHidden={setIsHidden}
            today={today}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
