import React, {ChangeEvent, useState} from 'react';
import {filterType, TasksType, TaskType} from "../App";


type TodoListPropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListId: string) => void
    setTasksFilter: (value: filterType, todoListsId: string) => void
    addTask: (title: string, todoListsId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListsId: string) => void
    removeTasksList: (todoListsId: string) => void
    filter: filterType
}


const TodoList: React.FC<TodoListPropsType> = (
    {
        id,
        title,
        tasks,
        removeTask,
        changeTaskStatus,
        setTasksFilter,
        filter,
        addTask,
        removeTasksList
    }) => {

    let [inputValue, setInputValue] = useState('')
    let [error, setError] = useState<string | null>(null)


    let isAllTasksNotDone = true
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].isDone) {
            isAllTasksNotDone = false;
            break;
        }
    }

    const todoClasses = isAllTasksNotDone ? "todolist-empty" : "todolist"

    const todoListItems: Array<JSX.Element> = tasks.map((task) => {

        const onRemoveTaskClickHandler = () => removeTask(task.id, id)
        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked, id)
        }

        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeTaskStatusHandler}/>
                <span className={task.isDone ? 'is-done' : 'task-title'}>
                    {task.title}
                </span>
                <button onClick={onRemoveTaskClickHandler}>
                    x
                </button>
            </li>

        )
    })

    const maxTitleLength = 20

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setError(null)
        if (event.currentTarget.value.trim().length > maxTitleLength) {
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
            addTask(inputValue.trim(), id)
        }
        setInputValue('')
    }

    const onSetFilterHandler = (value: filterType) => {
        setTasksFilter(value, id)
    }

    const removeTasksListOnClickHandler = () => {
        removeTasksList(id)
    }

    return (
        <div className={todoClasses}>
            <h3>{title}<button onClick={removeTasksListOnClickHandler}>X</button></h3>
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
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={() => {
                            onSetFilterHandler('all')
                        }}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={() => {
                            onSetFilterHandler('active')
                        }}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => {
                            onSetFilterHandler('completed')
                        }}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;