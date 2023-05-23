import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'api-key': '18f6704c-b342-412b-afac-2949b9a3d1f5'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<R = {}> = {
    data: R
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

type updateTaskModelType = {
    title: string
    description: string | null
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

type TaskType = {
    addedDate: string
    deadline: null | string
    description: null | string
    id: string
    order: number
    priority: number
    startDate: null | string
    status: number
    title: string
    todoListId: string
}

type ResponseOnGetTaskType = {
    error: string
    totalCount: number
    items: TaskType[]
}

export const todoListsApi = {
    getTodoLists() {
        return instance.get<TodolistType[]>('todo-lists')
            .then((response) => {
                return response.data
            })
    },
    addTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
            .then((response) => {
                return response.data
            })
    },
    deleteTodoList(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
            .then((response) => {
                debugger
                return response.data
            })
    },
    updateTodoList(newTitle: string, id: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: newTitle})
            .then((response) => {
                return response.data
            })
    },
    getTasks(todoListId: string) {
        return instance.get<ResponseOnGetTaskType>(`todo-lists/${todoListId}/tasks`)
            .then((response) => {
                debugger
                return response.data
            })
    },
    addTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title: title})
            .then((response) => {
                return response.data
            })
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
            .then((response) => {
                return response.data
            })

    },
    updateTask(todoListId: string, taskId: string, model: updateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
            .then((response) => {
                debugger
                return response.data
            })
    },
}