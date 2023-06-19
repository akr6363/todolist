import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer, TasksReducerActionType} from "./tasks-reducer";
import {TodoListActionsType, todoListReducer} from "./todolist-reducer";
import thunkMiddleWare, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, AppStateActionsType} from "./app-reducer";

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer
})

// export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleWare))

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

type AppActionsType = TodoListActionsType | TasksReducerActionType | AppStateActionsType

// @ts-ignore
window.store = store