import {addTodoListAC, TodolistBLLType, todoListReducer} from "./todolist-reducer";
import {tasksReducer, TasksType} from "./tasks-reducer";

test('tasks array for added todolist also should be added ', () => {
    const startTodoLists: TodolistBLLType[] = []
    const startTasks: TasksType = {}

    const newTodoList: TodolistBLLType = {
        id: '123',
        title: 'new todo list',
        filter: 'all',
        addedDate: '',
        order: 0,
        entityStatus: 'idle'
    }

    const action = addTodoListAC(newTodoList)

    const endTodoLists = todoListReducer(startTodoLists, action)
    const endTasks = tasksReducer(startTasks, action)

    expect(endTodoLists[0].id).toBe(action.todoList.id)
    expect(Object.keys(endTasks)[0]).toBe(action.todoList.id)
    expect(endTasks[action.todoList.id]).toEqual([])
})
