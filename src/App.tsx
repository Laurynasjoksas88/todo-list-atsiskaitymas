import React, { ChangeEvent, useState } from 'react';
import { ITask } from './interfaces';
import './App.css';
import TodoTask from './components/TodoTask';

const App: React.FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'task') {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  }

  const addTask = () => {
    const newTask = {
      taskName: task,
      deadline: deadline,
    }
    setTodo([...todo, newTask]);
    setTask("");
    setDeadline(0);
  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodo(todo.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))
  }



  return (<>
    <h1 className='title'>TODO LIST'AS</h1>
    <div className='App'>
      <div className='header'>
        <div className='inputContainer'>
          <input className='input-text' type='text' name='task' placeholder='Išsikelti sau tikslą...' value={task} onChange={handleChange} />
          <input className='input-number' type='number' name='deadline' placeholder='Nustatyti terminą (dienos)' value={deadline} onChange={handleChange} />
          <button className='addBtn' onClick={addTask}>Pridėti</button>
        </div>
      </div>
      <div className='todoList'>
        {todo.map((task: ITask, key: number) => (
          <TodoTask key={key} task={task} completeTask={completeTask} />
        ))}
      </div>
    </div>
  </>
  );
}

export default App;
