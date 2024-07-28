import React from 'react';
import styled from 'styled-components';

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid black;
  z-index: 1000;
`;

const TaskItem = styled.div`
  text-decoration: ${({ done }) => (done ? 'line-through' : 'none')};
`;

const TaskPopup = ({ selectedDate, events, onClose, toggleTask }) => {
  const tasks = events.filter(event => event.date === selectedDate.toString());

  return (
    <PopupWrapper>
      <h2>Tasks for {selectedDate.toString()}</h2>
      {tasks.map((task, index) => (
        <TaskItem key={index} done={task.done}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task)}
          />
          {task.event}
        </TaskItem>
      ))}
      <button onClick={onClose}>Close</button>
    </PopupWrapper>
  );
};

export default TaskPopup;
