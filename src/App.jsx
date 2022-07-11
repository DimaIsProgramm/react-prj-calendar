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
// import React, { useEffect, useState } from 'react';
// import Header from './components/header/Header.jsx';
// import Calendar from './components/calendar/Calendar.jsx';
// import Modal from './components/modal/Modal.jsx';
// import moment from 'moment';
// import { getWeekStartDate, generateWeekRange, getMonthShown } from '../src/utils/dateUtils.js';
// import './common.scss';
// import { getEvents, createEvent, updateEvent, deleteEvent } from './gateway/events';
// import PropTypes from 'prop-types';

// const App = () => {
//   const [isHidden, setIsHidden] = useState(true);
//   const [events, setEvents] = useState([]);
//   const [week, setWeek] = useState(generateWeekRange(getWeekStartDate(new Date())));
//   const [currentEvent, setCurentEvent] = useState(null);

//   const weekDayStart = new Date(week[0]);
//   const weekDates = generateWeekRange(getWeekStartDate(weekDayStart));

//   const prevHandler = () => {
//     setWeek(
//       generateWeekRange(
//         getWeekStartDate(new Date(weekDayStart.setDate(weekDayStart.getDate() - 7))),
//       ),
//     );
//   };
//   const nextHandler = () => {
//     setWeek(
//       generateWeekRange(
//         getWeekStartDate(new Date(weekDayStart.setDate(weekDayStart.getDate() + 7))),
//       ),
//     );
//   };

//   const todayHandler = () => {
//     const today = generateWeekRange(getWeekStartDate(new Date()));
//     setWeek(today);
//   };

//   const closeModal = () => {
//     setIsHidden(true);
//     setCurentEvent(null);
//   };
//   const onCreateEvent = eventData => {
//     createEvent(eventData)
//       .then(newEvent => {
//         console.log(newEvent);
//         setEvents([newEvent, ...events]);
//         closeModal();
//       })
//       .catch(error => {
//         alert(error);
//       });
//   };

//   const onDeleteEvent = () => {
//     deleteEvent(currentEvent.id)
//       .then(event => {
//         const filteredEvents = events.filter(e => e.id !== event.id);
//         setEvents(filteredEvents);
//       })
//       .catch(error => alert(error));
//   };
//   const fetchEvents = () => {
//     getEvents()
//       .then(events => setEvents(events))
//       .catch(e => {
//         console.log(error);
//         alert(e);
//       });
//   };

//   useEffect(() => {
//     fetchEvents();

//     const intervaiId = setInterval(() => {
//       if (new Date().getSeconds() === 0) setWeek(generateWeekRange(getWeekStartDate(new Date())));
//     }, 1000);
//     return () => clearInterval(intervaiId);
//   }, []);

//   const onUpdateEvent = eventData => {
//     updateEvent(eventData)
//       .then(updatedEvent => {
//         const updatedEvents = events.map(event => {
//           if (event.id === updatedEvent.id) {
//             event = eventData;
//           }
//           return event;
//         });
//         setEvents(updatedEvents);
//         closeModal();
//       })
//       .catch(error => {
//         console.log(error);
//         alert(error);
//       });
//   };

//   return (
//     <>
//       <Header
//         monthShown={getMonthShown(week[0])}
//         prevHandler={prevHandler}
//         nextHandler={nextHandler}
//         setIsHidden={setIsHidden}
//         todayHandler={todayHandler}
//       />
//       <Calendar
//         setIsHidden={setIsHidden}
//         nextHandler={nextHandler}
//         weekDates={weekDates}
//         events={events}
//         isHidden={isHidden}
//         setCurentEvent={setCurentEvent}
//         currentEvent={currentEvent}
//       />
//       <Modal
//         isHidden={isHidden}
//         setIsHidden={setIsHidden}
//         onUpdateEvent={onUpdateEvent}
//         onCreateEvent={onCreateEvent}
//         events={events}
//         currentEvent={currentEvent}
//       />
//     </>
//   );
// };

// export default App;
