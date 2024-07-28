import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CalendarDay.scss';

const CalendarDay = ({ day, hasEvent, onDayClick }) => {
  return (
    <div className={`calendar-day ${hasEvent ? 'has-event' : ''}`} onClick={onDayClick}>
      {day}
    </div>
  );
};

CalendarDay.propTypes = {
  day: PropTypes.number.isRequired,
  hasEvent: PropTypes.bool.isRequired,
  onDayClick: PropTypes.func.isRequired,
};

export default CalendarDay;
