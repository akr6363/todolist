import {v1} from "uuid";
import {
    addTodoListAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    setTasksFilterAC,
    todoListReducer
} from "./todolist-reducer";
import {TodoLIstType} from "../App";


let todoListsId_1: string
let todoListsId_2: string
let startState: TodoLIstType[];

beforeEach(() => {
    todoListsId_1 = v1()
    todoListsId_2 = v1()
    startState = [
        {id: todoListsId_1, title: 'What to learn', filter: 'all'},
        {id: todoListsId_2, title: 'What to buy', filter: 'all'},
    ]
})

test('tasks filter should be change', () => {
    const endState = todoListReducer(startState, setTasksFilterAC(todoListsId_2, 'active'))
    expect(endState[1].filter).toBe('active')
    expect(endState[0].filter).toBe('all')
})


test('correct todo list should be removed', () => {
    const endState = todoListReducer(startState, RemoveTodoListAC(todoListsId_1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListsId_2)
})

test('correct todo list should be added', () => {
    const title = 'new todo list'
    const endState = todoListReducer(startState, addTodoListAC(title))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(title)
    expect(endState[0].filter).toBe('all')
})

test('todo list title should be changed', () => {
    const newTitle = 'change todo list'
    const endState = todoListReducer(startState, ChangeTodoListTitleAC(newTitle, todoListsId_2))
    expect(endState[1].title).toBe(newTitle)
    expect(endState[0].title).toBe('What to learn')
})

