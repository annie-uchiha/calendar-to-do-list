// src/App.js
import React, { useState } from 'react';
import Calendar from './components/Calendar';
import TaskPopup from './components/TaskPopup';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskPopup, setShowTaskPopup] = useState(false);

  const addEvent = (date, event) => {
    setEvents([...events, { date, event, done: false }]);
  };

  const toggleTask = (task) => {
    const updatedEvents = events.map(e => e === task ? { ...e, done: !e.done } : e);
    setEvents(updatedEvents);
  };

  return (
    <div className="app">
      <Calendar
        events={events}
        onDayClick={day => {
          setSelectedDate(day);
          setShowTaskPopup(true);
        }}
        addEvent={addEvent}
      />
      {showTaskPopup && (
        <TaskPopup
          selectedDate={selectedDate}
          events={events}
          onClose={() => setShowTaskPopup(false)}
          toggleTask={toggleTask}
        />
      )}
    </div>
  );
};

export default App;
