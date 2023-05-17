import type {Meta, StoryObj} from '@storybook/react';
import React, {ChangeEvent, useCallback} from "react";
import {Task, TaskPropsType} from "./Task";
import {Provider, useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {Checkbox, IconButton, ListItem, ListItemButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "../state/reduxStoreProviderDecorator";
import {TaskType} from "../App";


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;

type Story = StoryObj<typeof Task>;

const TaskCopy = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

    let todolistID = 'todolistId1'

    const dispatch = useDispatch()
    const onRemoveTaskClickHandler = () => {
        dispatch(removeTaskAC(task.id, todolistID))
    }
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, todolistID, e.currentTarget.checked))
    }

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, todolistID, newTitle))
    }, [dispatch, task.id, todolistID])


    return (
        <ListItem
            key={task.id}
            secondaryAction={
                <IconButton className={'delete-todo-button'} edge="end"
                            onClick={action('removeTask')} disableRipple>
                    <DeleteIcon sx={{
                        fontSize: '20px'
                    }}/>
                </IconButton>
            } disablePadding>
            <ListItemButton sx={{
                padding: '0 10px',
            }}>
                <Checkbox
                    edge="start"
                    checked={task.isDone}
                    size={'small'}
                    disableRipple
                    color={'secondary'}
                    onChange={onChangeTaskStatusHandler}
                />
                <EditableSpan title={task.title}
                              isDone={task.isDone}
                              changeTitle={changeTaskTitleHandler}/>
            </ListItemButton>
        </ListItem>
    );
}

export const Task1Story: Story = {
    render: () => <TaskCopy />
}