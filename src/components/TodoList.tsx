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

        const onRemoveTaskClickHandler = () => props.removeTask(task.id)

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onRemoveTaskClickHandler}>x
                </button>
            </li>

        )
    })

    const maxTitleLength = 20
    const recommendedTitleLength = 10

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    // const onKeyUpAddTaskHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.ctrlKey && event.key === 'Enter') {
    //         onAddTaskClickHandler()
    //     }
    // }

    //разобраться--------------------------------------------------------------------------

    const isAddTaskNotPossible = inputValue.trim().length === 0 || inputValue.length > maxTitleLength

    const onKeyUpAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (event: React.KeyboardEvent<HTMLInputElement>) => (event.ctrlKey && event.key === 'Enter') && onAddTaskClickHandler()

    //--------------------------------------------------------------

    const isTitleMaybeShorter = (inputValue.length > recommendedTitleLength && inputValue.length <= maxTitleLength)
    const isTitleTooLong = inputValue.length > maxTitleLength

    const onAddTaskClickHandler = () => {
        props.addTask(inputValue)
        setInputValue('')
    }

    const onSetFilterHandler = (value: filterType) => {
        props.setTasksFilter(value)
    }

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input placeholder={'Enter task title, please'}
                       value={inputValue}
                       onChange={onChangeInputValueHandler}
                       onKeyUp={onKeyUpAddTaskHandler}/>

                <button disabled={isAddTaskNotPossible}
                        onClick={onAddTaskClickHandler}>
                    +
                </button>
                {isTitleMaybeShorter && <div style={{color: 'red'}}>Title should be shorter</div>}
                {isTitleTooLong && <div style={{color: 'red'}}>Title is too long!!!</div>}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button onClick={() => {
                    onSetFilterHandler('all')
                }}>All
                </button>
                <button onClick={() => {
                    onSetFilterHandler('active')
                }}>Active
                </button>
                <button onClick={() => {
                    onSetFilterHandler('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;