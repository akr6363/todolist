import React from 'react';


type TodoListPropsType = {
    title: string,
    tasks: Array<TasksType>
}

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    let isAllTasksNotDone = true
    for (let i=0; i<props.tasks.length; i++) {
        if(props.tasks[i].isDone === true) {
            isAllTasksNotDone = false;
            break;
        }
    }


    const todoClasses = isAllTasksNotDone ? "todolist-empty" : "todolist"
    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;