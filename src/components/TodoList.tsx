import React, {ChangeEvent} from 'react';
import {filterType, TaskType} from "../App";
import {AddItemComponent} from "./AddItemComponent";
import {EditableSpan} from "./EditableSpan";


type TodoListPropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListId: string) => void
    setTasksFilter: (value: filterType, todoListsId: string) => void
    addTask: (title: string, todoListsId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListsId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListsId: string) => void
    changeTodoListTitle: (newTitle: string, todoListsId: string) => void
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
        changeTaskTitle,
        setTasksFilter,
        filter,
        addTask,
        removeTasksList,
        changeTodoListTitle
    }) => {

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

        const changeTaskTitleHandler = (newTitle: string) => {
            changeTaskTitle(task.id, newTitle, id)
        }

        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeTaskStatusHandler}/>
                <EditableSpan title={task.title}
                              isDone={task.isDone}
                              changeTitle={changeTaskTitleHandler}/>
                <button onClick={onRemoveTaskClickHandler}>
                    x
                </button>
            </li>

        )
    })

    const onAddTaskClickHandler = (title: string) => {
        addTask(title, id)
    }
    const onSetFilterHandler = (value: filterType) => {
        setTasksFilter(value, id)
    }
    const removeTasksListOnClickHandler = () => {
        removeTasksList(id)
    }

    const changeTodoListTitleHandler = (newTitle: string) => {
        changeTodoListTitle(newTitle, id)
    }

    return (
        <div className={todoClasses}>
            <h3><EditableSpan title={title} changeTitle={changeTodoListTitleHandler}/>
                <button onClick={removeTasksListOnClickHandler}>X</button>
            </h3>
            <AddItemComponent addItem={onAddTaskClickHandler}/>
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

