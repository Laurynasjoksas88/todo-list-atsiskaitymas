import React from "react";
import { ITask } from "../interfaces";


interface Props {
    task: ITask;
    completeTask(taskNameToDelete: string): void;
    toggleTaskCompletion(taskNameToToggle: string): void;
}

const TodoTask = ({ task, completeTask, toggleTaskCompletion }: Props) => {
    return (
        <div className={`task ${task.completed ? "completed" : ""}`}>
            <div className="content">
                <input className="checkbox-container"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.taskName)} 
                />
                <span className="job-text">Užduotis: {task.taskName}</span>
                <span className="deadline-text"> Dienų terminas: {task.deadline} </span>
            </div>
            <button className="deleteBtn" onClick={() => completeTask(task.taskName)}>
                Ištrinti
            </button>
        </div>
    );
};

export default TodoTask;


