import axios, {AxiosResponse} from "axios";
import {number} from "prop-types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    // headers: {
    //     'api-key': '18f6704c-b342-412b-afac-2949b9a3d1f5'
    // }
})

export type loginRequestType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}

export const authApi = {
    login(data: loginRequestType) {
        return instance
            .post <ResponseType<{ userId?: number }>>('/auth/login', data)
            .then((response) => {
                return response.data
            })
    },
    logout() {
        return instance
            .delete <ResponseType>('/auth/login')
            .then((response) => {
                return response.data
            })
    },
    me() {
        return instance
            .get<ResponseType<{  id: number, email: string, login: string }>>('/auth/me')
            .then((response) => {
                return response.data
            })
    }
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
                return response.data
            })
    },
}

//types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<R = {}> = {
    data: R
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
export type updateTaskModelType = {
    title: string
    description: string | null
    status: TasksStatuses
    priority: TasksPriorities
    startDate: string | null
    deadline: string | null
}

export enum TasksStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TasksPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
    ERROR_CAPTCHA = 10,
}

export type TaskType = {
    addedDate: string
    deadline: null | string
    description: null | string
    id: string
    order: number
    priority: TasksPriorities
    startDate: null | string
    status: TasksStatuses
    title: string
    todoListId: string
}
type ResponseOnGetTaskType = {
    error: string
    totalCount: number
    items: TaskType[]
}