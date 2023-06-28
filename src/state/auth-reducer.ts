import {Dispatch} from 'redux'
import {AppStateActionsType, setAppStatusAC, setInitializedAC} from "./app-reducer";
import {authApi, loginRequestType, ResultCode} from "../api/todolists-api";
import {AppThunk} from "./store";
import {handleServerAppError, handleServerNetworkError} from "../utils/errors-utils";
import {removeTaskAC, setTasksAC} from "./tasks-reducer";
import {number} from "prop-types";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: loginRequestType): AppThunk => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await authApi.login(data)
        if (res.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError<{ userId?: number }>(res, dispatch)
        }
    } catch (e) {
        const error = (e as { message: string })
        handleServerNetworkError(error, dispatch)
    }
}

export const logoutTC = (): AppThunk => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logout()
        .then(data => {
            if (data.resultCode === ResultCode.SUCCESS) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(data, dispatch)
            }

        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })

}

export const initializeAppTC = (): AppThunk => (dispatch: Dispatch<AppStateActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.me()
        .then(data => {
            if (data.resultCode === ResultCode.SUCCESS) {
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError<{ id: number, email: string, login: string }>(data, dispatch)
            }
            dispatch(setInitializedAC(true))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


export type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
// types
type ActionsType = setIsLoggedInActionType | AppStateActionsType
