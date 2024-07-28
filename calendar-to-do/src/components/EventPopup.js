import React, { useState } from 'react';
import '../styles/EventPopup.scss';

const EventPopup = ({ selectedDate, onClose, addEvent }) => {
  const [event, setEvent] = useState('');

  const handleAddEvent = () => {
    addEvent(selectedDate, event);
    onClose();
  };

  return (
    <div className="popup-wrapper">
      <h2>Add Event</h2>
      <input
        type="text"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
        placeholder="Event"
      />
      <button onClick={handleAddEvent}>Add</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EventPopup;
