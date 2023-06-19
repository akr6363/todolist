import {TaskType, todoListsApi, TodolistType} from "../api/todolists-api";
import {AppThunk} from "./store";
import {setTasksAC} from "./tasks-reducer";

export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type initialAppStateType = {
    error: null | string
    status: statusType
}

const initialState = {
    error: null,
    status: 'idle' as statusType
}

export const appReducer = (state: initialAppStateType = initialState, action: AppStateActionsType): initialAppStateType => {
    switch (action.type) {
        case 'SET-STATUS':
            return {...state, status: action.status}
        case 'SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions

 export const setErrorAC = (error: string | null) =>
     ({type: 'SET-ERROR', error} as const)

export const setStatusAC = (status: statusType) =>
    ({type: 'SET-STATUS', status} as const)


//types

export type AppStateActionsType = ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC>