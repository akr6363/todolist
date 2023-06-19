import TodoList from "./TodoList";
import {Meta, StoryObj} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../../state/reduxStoreProviderDecorator";
import {todoListsApi} from "../../api/todolists-api";
import {TodolistBLLType} from "../../state/todolist-reducer";
import {useEffect, useState} from "react";


const meta: Meta<typeof TodoList> = {
    title: 'TODOLISTS/TodoList',
    component: TodoList,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;

type Story = StoryObj<typeof TodoList>;

// const TodoListStory = () => {
//     //const todoList = useSelector<AppRootStateType, TodoLIstType>(state => state.todoLists[0])
//     let todoList: TodolistBLLType
//     useEffect(() => {
//         // const todoList: TodolistBLLType = todoListsApi
//         todoListsApi.getTodoLists()
//             .then(data => todoList = {...data[0], filter: 'all'})
//     }, [])
//
//
//
//     return <TodoList todoList={todoList}/>
// }

const TodoListStory = () => {
    const [todoList, setTodoList] = useState<TodolistBLLType>()
    useEffect(() => {
        todoListsApi.getTodoLists()
            .then(data => setTodoList({...data[0], filter: 'all', entityStatus: 'idle'}))
    }, [])

    return todoList ? <TodoList todoList={todoList}/> : null
}


export const TodoListStoryExample: Story = {
    render: () => <TodoListStory />
}