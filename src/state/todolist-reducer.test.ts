import {v1} from "uuid";
import {
    addTodoListAC,
    changeTodoListTitleAC, deleteTodoListAC,
    setTasksFilterAC, setTodoListsAC, TodolistBLLType,
    todoListReducer
} from "./todolist-reducer";


let todoListsId_1: string
let todoListsId_2: string
let startState: TodolistBLLType[];

beforeEach(() => {
    todoListsId_1 = v1()
    todoListsId_2 = v1()
    startState = [
        {id: todoListsId_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListsId_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ]
})

test('tasks filter should be change', () => {
    const endState = todoListReducer(startState, setTasksFilterAC(todoListsId_2, 'active'))
    expect(endState[1].filter).toBe('active')
    expect(endState[0].filter).toBe('all')
})


test('correct todo list should be removed', () => {
    const endState = todoListReducer(startState, deleteTodoListAC(todoListsId_1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListsId_2)
})

test('correct todo list should be added', () => {

    const newTodoList: TodolistBLLType = {
        id: '123',
        title: 'new todo list',
        filter: 'all',
        addedDate: '',
        order: 0
    }
    const endState = todoListReducer(startState, addTodoListAC(newTodoList))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoList.title)
    expect(endState[0].filter).toBe('all')
})

test('todo list title should be changed', () => {
    const newTitle = 'change todo list'
    const endState = todoListReducer(startState, changeTodoListTitleAC(newTitle, todoListsId_2))
    expect(endState[1].title).toBe(newTitle)
    expect(endState[0].title).toBe('What to learn')
})

test('todo lists should be received', () => {
    startState = []
    const todoListFromServer = [
        {id: '1', title: 'todoListFromServer1', filter: 'all', addedDate: '', order: 0},
        {id: '2', title: 'todoListFromServer2', filter: 'all', addedDate: '', order: 0},
    ]
    const endState = todoListReducer(startState, setTodoListsAC(todoListFromServer))
    expect(endState).toEqual([
        {id: '1', title: 'todoListFromServer1', filter: 'all', addedDate: '', order: 0},
        {id: '2', title: 'todoListFromServer2', filter: 'all', addedDate: '', order: 0},
    ])
})

