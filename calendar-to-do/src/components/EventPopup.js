import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/EventPopup.scss';

const EventPopup = ({ date, events, onClose, onAddEvent, onToggleTask }) => {
  const [newEvent, setNewEvent] = useState('');

  const handleAddEvent = () => {
    if (newEvent.trim()) {
      onAddEvent({ text: newEvent, done: false });
      setNewEvent('');
    }
  };

  return (
    <div className="event-popup">
      <div className="popup-content">
        <h2>Events on {date}</h2>
        <ul>
          {events && events.map((event, index) => (
            <li key={index} className={event.done ? 'done' : ''}>
              <span onClick={() => onToggleTask(index)}>{event.text}</span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="Add a new event"
        />
        <button onClick={handleAddEvent}>Add Event</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

EventPopup.propTypes = {
  date: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ),
  onClose: PropTypes.func.isRequired,
  onAddEvent: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
};

export default EventPopup;
