import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";

export type filterType = 'all' | 'active' | 'completed'

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

function App(): JSX.Element {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    let [filter, setFilter] = useState<filterType>('all')

    function removeTask(taskId: string) {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }

    function addTask(title: string) {
        let newTask: TasksType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    function setTasksFilter(value: filterType) {
        setFilter(value)
    }

    function changeTaskStatus(taskId: string, isDone: boolean) {
        let updateTasks = tasks.map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        setTasks(updateTasks)
    }

    function getTasksForRender (tasksList: Array<TasksType>, filterValue: filterType) {
        switch (filterValue) {
            case 'active':
                return tasksList.filter((task) => !task.isDone)
            case 'completed':
                return tasksList.filter((task) => task.isDone)
            default:
                return tasksList
        }
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={getTasksForRender(tasks, filter)}
                      removeTask={removeTask}
                      setTasksFilter={setTasksFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}/>
        </div>
    );
}

export default App;
