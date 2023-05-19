import React, {ChangeEvent, FocusEvent, useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {filterType, TaskType} from "../../../App";
import {Task} from "../../Task";
import {addTaskAC} from "../../../state/tasks-reducer";
import {changeTodoListTitleAC, removeTodoListAC, setTasksFilterAC} from "../../../state/todolist-reducer";

export const useTodoList = ( id: string) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    const getTasksForRender = (tasksList: Array<TaskType>, filterValue: filterType) => {
        switch (filterValue) {
            case 'active':
                return tasksList.filter((task) => !task.isDone)
            case 'completed':
                return tasksList.filter((task) => task.isDone)
            default:
                return tasksList
        }
    }

    const onAddTaskClickHandler = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch, id])

    const onSetFilterHandler = useCallback((value: filterType) => {
        dispatch(setTasksFilterAC(id, value))
    }, [dispatch, id])

    const removeTasksListOnClickHandler = () => {
        dispatch(removeTodoListAC(id))
    }
    const changeTodoListTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTodoListTitleAC(newTitle, id))
    }, [dispatch, id])


    return {
        tasks,
        getTasksForRender,
        onAddTaskClickHandler,
        onSetFilterHandler,
        removeTasksListOnClickHandler,
        changeTodoListTitleHandler,
    }
}