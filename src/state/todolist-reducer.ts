import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";


export type setTodoListsACActionType = ReturnType<typeof setTodoListsAC>
export type setTasksFilterActionType = ReturnType<typeof setTasksFilterAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>

export type ActionsType =
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

export const todoListReducer = (state: TodolistBLLType[] = initialState, action: ActionsType): TodolistBLLType[] => {
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
            const newTodoList: TodolistBLLType = {id: action.id, title: action.title, filter: 'all', addedDate: '', order: 0}
            return [newTodoList, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state
                .map(tl => tl.id === action.todoListsId
                    ? {...tl, title: action.newTitle}
                    : tl)
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl=> ({...tl, filter: 'all'}))

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

export const removeTodoListAC = (todoListsId: string) => ({
    type: 'REMOVE-TODOLIST',
    todoListsId

} as const)
export const addTodoListAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    id: v1(),
    title
} as const)
export const changeTodoListTitleAC = (newTitle: string, todoListsId: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    newTitle,
    todoListsId
} as const)