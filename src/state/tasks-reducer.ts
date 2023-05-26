import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";
import {TasksStatuses, TaskType} from "../api/todolists-api";

type setTasksActionType = ReturnType<typeof setTasksAC>
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
    RemoveTodoListActionType |
    setTasksActionType


export type TasksType = {
    [todoListsId: string]: TaskType[]
}

const initialState: TasksType = {
    // [todoListsId_1]: [
    //     {id: v1(), title: 'HTML', isDone: true},
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: false},
    //     {id: v1(), title: 'Redux', isDone: false},
    // ],
    // [todoListsId_2]: [
    //     {id: v1(), title: 'Milk', isDone: true},
    //     {id: v1(), title: 'Cheese', isDone: true},
    // ],
}


export const tasksReducer = (state: TasksType = initialState, action: TasksReducerActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListsId]: state[action.todoListsId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType =
                {
                    id: v1(),
                    title: action.title,
                    status: 0,
                    todoListId: action.todoListsId,

                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: 0,
                    startDate: '',
                }
            return {
                ...state,
                [action.todoListsId]: [newTask, ...state[action.todoListsId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListsId]: state[action.todoListsId]
                    .map(t => t.id === action.taskId ? {
                        ...t,
                        status: action.isDone ? TasksStatuses.Completed : TasksStatuses.New
                    } : t)
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

        case 'SET-TASKS':
            return {...state, [action.todoListsId]: action.tasks}

        default:
            return state
    }
}

export const setTasksAC = (todoListsId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS', tasks, todoListsId
} as const)

export const removeTaskAC = (taskId: string, todoListsId: string) => ({
    type: 'REMOVE-TASK', taskId, todoListsId
} as const)
export const addTaskAC = (title: string, todoListsId: string) => ({
    type: 'ADD-TASK', title, todoListsId
} as const)
export const changeTaskStatusAC = (taskId: string, todoListsId: string, isDone: boolean) => ({
    type: 'CHANGE-TASK-STATUS', taskId, todoListsId, isDone
} as const)
export const changeTaskTitleAC = (taskId: string, todoListsId: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE', taskId, todoListsId, title
} as const)
