import {appReducer, initialAppStateType, setErrorAC, setStatusAC} from "./app-reducer";


let startAppState: initialAppStateType;

beforeEach(() => {
    startAppState = {
        error: null,
        status: 'idle'
    }
})


test('error should be set', () => {
    const endAppState = appReducer(startAppState, setErrorAC('max tasks length 50 symbols'))
    expect(endAppState).toEqual({
        error: 'max tasks length 50 symbols',
        status: 'idle'
    })
})


test('status should be set', () => {
    const endAppState = appReducer(startAppState, setStatusAC('loading'))
    expect(endAppState).toEqual({
        error: null,
        status: 'loading'
    })
})

