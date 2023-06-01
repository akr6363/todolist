import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    TasksType
} from "./tasks-reducer";
import {deleteTodoListAC, setTodoListsAC} from "./todolist-reducer";
import {TaskType} from "../api/todolists-api";
import {v1} from "uuid";

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
    const newTask: TaskType =
        {
            id: v1(),
            title: 'new task',
            status: 0,
            todoListId: 'todoListsId_1',

            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
        }

    const endTasks = tasksReducer(startTasks, addTaskAC(newTask, 'todoListsId_1'))

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
    const endTasks = tasksReducer(startTasks, deleteTodoListAC('todoListsId_1'))
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


test('empty tasks array should be created for each todo list', () => {
    const todoLists = [
        {id: 'todoListsId_1', title: 'todoListFromServer1', filter: 'all', addedDate: '', order: 0},
        {id: 'todoListsId_2', title: 'todoListFromServer2', filter: 'all', addedDate: '', order: 0},
    ]

    const endTasks = tasksReducer({}, setTodoListsAC(todoLists))
    expect(endTasks).toEqual({
        ['todoListsId_1']: [],
        ['todoListsId_2']: [],
    })
})

test('tasks should be set to todo list', () => {
    const startState = {
        ['todoListsId_1']: [],
        ['todoListsId_2']: [],
    }
    const tasks = [
        {
            id: '1', title: 'HTML', status: 0, todoListId: 'todoListsId_1',
            addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
        },
        {
            id: '2', title: 'CSS', status: 1, todoListId: 'todoListsId_2',
            addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
        },
    ]

    const endTasks = tasksReducer(startState, setTasksAC('todoListsId_1', tasks))
    expect(endTasks).toEqual({
        ['todoListsId_1']: [
            {
                id: '1', title: 'HTML', status: 0, todoListId: 'todoListsId_1',
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
            {
                id: '2', title: 'CSS', status: 1, todoListId: 'todoListsId_2',
                addedDate: '', deadline: '', description: '', order: 0, priority: 0, startDate: '',
            },
        ],
        ['todoListsId_2']: [],
    })
})
