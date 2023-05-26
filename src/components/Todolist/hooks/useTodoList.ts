import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {addTaskAC, setTasksAC} from "../../../state/tasks-reducer";
import {changeTodoListTitleAC, filterType, removeTodoListAC, setTasksFilterAC,} from "../../../state/todolist-reducer";
import {TasksStatuses, TaskType, todoListsApi} from "../../../api/todolists-api";

export const useTodoList = ( id: string) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    useEffect(()=> {
        todoListsApi.getTasks(id)
            .then(data => {
                dispatch(setTasksAC(id, data.items))
            })
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