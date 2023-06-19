import {todoListsApi, TodolistType} from "../api/todolists-api";
import {AppThunk} from "./store";
import {setAppStatusAC, statusType} from "./app-reducer";

export const todoListReducer = (state: TodolistBLLType[] = [], action: TodoListActionsType): TodolistBLLType[] => {
    switch (action.type) {
        case 'SET-TASKS-FILTER':
            return state
                .map((tl) => tl.id === action.todoListsId
                    ? {...tl, filter: action.value}
                    : tl)

        case 'REMOVE-TODOLIST':
            return state
                .filter((tl) => tl.id !== action.todoListsId)

        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state
                .map(tl => tl.id === action.todoListsId
                    ? {...tl, title: action.newTitle}
                    : tl)
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.todoListsId ? {...tl, entityStatus: action.status}: tl)
        default:
            return state
    }
}

//actions
export const setTodoListsAC = (todoLists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', todoLists} as const)
export const setTasksFilterAC = (todoListsId: string, value: filterType) =>
    ({type: 'SET-TASKS-FILTER', todoListsId, value} as const)
export const deleteTodoListAC = (todoListsId: string) =>
    ({type: 'REMOVE-TODOLIST', todoListsId} as const)
export const addTodoListAC = (todoList: TodolistType) =>
    ({type: 'ADD-TODOLIST', todoList} as const)
export const changeTodoListTitleAC = (newTitle: string, todoListsId: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', newTitle, todoListsId} as const)
export const changeTodoListEntityStatusAC = (todoListsId: string, status: statusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', todoListsId, status} as const)

//thunks
export const fetchTodoListsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListsApi.getTodoLists()
        .then(data => {
            dispatch(setTodoListsAC(data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const deleteTodoListsTC = (todoListId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
    todoListsApi.deleteTodoList(todoListId)
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(deleteTodoListAC(todoListId))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodoListEntityStatusAC(todoListId, 'succeeded'))
            }
        })
}
export const addTodoListsTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListsApi.addTodoList(title)
        .then(data => {
            dispatch(addTodoListAC(data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const updateTodoListTitleTC = (title: string, todoListId: string): AppThunk => (dispatch) => {
    todoListsApi.updateTodoList(title, todoListId)
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(title, todoListId))
            }
        })
}

//types
export type setTodoListsACActionType = ReturnType<typeof setTodoListsAC>
export type RemoveTodoListActionType = ReturnType<typeof deleteTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>

export type TodoListActionsType =
    ReturnType<typeof setTasksFilterAC>
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListEntityStatusAC>
    | setTodoListsACActionType

export type filterType = 'all' | 'active' | 'completed'

export type TodolistBLLType = TodolistType & {
    filter: filterType
    entityStatus: statusType
}