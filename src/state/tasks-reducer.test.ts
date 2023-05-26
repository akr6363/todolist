import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType} from "./tasks-reducer";
import {removeTodoListAC} from "./todolist-reducer";

let startTasks: TasksType;

beforeEach(() => {
    startTasks = {
        ['todoListsId_1']: [
            {
                id: '1', title: 'HTML', status: 0, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
            {
                id: '2', title: 'CSS', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
        ],
        ['todoListsId_2']: [
            {
                id: '1', title: 'Milk', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
            {
                id: '2', title: 'Cheese', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
        ],
    }
})


test('task should be removed', () => {
    const endTasks = tasksReducer(startTasks, removeTaskAC('2', 'todoListsId_1'))

    expect(endTasks).toEqual({
        ['todoListsId_1']: [
            {
                id: '1', title: 'HTML', status: 0, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
        ],
        ['todoListsId_2']: [
            {
                id: '1', title: 'Milk', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
            {
                id: '2', title: 'Cheese', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
        ],
    })
})

test('task should be added', () => {
    const endTasks = tasksReducer(startTasks, addTaskAC('new task', 'todoListsId_1'))

    expect(endTasks['todoListsId_1'].length).toBe(3)
    expect(endTasks['todoListsId_2'].length).toBe(2)
    expect(endTasks['todoListsId_1'][0].title).toBe('new task')
    expect(endTasks['todoListsId_1'][0].id).toBeDefined()
    expect(endTasks['todoListsId_1'][0].status).toBeFalsy()

})

test('task status should be changed', () => {
    const endTasks = tasksReducer(startTasks, changeTaskStatusAC('2', 'todoListsId_1', false))
    expect(endTasks).toEqual({
        ['todoListsId_1']: [
            {
                id: '1', title: 'HTML', status: 0, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
            {
                id: '2', title: 'CSS', status: 0, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
        ],
        ['todoListsId_2']: [
            {
                id: '1', title: 'Milk', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
            {
                id: '2', title: 'Cheese', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
        ],
    })

})

test('task title should be changed', () => {
    const endTasks = tasksReducer(startTasks, changeTaskTitleAC('2', 'todoListsId_1', 'new title'))
    expect(endTasks).toEqual({
        ['todoListsId_1']: [
            {
                id: '1', title: 'HTML', status: 0, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
            {
                id: '2', title: 'new title', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
        ],
        ['todoListsId_2']: [
            {
                id: '1', title: 'Milk', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
            {
                id: '2', title: 'Cheese', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
        ],
    })
})

test('tasks array should be deleted for deleted todo list', () => {
    const endTasks = tasksReducer(startTasks, removeTodoListAC('todoListsId_1'))
    expect(endTasks).toEqual({
        ['todoListsId_2']: [
            {
                id: '1', title: 'Milk', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
            {
                id: '2', title: 'Cheese', status: 1, todoListId: "todolistId1",
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
        ],
    })
})
