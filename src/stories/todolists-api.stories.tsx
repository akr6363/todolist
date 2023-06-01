import React, {useEffect, useState} from 'react'
import {todoListsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todoListsApi.getTodoLists()
            .then((data) => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const addTodoList = () => {
        todoListsApi.addTodoList(title)
            .then((data) => setState(data))
    }
    // useEffect(() => {
    //
    // }, [])

    return <div>
        {JSON.stringify(state)}
        <input type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={addTodoList}>add todoList</button>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')

    const deleteTodoList = () => {
        todoListsApi.deleteTodoList(todoListId)
            .then((data) => setState(data))
    }

    return <div>
        {JSON.stringify(state)}
        <input type="text" placeholder={'todoList ID'} value={todoListId}
               onChange={(e) => {
                   setTodoListId(e.currentTarget.value)
               }}/>
        <button onClick={deleteTodoList}>delete todo</button>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.updateTodoList('daaaaaaaaaaaaaaaaaaa', 'a7005f45-4faf-4226-bed8-8fb77cc5acd6')
            .then((data) => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todoListsApi.getTasks('95350d0f-1864-4095-95ec-6da3c44ea692')
            .then((data) => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.addTask('95350d0f-1864-4095-95ec-6da3c44ea692', 'new task')
            .then((data) => setState(data.data.item))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.deleteTask('cd20dab3-66d1-4560-b05f-3f3c79066afe', 'd3612c12-cb84-4022-a087-5ba96b519074')
            .then((data) => setState(data))
    }, [])

    return <div>
        {JSON.stringify(state)}
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    const body = {
        title: 'eeeeeeeeeeeeeee',
        description: null,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
    }
    useEffect(() => {
        todoListsApi.updateTask('95350d0f-1864-4095-95ec-6da3c44ea692', '8e94a5a4-d59c-4033-8110-e97c52a06348', body)
            .then((data) => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}