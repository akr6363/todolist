import TodoList from "./TodoList";
import {Meta, StoryObj} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../../state/reduxStoreProviderDecorator";
import {TodolistType} from "../../api/todolists-api";
import {TodolistBLLType} from "../../state/todolist-reducer";



const meta: Meta<typeof TodoList> = {
    title: 'TODOLISTS/TodoList',
    component: TodoList,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;

type Story = StoryObj<typeof TodoList>;

const TodoListStory = () => {
    //const todoList = useSelector<AppRootStateType, TodoLIstType>(state => state.todoLists[0])

   const todoList: TodolistBLLType = {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}

    return <TodoList todoList={todoList}/>
}

export const TodoListStoryExample: Story = {
    render: () => <TodoListStory />
}