import React, { ChangeEvent, useState } from 'react';
import { ITask } from './interfaces';
import './App.css';
import TodoTask from './components/TodoTask';
import { firestore } from './firebase';


const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await firestore.collection('tasks').add({
        taskName: task,
        deadline: deadline,
        completed: false
      });
      console.log('Task added successfully!');
      setTask('');
      setDeadline(0); // Reset deadline to number
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  };

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
      completed: false
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

  const toggleTaskCompletion = (taskNameToToggle: string): void => {
    setTodo(todo.map((task) => {
      if (task.taskName === taskNameToToggle) {
        return { ...task, completed: !task.completed }; // Toggle the completion status
      }
      return task;
    }));
  };

  return (
    <>
      <h1 className='title'>TODO LIST'AS</h1>
      <div className='App'>
        <div className='header'>
          <form onSubmit={handleSubmit}> {/* Add onSubmit event to the form */}
            <div className='inputContainer'>
              <input className='input-text' type='text' name='task' placeholder='Išsikelti sau tikslą...' value={task} onChange={handleChange} />
              <input className='input-number' type='number' name='deadline' min="0" placeholder='Nustatyti terminą (dienos)' value={deadline} onChange={handleChange} />
              <button className='addBtn' type="submit">Pridėti</button> {/* Change onClick to type="submit" */}
            </div>
          </form>
        </div>
        <div className='todoList'>
          {todo.map((task: ITask, key: number) => (
            <TodoTask key={key} task={task} completeTask={completeTask} toggleTaskCompletion={toggleTaskCompletion} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
