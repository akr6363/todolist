import {v1} from "uuid";
import {
    AddTodoListActionType,
    deleteTodoListAC,
    RemoveTodoListActionType,
    setTodoListsACActionType
} from "./todolist-reducer";
import {TasksStatuses, TaskType, todoListsApi} from "../api/todolists-api";
import {AppThunk} from "./store";

type setTasksActionType = ReturnType<typeof setTasksAC>
type removeTaskActionType = ReturnType<typeof removeTaskAC>
type addTasksActionType = ReturnType<typeof addTaskAC>
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


export type TasksReducerActionType =
    removeTaskActionType |
    addTasksActionType |
    changeTaskStatusActionType |
    changeTaskTitleActionType |
    AddTodoListActionType |
    RemoveTodoListActionType |
    setTasksActionType |
    setTodoListsACActionType


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
            return {
                ...state,
                [action.todoListsId]: [action.task, ...state[action.todoListsId]]
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
                [action.todoList.id]: []
            }
        case 'REMOVE-TODOLIST':
            const {[action.todoListsId]: deletedTodoList, ...rest} = state
            return rest
        case 'SET-TODOLISTS':
            const stateCopy = {...state}
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = [];
            });
            return stateCopy

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
export const addTaskAC = (task: TaskType, todoListsId: string) => ({
    type: 'ADD-TASK', task, todoListsId
} as const)
export const changeTaskStatusAC = (taskId: string, todoListsId: string, isDone: boolean) => ({
    type: 'CHANGE-TASK-STATUS', taskId, todoListsId, isDone
} as const)
export const changeTaskTitleAC = (taskId: string, todoListsId: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE', taskId, todoListsId, title
} as const)

export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    todoListsApi.getTasks(todolistId)
        .then(data => {
            dispatch(setTasksAC(todolistId, data.items))
        })
}

export const removeTaskTC = (todoListId: string, taskId: string): AppThunk => (dispatch) => {
    todoListsApi.deleteTask(todoListId, taskId)
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todoListId))
            }
        })
}

export const addTaskTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
    todoListsApi.addTask(todoListId, title)
        .then(data => {
           dispatch(addTaskAC(data.data.item, todoListId))
        })
}