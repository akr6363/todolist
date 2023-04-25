import {TasksType, TodoLIstType} from "../App";
import {addTodoListAC, todoListReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

test('tasks array for added todolist also should be added ', () => {
    const startTodoLists: TodoLIstType[] = []
    const startTasks: TasksType = {}

    const action = addTodoListAC('new todo')

    const endTodoLists = todoListReducer(startTodoLists, action)
    const endTasks = tasksReducer(startTasks, action)

    expect(endTodoLists[0].id).toBe(action.id)
    expect(Object.keys(endTasks)[0]).toBe(action.id)
    expect(endTasks[action.id]).toEqual([])
})