import React from 'react';
import {filterType} from "../App";




type TodoListPropsType = {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (taskId: number) => void
    setTasksFilter: (value: filterType) => void
}

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    let isAllTasksNotDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone === true) {
            isAllTasksNotDone = false;
            break;
        }
    }

    const todoClasses = isAllTasksNotDone ? "todolist-empty" : "todolist"

    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => {props.removeTask(task.id)}}>x</button>
            </li>

        )
    })
    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button onClick={()=>{props.setTasksFilter('all')}}>All</button>
                <button onClick={()=>{props.setTasksFilter('active')}}>Active</button>
                <button onClick={()=>{props.setTasksFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;