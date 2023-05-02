import {filterType, TodoLIstType} from "../App";
import {v1} from "uuid";



// export type setTasksFilterActionType = {
//     type: 'SET-TASKS-FILTER'
//     todoListsId: string
//     value: filterType
// }
// export type RemoveTodoListActionType = {
//     type: 'REMOVE-TODOLIST'
//     todoListsId: string
// }
// export type AddTodoListActionType = {
//     type: 'ADD-TODOLIST'
//     id: string
//     title: string
// }
// export type ChangeTodoListTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE'
//     newTitle: string
//     todoListsId: string
// }

export type setTasksFilterActionType = ReturnType<typeof setTasksFilterAC>
export type RemoveTodoListActionType= ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType= ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>

export type ActionsType =
    setTasksFilterActionType
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType

export const todoListsId_1 = v1()
export const todoListsId_2 = v1()


const initialState: TodoLIstType[] = [
    {id: todoListsId_1, title: 'What to learn', filter: 'all'},
    {id: todoListsId_2, title: 'What to buy', filter: 'all'},
]

export const todoListReducer = (state: TodoLIstType[] = initialState, action: ActionsType): TodoLIstType[] => {
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
            const newTodoList: TodoLIstType = {id: action.id, title: action.title, filter: 'all'}
            return [newTodoList, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state
                .map(tl => tl.id === action.todoListsId
                    ? {...tl, title: action.newTitle}
                    : tl)
        default:
            return state
    }
}

export const setTasksFilterAC = (todoListsId: string, value: filterType) => ({
    type: 'SET-TASKS-FILTER',
    todoListsId,
    value,
} as const)

export const removeTodoListAC = (todoListsId: string) => ({
    type: 'REMOVE-TODOLIST',
    todoListsId

}as const)
export const addTodoListAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    id: v1(),
    title
}as const)
export const changeTodoListTitleAC = (newTitle: string, todoListsId: string)=> ({
    type: 'CHANGE-TODOLIST-TITLE',
    newTitle,
    todoListsId
}as const)