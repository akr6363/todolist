export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    error: null as null | string,
    status: 'idle' as statusType
}

export type initialAppStateType = typeof initialState

export const appReducer = (state: initialAppStateType = initialState, action: AppStateActionsType): initialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', error} as const)

export const setAppStatusAC = (status: statusType) =>
    ({type: 'APP/SET-STATUS', status} as const)

//types
export type AppStateActionsType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>