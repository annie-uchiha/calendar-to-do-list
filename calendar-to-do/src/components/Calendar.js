import React, { useState } from 'react';
import CalendarDay from './CalendarDay';
import EventPopup from './EventPopup';
import '../styles/Calendar.scss';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Calendar = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const onDayClick = (day, month, year) => {
    setSelectedDate(`${day} ${months[month]} ${year}`);
    setShowPopup(true);
  };

  const addEvent = (date, event) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [date]: [...(prevEvents[date] || []), event],
    }));
  };

  const toggleTaskDone = (date, index) => {
    setEvents((prevEvents) => {
      const newEvents = { ...prevEvents };
      newEvents[date][index].done = !newEvents[date][index].done;
      return newEvents;
    });
  };

  const changeMonth = (increment) => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth + increment;
      let newYear = currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const renderDays = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }).map((_, index) => {
      const day = index + 1;
      const dateKey = `${day} ${months[month]} ${year}`;
      const hasEvent = events[dateKey] && events[dateKey].length > 0;
      return (
        <CalendarDay
          key={day}
          day={day}
          hasEvent={hasEvent}
          onDayClick={() => onDayClick(day, month, year)}
        />
      );
    });
  };

  return (
    <div className="calendar-wrapper">
      <div className="month-navigation">
        <button onClick={() => changeMonth(-1)}>Previous</button>
        <h2>{months[currentMonth]} {currentYear}</h2>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>
      <div className="days-wrapper">
        {renderDays(currentMonth, currentYear)}
      </div>
      <div className="mini-calendars">
        <div className="mini-calendar">
          <h3>Previous Month</h3>
          <div className="days-wrapper">
            {renderDays((currentMonth - 1 + 12) % 12, currentYear - (currentMonth === 0 ? 1 : 0))}
          </div>
        </div>
        <div className="mini-calendar">
          <h3>Next Month</h3>
          <div className="days-wrapper">
            {renderDays((currentMonth + 1) % 12, currentYear + (currentMonth === 11 ? 1 : 0))}
          </div>
        </div>
      </div>

      {showPopup && selectedDate && (
        <EventPopup
          date={selectedDate}
          events={events[selectedDate]}
          onClose={() => setShowPopup(false)}
          onAddEvent={(event) => addEvent(selectedDate, event)}
          onToggleTask={(index) => toggleTaskDone(selectedDate, index)}
        />
      )}
    </div>
  );
};

export default Calendar;
