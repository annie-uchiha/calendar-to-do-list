import React from 'react';
import { format, isSameDay } from 'date-fns';
import '../styles/CalendarDay.scss';

const CalendarDay = ({ day, formattedDate, events, onDayClick }) => {
  const hasEvent = events.some(event => isSameDay(new Date(event.date), day));
  
  return (
    <div className={`day-wrapper ${hasEvent ? 'has-event' : ''}`} onClick={() => onDayClick(day)}>
      {formattedDate}
    </div>
  );
};

export default CalendarDay;
