import React, {useCallback, useMemo} from 'react';
import {filterType, TaskType, TodoLIstType} from "../App";
import {AddItemComponent} from "./AddItemComponent";
import {EditableSpan} from "./EditableSpan";
import {Button, Grid, IconButton, List, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC} from "../state/tasks-reducer";
import {changeTodoListTitleAC, removeTodoListAC, setTasksFilterAC} from "../state/todolist-reducer";
import {Task} from "./Task";


type TodoListPropsType = {
    todoList: TodoLIstType
}


const TodoList: React.FC<TodoListPropsType> = React.memo(({todoList}) => {
    console.log('TodoList IS CALLED')
    const {id, title, filter} = todoList

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


    const todoListItems: Array<JSX.Element> = getTasksForRender(tasks, filter).map((task) => {
        return (
            <Task task={task} todolistID={id} key={task.id}/>
        )
    })

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


    const styles = useMemo(() => {
        return {
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.6,
            letterSpacing: '0.0075em',
            marginTop: '-6px'
        }
    }, [])

    return (
        <div className={'todolist'}>
            <Typography variant={'h6'} align='left' gutterBottom
                        sx={{display: 'flex', justifyContent: 'space-between'}}>
                <EditableSpan title={title}
                              changeTitle={changeTodoListTitleHandler}
                              styles={styles}/>
                <IconButton onClick={removeTasksListOnClickHandler}
                            size={'small'}
                            disableRipple
                            className="delete-todo-button">
                    <ClearIcon/>
                </IconButton>
            </Typography>
            <Grid container sx={{p: '5px 0'}} justifyContent={"center"}>
                <AddItemComponent addItem={onAddTaskClickHandler} title={'Add a task'}/>
            </Grid>
            <List>
                {
                    todoListItems.length ?
                        todoListItems :
                        <Grid container sx={{p: '0 0 10px 0'}} justifyContent={"center"}>
                            Your todo-list is empty
                        </Grid>
                }

            </List>
            <Grid container className={'btn-container'}>
                <ButtonMemo title={'All'}
                            variant='contained'
                            size='small'
                            disableElevation
                            color={filter === 'all' ? 'primary' : 'secondary'}
                            onClick={() => {
                                onSetFilterHandler('all')
                            }}/>
                <ButtonMemo title={'Active'}
                            variant='contained'
                            size='small'
                            disableElevation
                            color={filter === 'active' ? 'primary' : 'secondary'}
                            onClick={() => {
                                onSetFilterHandler('active')
                            }}/>
                <ButtonMemo title={'Completed'}
                            variant='contained'
                            size='small'
                            disableElevation
                            color={filter === 'completed' ? 'primary' : 'secondary'}
                            onClick={() => {
                                onSetFilterHandler('completed')
                            }}/>
            </Grid>
        </div>
    );
});

export default TodoList;

//ButtonMemo перерисовывается потмоу что передаем callBack в атрибуты

type ButtonMemoPropsType = {
    title: string
    variant:  'text' | 'outlined' | 'contained'
    size?: 'small' | 'medium' | 'large'
    disableElevation?: boolean
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    onClick: () => void
}


const ButtonMemo: React.FC<ButtonMemoPropsType> = (
    {title, variant, size, color, disableElevation = false, onClick}) => {
    return (
        <Button variant={variant}
                size={size}
                disableElevation = {disableElevation}
                color={color}
                onClick={onClick}>{title}
        </Button>
    )
}