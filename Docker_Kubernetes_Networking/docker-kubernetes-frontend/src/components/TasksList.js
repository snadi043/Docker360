import React from 'react';

import './TasksList.css';

function TasksList(props) {
  return (
    <ul>
      {props.tasks && Array.isArray(props.tasks) && props.tasks.map((task) => (
        <li key={task.title}>
          <h2>{task.title}</h2>
          <p>{task.text}</p>
        </li>
      ))}
    </ul>
  );
}

export default TasksList;
