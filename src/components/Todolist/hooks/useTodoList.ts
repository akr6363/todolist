import {useCallback, useEffect} from "react";
import {addTaskAC, fetchTasksTC} from "../../../state/tasks-reducer";
import {changeTodoListTitleAC, filterType, removeTodoListAC, setTasksFilterAC,} from "../../../state/todolist-reducer";
import {TasksStatuses, TaskType} from "../../../api/todolists-api";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";

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