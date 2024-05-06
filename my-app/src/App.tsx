
import React, { ChangeEvent, useState, useEffect } from 'react';
import { ITask } from './interfaces';
import './App.css';
import TodoTask from './components/TodoTask';
import mongoose from 'mongoose';



const App: React.FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

 

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
   if(event.target.name === 'task') {
    setTask(event.target.value);
   } else {
    setDeadline(Number(event.target.value));
   }
  }

  const addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask = {
      taskName: task,
      deadline: deadline,
      completed: false
    }
    setTodo([...todo, newTask]);
    setTask("");
    setDeadline(0);
  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodo(todo.filter((task) => {
      return task.taskName !== taskNameToDelete;
    }));
  }

  const toggleTaskCompletion = (taskNameToToggle: string): void => {
    setTodo(todo.map((task) => {
      if (task.taskName === taskNameToToggle) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  return (
    <div>
      <h1 className='title'>TODO LIST'AS</h1>
      <div className='App'>
        <div className='header'>
          <form onSubmit={addTask}>
            <div className='inputContainer'>
              <input className='input-text' type='text' name='task' placeholder='Išsikelti sau tikslą...' value={task} onChange={handleChange} />
              <input className='input-number' type='number' name='deadline' min="0" placeholder='Nustatyti terminą (dienos)' value={deadline} onChange={handleChange} />
              <button className='addBtn' type="submit" >Pridėti</button>
            </div>
          </form>
        </div>
        <div className='todoList'>
          {todo.map((task: ITask, key: number) => (
            <TodoTask key={key} task={task} completeTask={completeTask} toggleTaskCompletion={toggleTaskCompletion} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
