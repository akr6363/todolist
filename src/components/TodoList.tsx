import React, {ChangeEvent, useState} from 'react';
import {filterType, TasksType} from "../App";


type TodoListPropsType = {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (taskId: string) => void
    setTasksFilter: (value: filterType) => void
    addTask: (title: string) => void
}


const TodoList: React.FC<TodoListPropsType> = (props) => {

    let [inputValue, setInputValue] = useState('')


    let isAllTasksNotDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone === true) {
            isAllTasksNotDone = false;
            break;
        }
    }

    const todoClasses = isAllTasksNotDone ? "todolist-empty" : "todolist"

    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {

        const onRemoveTaskClickHandler = () => {
            props.removeTask(task.id)
        }

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onRemoveTaskClickHandler}>x
                </button>
            </li>

        )
    })

    const onAddTaskClickHandler = () => {
        props.addTask(inputValue)
        setInputValue('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            onAddTaskClickHandler()
        }
    }

    const onSetFilterHandler = (value: filterType) => {
        props.setTasksFilter(value)
    }

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}/>
                <button onClick={onAddTaskClickHandler}>+</button>
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button onClick={() => {onSetFilterHandler('all')}}>All</button>
                <button onClick={() => {onSetFilterHandler('active')}}>Active</button>
                <button onClick={() => {onSetFilterHandler('completed')}}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;