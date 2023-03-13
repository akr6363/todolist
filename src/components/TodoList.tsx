import React, {ChangeEvent, useState} from 'react';
import {filterType, TasksType} from "../App";


type TodoListPropsType = {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (taskId: string) => void
    setTasksFilter: (value: filterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: filterType
}


const TodoList: React.FC<TodoListPropsType> = (props) => {

    let [inputValue, setInputValue] = useState('')
    let [error, setError] = useState<string | null>(null)


    let isAllTasksNotDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotDone = false;
            break;
        }
    }

    const todoClasses = isAllTasksNotDone ? "todolist-empty" : "todolist"

    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {

        const onRemoveTaskClickHandler = () => props.removeTask(task.id)
        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        }

        return (
            <li className={task.isDone ? 'is-done' : ''}
                key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeTaskStatusHandler}/>
                <span>{task.title}</span>
                <button onClick={onRemoveTaskClickHandler}>x
                </button>
            </li>

        )
    })

    const maxTitleLength = 20

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setError(null)
        if (event.currentTarget.value.length > maxTitleLength) {
            setError('Title is too long!!!')
        }
        if (event.currentTarget.value.trim().length === 0) {
            setError('Title can not be empty')
        }
    }


    const onKeyUpAddTaskHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            onAddTaskClickHandler()
        }
    }


    const onAddTaskClickHandler = () => {
        if (!error) {
            props.addTask(inputValue.trim())
            setInputValue('')
        }
    }

    const onSetFilterHandler = (value: filterType) => {
        props.setTasksFilter(value)
    }

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input className={`input ${error && 'error-input'}`}
                       placeholder={'Enter task title, please'}
                       value={inputValue}
                       onChange={onChangeInputValueHandler}
                       onKeyUp={onKeyUpAddTaskHandler}/>

                <button disabled={inputValue.length === 0}
                        onClick={onAddTaskClickHandler}>
                    +
                </button>
                {error && <div className={'error'}>{error}</div>}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => {
                            onSetFilterHandler('all')
                        }}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => {
                            onSetFilterHandler('active')
                        }}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => {
                            onSetFilterHandler('completed')
                        }}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;