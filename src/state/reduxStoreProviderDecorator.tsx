import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListReducer} from "./todolist-reducer";
import {v1} from "uuid";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer,
    app: appReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: 0, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
            {
                id: v1(), title: "JS", status: 0, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: 0, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
            {
                id: v1(), title: "React Book", status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            }
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = legacy_createStore
(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
