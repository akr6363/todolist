import TodoList from "./TodoList";
import {Meta, StoryObj} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../../state/reduxStoreProviderDecorator";
import {TodoLIstType} from "../../App";


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
   const todoList: TodoLIstType = {id: "todolistId2", title: "What to buy", filter: "all"}

    return <TodoList todoList={todoList}/>
}

export const TodoListStoryExample: Story = {
    render: () => <TodoListStory />
}