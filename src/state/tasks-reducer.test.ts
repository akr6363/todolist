import {TasksType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {RemoveTodoListAC} from "./todolist-reducer";

let startTasks: TasksType;

beforeEach(() => {
    startTasks = {
        ['todoListsId_1']: [
            {id: '1', title: 'HTML', isDone: false},
            {id: '2', title: 'CSS', isDone: true},
        ],
        ['todoListsId_2']: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Cheese', isDone: true},
        ],
    }
})


test('task should be removed', () => {
    const endTasks = tasksReducer(startTasks, removeTaskAC('2', 'todoListsId_1'))

    expect(endTasks).toEqual({
        ['todoListsId_1']: [
            {id: '1', title: 'HTML', isDone: false}
        ],
        ['todoListsId_2']: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Cheese', isDone: true},
        ],
    })
})

test('task should be added', () => {
    const endTasks = tasksReducer(startTasks, addTaskAC('new task', 'todoListsId_1'))

    expect(endTasks['todoListsId_1'].length).toBe(3)
    expect(endTasks['todoListsId_2'].length).toBe(2)
    expect(endTasks['todoListsId_1'][0].title).toBe('new task')
    expect(endTasks['todoListsId_1'][0].id).toBeDefined()
    expect(endTasks['todoListsId_1'][0].isDone).toBeFalsy()

})

test('task status should be changed', () => {
    const endTasks = tasksReducer(startTasks, changeTaskStatusAC('2', 'todoListsId_1', false))
    expect(endTasks).toEqual({
        ['todoListsId_1']: [
            {id: '1', title: 'HTML', isDone: false},
            {id: '2', title: 'CSS', isDone: false},
        ],
        ['todoListsId_2']: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Cheese', isDone: true},
        ],
    })

})

test('task title should be changed', () => {
    const endTasks = tasksReducer(startTasks, changeTaskTitleAC('2', 'todoListsId_1', 'new title'))
    expect(endTasks).toEqual({
        ['todoListsId_1']: [
            {id: '1', title: 'HTML', isDone: false},
            {id: '2', title: 'new title', isDone: true},
        ],
        ['todoListsId_2']: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Cheese', isDone: true},
        ],
    })
})

test('tasks array should be deleted for deleted todo list', () => {
    const endTasks = tasksReducer(startTasks, RemoveTodoListAC('todoListsId_1'))
    expect(endTasks).toEqual({
        ['todoListsId_2']: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Cheese', isDone: true},
        ],
    })
})
