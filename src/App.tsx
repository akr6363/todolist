import React from 'react';
import './App.css';
import TodoList, {TasksType} from "./components/TodoList";



function App(): JSX.Element {

    const tasks: TasksType[] = [
        {id:1, title: 'HTML', isDone: true},
        {id:2, title: 'CSS', isDone: true},
        {id:3, title: 'JS', isDone: false},
    ]
    const tasks2: TasksType[] = [
        {id:1, title: 'HTML', isDone: false},
        {id:2, title: 'CSS', isDone: false},
        {id:3, title: 'JS', isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks}/>
            <TodoList title={'What to buy'} tasks={tasks2}/>
            {/*<TodoList title={'What to read'}/>*/}
        </div>
    );
}

export default App;
