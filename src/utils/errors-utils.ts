import {AppStateActionsType, setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError = <R>(data: ResponseType<R>, dispatch: Dispatch<AppStateActionsType>) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError =  (error: { message: string }, dispatch: Dispatch<AppStateActionsType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}