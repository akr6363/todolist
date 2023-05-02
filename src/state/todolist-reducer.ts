import {filterType, TodoLIstType} from "../App";
import {v1} from "uuid";



export type setTasksFilterActionType = {
    type: 'SET-TASKS-FILTER'
    todoListsId: string
    value: filterType
}
export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListsId: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    id: string
    title: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    newTitle: string
    todoListsId: string
}

export type ActionsType =
    setTasksFilterActionType
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType

export const todoListReducer = (state: TodoLIstType[], action: ActionsType): TodoLIstType[] => {
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
            throw new Error('Bad action type')
    }
}

export const setTasksFilterAC = (todoListsId: string, value: filterType): setTasksFilterActionType => ({
    type: 'SET-TASKS-FILTER',
    todoListsId,
    value,
})

export const removeTodoListAC = (todoListsId: string): RemoveTodoListActionType => ({
    type: 'REMOVE-TODOLIST',
    todoListsId

})
export const addTodoListAC = (title: string): AddTodoListActionType => ({
    type: 'ADD-TODOLIST',
    id: v1(),
    title
})
export const changeTodoListTitleAC = (newTitle: string, todoListsId: string): ChangeTodoListTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    newTitle,
    todoListsId
})