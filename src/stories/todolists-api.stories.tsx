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
    useEffect(() => {
        todoListsApi.addTodoList('new todo')
            .then((data) => setState(data.data.item))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.deleteTodoList('a803b8f8-1226-41c7-b1bd-5084057c9e5f')
            .then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
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
        todoListsApi.getTasks('cd20dab3-66d1-4560-b05f-3f3c79066afe')
            .then((data) => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.addTask('cd20dab3-66d1-4560-b05f-3f3c79066afe','new task')
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

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    const body = {
        title: 'eeeeeeeeeeeeeee',
        description: null,
        completed: true,
        status: 0,
        priority: 1,
        startDate:  null,
        deadline: null,
    }
    useEffect(() => {
        todoListsApi.updateTask('cd20dab3-66d1-4560-b05f-3f3c79066afe', 'e2592968-6b91-42e2-b69d-3e02447ca8e6', body)
            .then((data) => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}