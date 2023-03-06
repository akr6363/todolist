import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from "./components/TodoList";

export type filterType = 'all' | 'active' | 'completed'

function App(): JSX.Element {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    let [filter, setFilter] = useState<filterType>('all')


    function removeTask(taskId: number) {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }

    function setTasksFilter(value: filterType) {
        setFilter(value)
    }

    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = tasksForRender.filter((task) => !task.isDone)
    }
    if (filter === 'completed') {
        tasksForRender = tasksForRender.filter((task) => task.isDone)
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      setTasksFilter={setTasksFilter}/>
        </div>
    );
}

export default App;
