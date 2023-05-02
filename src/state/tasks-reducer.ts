import {TasksType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";

// type removeTaskActionType = {
//     type: 'REMOVE-TASK'
//     taskId: string
//     todoListsId: string
// }
// type addTasksActionType = {
//     type: 'ADD-TASK'
//     title: string
//     todoListsId: string
// }
// type changeTaskStatusActionType = {
//     type: 'CHANGE-TASK-STATUS'
//     taskId: string
//     todoListsId: string
//     isDone: boolean
// }
// type changeTaskTitleActionType = {
//     type: 'CHANGE-TASK-TITLE'
//     taskId: string
//     todoListsId: string
//     title: string
// }

type removeTaskActionType = ReturnType<typeof removeTaskAC>
type addTasksActionType = ReturnType<typeof addTaskAC>
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type TasksReducerActionType =
    removeTaskActionType |
    addTasksActionType |
    changeTaskStatusActionType |
    changeTaskTitleActionType |
    AddTodoListActionType |
    RemoveTodoListActionType

export const tasksReducer = (state: TasksType, action: TasksReducerActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListsId]: state[action.todoListsId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todoListsId]: [newTask, ...state[action.todoListsId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListsId]: state[action.todoListsId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListsId]: state[action.todoListsId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.id]: []
            }
        case 'REMOVE-TODOLIST':
            const {[action.todoListsId]: deletedTodoList, ...rest} = state
            return rest
        default:
            throw new Error('Bad action type')
    }
}

export const removeTaskAC = (taskId: string, todoListsId: string) => ({
    type: 'REMOVE-TASK', taskId, todoListsId
}as const)
export const addTaskAC = (title: string, todoListsId: string) => ({
    type: 'ADD-TASK', title, todoListsId
}as const)
export const changeTaskStatusAC = (taskId: string, todoListsId: string, isDone: boolean) => ({
    type: 'CHANGE-TASK-STATUS', taskId, todoListsId, isDone
}as const)
export const changeTaskTitleAC = (taskId: string, todoListsId: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE', taskId, todoListsId, title
}as const)
