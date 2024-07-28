// src/components/TaskPopup.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TaskPopup.css';

const TaskPopup = ({ selectedDate, events, onClose, onAddEvent, onToggleTask }) => {
  const [newEvent, setNewEvent] = useState('');

  const handleAddEvent = () => {
    onAddEvent(selectedDate, { text: newEvent, done: false });
    setNewEvent('');
  };

  return (
    <div className="task-popup">
      <div className="popup-content">
        <h2>Tasks on {selectedDate}</h2>
        <button onClick={onClose}>Close</button>
        <ul>
          {events && events.map((event, index) => (
            <li key={index} className={event.done ? 'done' : ''}>
              <span onClick={() => onToggleTask(event)}>{event.event}</span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="New task"
        />
        <button onClick={handleAddEvent}>Add Task</button>
      </div>
    </div>
  );
};

TaskPopup.propTypes = {
  selectedDate: PropTypes.string.isRequired,
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

export default TaskPopup;
