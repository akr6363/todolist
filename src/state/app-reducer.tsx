import {AppThunk} from "./store";
import {Dispatch} from "redux";
import {authApi, ResultCode, TodolistType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/errors-utils";
import {setIsLoggedInAC, setIsLoggedInActionType} from "./auth-reducer";
import {number} from "prop-types";

export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    error: null as null | string,
    status: 'idle' as statusType,
    isInitialized: false
}

export type initialAppStateType = typeof initialState

export const appReducer = (state: initialAppStateType = initialState, action: AppStateActionsType): initialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
         case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isAuth}
        default:
            return state
    }
}

//actions
export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', error} as const)

export const setAppStatusAC = (status: statusType) =>
    ({type: 'APP/SET-STATUS', status} as const)

export const setInitializedAC = (isAuth: boolean) =>
    ({type: 'APP/SET-INITIALIZED', isAuth} as const)

//thinks



//types
export type AppStateActionsType =
    ReturnType<typeof setAppErrorAC> |
    ReturnType<typeof setAppStatusAC> |
    setIsLoggedInActionType |
     ReturnType<typeof setInitializedAC>
