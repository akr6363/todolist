import React, {ChangeEvent, useCallback} from "react";
import {removeTaskTC, updateTaskTC} from "../../state/tasks-reducer";
import {Checkbox, IconButton, ListItem, ListItemButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TasksStatuses, TaskType} from "../../api/todolists-api";
import {useAppDispatch} from "../../state/hooks";


export type TaskPropsType = {
    task: TaskType
    todolistID: string
}

export const Task: React.FC<TaskPropsType> = React.memo(({task, todolistID}) => {

    const dispatch = useAppDispatch()
    const onRemoveTaskClickHandler = () => {
        dispatch(removeTaskTC(todolistID, task.id))
    }
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const model = {
            status: e.currentTarget.checked ? TasksStatuses.Completed : TasksStatuses.New
        }
        dispatch(updateTaskTC(todolistID, task.id, model))
    }

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskTC(todolistID, task.id, {title: newTitle}))
    }, [dispatch, task.id, todolistID])

    return (
        <ListItem
            key={task.id}
            secondaryAction={
                <IconButton className={'delete-todo-button'} edge="end"
                            onClick={onRemoveTaskClickHandler} disableRipple>
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
                    checked={task.status === TasksStatuses.New ? false : true}
                    size={'small'}
                    disableRipple
                    color={'secondary'}
                    onChange={onChangeTaskStatusHandler}
                />
                <EditableSpan title={task.title}
                              isDone={task.status}
                              changeTitle={changeTaskTitleHandler}/>
            </ListItemButton>
        </ListItem>
    );
})

