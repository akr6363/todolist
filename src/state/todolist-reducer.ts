import {v1} from "uuid";
import {todoListsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType, AppThunk} from "./store";


export type setTodoListsACActionType = ReturnType<typeof setTodoListsAC>
export type setTasksFilterActionType = ReturnType<typeof setTasksFilterAC>
export type RemoveTodoListActionType = ReturnType<typeof deleteTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>

export type TodoListActionsType =
    setTasksFilterActionType
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | setTodoListsACActionType

export type filterType = 'all' | 'active' | 'completed'

export type TodolistBLLType = TodolistType & {
    filter: filterType
}
// export const todoListsId_1 = v1()
// export const todoListsId_2 = v1()


const initialState: TodolistBLLType[] = [
    // {id: todoListsId_1, title: 'What to learn', filter: 'all'},
    // {id: todoListsId_2, title: 'What to buy', filter: 'all'},
]

export const todoListReducer = (state: TodolistBLLType[] = initialState, action: TodoListActionsType): TodolistBLLType[] => {
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
            return [{...action.todoList, filter: 'all'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state
                .map(tl => tl.id === action.todoListsId
                    ? {...tl, title: action.newTitle}
                    : tl)
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))

        default:
            return state
    }
}

export const setTodoListsAC = (todoLists: TodolistType[]) => ({
    type: 'SET-TODOLISTS',
    todoLists,
} as const)

export const setTasksFilterAC = (todoListsId: string, value: filterType) => ({
    type: 'SET-TASKS-FILTER',
    todoListsId,
    value,
} as const)

export const deleteTodoListAC = (todoListsId: string) => ({
    type: 'REMOVE-TODOLIST',
    todoListsId

} as const)
export const addTodoListAC = (todoList: TodolistType) => ({
    type: 'ADD-TODOLIST',
    todoList
} as const)
export const changeTodoListTitleAC = (newTitle: string, todoListsId: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    newTitle,
    todoListsId
} as const)


export const fetchTodoListsTC = (): AppThunk => (dispatch) => {
    todoListsApi.getTodoLists()
        .then(data => {
            dispatch(setTodoListsAC(data))
        })
}

// export const _asFetchTodoListsTC = (): AppThunk => async dispatch => {
//     try {
//         const data = await todoListsApi.getTodoLists()
//         dispatch(setTodoListsAC(data))
//     } catch (e: any) {
//         throw new Error(e)
//     }
// }

export const deleteTodoListsTC = (todoListId: string): AppThunk => (dispatch) => {
    todoListsApi.deleteTodoList(todoListId)
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(deleteTodoListAC(todoListId))
            }
        })
}

export const addTodoListsTC = (title: string): AppThunk => (dispatch) => {
    todoListsApi.addTodoList(title)
        .then(data => {
            dispatch(addTodoListAC(data.data.item))
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