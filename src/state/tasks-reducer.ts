import {
    AddTodoListActionType,
    clearTodoDataActionType,
    RemoveTodoListActionType,
    setTodoListsACActionType
} from "./todolist-reducer";
import {ResultCode, TaskType, todoListsApi, updateTaskModelType} from "../api/todolists-api";
import {AppThunk} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errors-utils";

export const tasksReducer = (state: TasksType = {}, action: TasksReducerActionType) => {
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
        case 'CHANGE-TASK':
            return {
                ...state,
                [action.todoListsId]: state[action.todoListsId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
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
        case 'CLEAR-TODOLIST-DATA':
            return {}
        default:
            return state
    }
}

//actions
export const setTasksAC = (todoListsId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', tasks, todoListsId} as const)
export const removeTaskAC = (taskId: string, todoListsId: string) =>
    ({type: 'REMOVE-TASK', taskId, todoListsId} as const)
export const addTaskAC = (task: TaskType, todoListsId: string) =>
    ({type: 'ADD-TASK', task, todoListsId} as const)
export const changeTaskAC = (taskId: string, todoListsId: string, model: updateTaskModelType) =>
    ({type: 'CHANGE-TASK', taskId, todoListsId, model} as const)

//thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListsApi.getTasks(todolistId)
        .then(data => {
            dispatch(setTasksAC(todolistId, data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTaskTC = (todoListId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListsApi.deleteTask(todoListId, taskId)
        .then(data => {
            if (data.resultCode === ResultCode.SUCCESS) {
                dispatch(removeTaskAC(taskId, todoListId))
                dispatch(setAppStatusAC('succeeded'))
            }
            else {
                handleServerAppError(data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListsApi.addTask(todoListId, title)
        .then(data => {
            if (data.resultCode === ResultCode.SUCCESS) {
                dispatch(addTaskAC(data.data.item, todoListId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError<{ item: TaskType }>(data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todoListId: string, taskId: string, modelUpdate: updateTaskModelForTC): AppThunk =>
    (dispatch, getState) => {
        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
            console.warn(`task didn't found in todolist`)
            return
        }

        const model: updateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...modelUpdate
        }
        dispatch(setAppStatusAC('loading'))
        todoListsApi.updateTask(todoListId, taskId, model)
            .then(data => {
                if (data.resultCode === ResultCode.SUCCESS) {
                    dispatch(changeTaskAC(taskId, todoListId, model))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError<{ item: TaskType }>(data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }

//types
type updateTaskModelForTC = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export type TasksReducerActionType =
    ReturnType<typeof setTasksAC> |
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskAC> |
    AddTodoListActionType |
    RemoveTodoListActionType |
    setTodoListsACActionType |
    clearTodoDataActionType

export type TasksType = {
    [todoListsId: string]: TaskType[]
}

