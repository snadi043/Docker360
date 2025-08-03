import React, {useCallback, useEffect, useState} from 'react';
import NewTasks from './components/NewTasks';
import TasksList from './components/TasksList';

import './App.css';

const App = () => {
  const [tasks, setTasks] = useState('');

  const fetchTasks = useCallback(() => {
    fetch('', {
      headers: {
        Authorization: 'Bearer abc',
      }
    })
    .then((response) => {return response.json()})
    .then((jsonData) => {setTasks(jsonData.tasks)});
  }, []);

  useEffect(() => {
      fetchTasks();
    }, 
  [fetchTasks]
);

const addTasksHandler = (task) => {
  fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer abc',
    },
    body: JSON.stringify(task),
  }).then((response) => {
    return response.json();
  }).then((resData) => {
    console.log(resData);
  });
}

  return (
    <div className='App'> 
      <section>
        <NewTasks onAddTasks={addTasksHandler}/>
        </section>
        <section>
          <button onClick={fetchTasks}>Fetch Tasks</button>
          <TasksList tasks={tasks}></TasksList>
      </section>
    </div>
  )
}

export default App;
