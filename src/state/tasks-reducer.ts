import {AddTodoListActionType, RemoveTodoListActionType, setTodoListsACActionType} from "./todolist-reducer";
import {TaskType, todoListsApi, updateTaskModelType} from "../api/todolists-api";
import {AppThunk} from "./store";

type setTasksActionType = ReturnType<typeof setTasksAC>
type removeTaskActionType = ReturnType<typeof removeTaskAC>
type addTasksActionType = ReturnType<typeof addTaskAC>

type changeTaskActionType = ReturnType<typeof changeTaskAC>


export type TasksReducerActionType =
    removeTaskActionType |
    addTasksActionType |
    AddTodoListActionType |
    RemoveTodoListActionType |
    setTasksActionType |
    setTodoListsACActionType |
    changeTaskActionType


export type TasksType = {
    [todoListsId: string]: TaskType[]
}

const initialState: TasksType = {}


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


export const changeTaskAC = (taskId: string, todoListsId: string, model: updateTaskModelType) => ({
    type: 'CHANGE-TASK', taskId, todoListsId, model
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
            if (data.resultCode === 0) {
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
type updateTaskModelForTC = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todoListId: string, taskId: string, modelUpdate: updateTaskModelForTC): AppThunk => (dispatch, getState) => {
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
    todoListsApi.updateTask(todoListId, taskId, model)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(changeTaskAC(taskId, todoListId, model))
            }
        })
}