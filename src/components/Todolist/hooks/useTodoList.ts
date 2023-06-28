import React, {useCallback, useEffect} from "react";
import {addTaskTC, fetchTasksTC} from "../../../state/tasks-reducer";
import {deleteTodoListsTC, filterType, setTasksFilterAC, updateTodoListTitleTC,} from "../../../state/todolist-reducer";
import {TasksStatuses, TaskType} from "../../../api/todolists-api";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";
import {Navigate} from "react-router-dom";

export const useTodoList = ( id: string) => {

    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks[id])

    useEffect(()=> {
        dispatch(fetchTasksTC(id))
    }, [])


    const getTasksForRender = (tasksList: Array<TaskType>, filterValue: filterType) => {
        switch (filterValue) {
            case 'active':
                return tasksList.filter((task) => task.status === TasksStatuses.New)
            case 'completed':
                return tasksList.filter((task) => task.status === TasksStatuses.Completed)
            default:
                return tasksList
        }
    }

    const onAddTaskClickHandler = useCallback((title: string) => {
        dispatch(addTaskTC(id, title))
    }, [dispatch, id])

    const onSetFilterHandler = useCallback((value: filterType) => {
        dispatch(setTasksFilterAC(id, value))
    }, [dispatch, id])

    const removeTasksListOnClickHandler = () => {
        dispatch(deleteTodoListsTC(id))
    }
    const changeTodoListTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTodoListTitleTC(newTitle, id))
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