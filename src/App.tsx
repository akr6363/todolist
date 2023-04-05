import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import {AddItemComponent} from "./components/AddItemComponent";

export type TodoLIstType = {
    id: string
    title: string
    filter: filterType
}
export type filterType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksType = {
    [todoListsId: string]: TaskType[]
}

function App(): JSX.Element {

    const todoListsId_1 = v1()
    const todoListsId_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoLIstType[]>([
        {id: todoListsId_1, title: 'What to learn', filter: 'all'},
        {id: todoListsId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todoListsId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListsId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cheese', isDone: true},
        ],
    })

    function removeTask(taskId: string, todoListsId: string) {
        let newTasksList = tasks[todoListsId].filter((task) => task.id !== taskId)
        setTasks({...tasks, [todoListsId]: newTasksList})
    }

    function addTask(title: string, todoListsId: string) {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        let newTasksList = [newTask, ...tasks[todoListsId]]
        setTasks({...tasks, [todoListsId]: newTasksList})
    }

    function setTasksFilter(value: filterType, todoListsId: string) {
        setTodoLists(todoLists
            .map((tl) => tl.id === todoListsId ? {...tl, filter: value} : tl))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListsId: string) {
        let updateTasks = tasks[todoListsId]
            .map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        setTasks({...tasks, [todoListsId]: updateTasks})
    }

    function changeTaskTitle(taskId: string, title: string, todoListsId: string) {
        let updateTasks = tasks[todoListsId]
            .map(task => task.id === taskId ? {...task, title: title} : task)
        setTasks({...tasks, [todoListsId]: updateTasks})
    }

    const changeTodoListTitle = (newTitle: string, todoListsId: string) => {
        setTodoLists(todoLists
            .map(tl => tl.id === todoListsId
                ? {...tl, title: newTitle}
                : tl))

    }


    function getTasksForRender(tasksList: Array<TaskType>, filterValue: filterType) {
        switch (filterValue) {
            case 'active':
                return tasksList.filter((task) => !task.isDone)
            case 'completed':
                return tasksList.filter((task) => task.isDone)
            default:
                return tasksList
        }
    }

    function removeTasksList(todoListsId: string) {
        setTodoLists(todoLists.filter((tl) => tl.id !== todoListsId))
        delete tasks[todoListsId]
    }

    function addTodoList(title: string) {
        const newTodoList: TodoLIstType = {id: v1(), title: title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }


    return (
        <div className="App">
            <AddItemComponent addItem={addTodoList}/>
            {todoLists.map(tl => {
                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={getTasksForRender(tasks[tl.id], tl.filter)}
                        filter={tl.filter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        setTasksFilter={setTasksFilter}
                        removeTasksList={removeTasksList}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
