import React, {ChangeEvent} from 'react';
import {filterType, TaskType} from "../App";
import {AddItemComponent} from "./AddItemComponent";
import {EditableSpan} from "./EditableSpan";
import {
    Button,
    Checkbox,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TasksType} from "../AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";


type TodoListPropsType = {
    id: string
    title: string,
    filter: filterType
    setTasksFilter: (value: filterType, todoListsId: string) => void
    removeTasksList: (todoListsId: string) => void
    changeTodoListTitle: (newTitle: string, todoListsId: string) => void
}


const TodoList: React.FC<TodoListPropsType> = (
    {
        id,
        title,
        setTasksFilter,
        filter,
        removeTasksList,
        changeTodoListTitle
    }) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    function getTasksForRender(tasksList: Array<TaskType>, filterValue: filterType) {
        switch (filterValue) {
            case 'active':
                return tasksList.filter((task) => !task.isDone)
            case 'completed':
                return tasksList.filter((task) => task.isDone)
            default:
                return tasksList
        }
    }

    const todoListItems: Array<JSX.Element> = getTasksForRender(tasks[id], filter).map((task) => {

        const onRemoveTaskClickHandler = () => dispatch(removeTaskAC(task.id, id))
        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(task.id, id, e.currentTarget.checked))
        }

        const changeTaskTitleHandler = (newTitle: string) => {
            dispatch(changeTaskTitleAC(task.id, id, newTitle))
        }

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
    })

    const onAddTaskClickHandler = (title: string) => {
        dispatch(addTaskAC(title, id))
    }
    const onSetFilterHandler = (value: filterType) => {
        setTasksFilter(value, id)
    }
    const removeTasksListOnClickHandler = () => {
        removeTasksList(id)
    }

    const changeTodoListTitleHandler = (newTitle: string) => {
        changeTodoListTitle(newTitle, id)
    }

    const styles = {
        fontFamily: "Roboto",
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
        marginTop: '-6px'
    }

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
                <Button variant='contained'
                        size='small'
                        disableElevation
                        color={filter === 'all' ? 'primary' : 'secondary'}
                        onClick={() => {
                            onSetFilterHandler('all')
                        }}>All
                </Button>
                <Button variant='contained'
                        size='small'
                        disableElevation
                        color={filter === 'active' ? 'primary' : 'secondary'}
                        onClick={() => {
                            onSetFilterHandler('active')
                        }}>Active
                </Button>
                <Button variant='contained'
                        size='small'
                        disableElevation
                        color={filter === 'completed' ? 'primary' : 'secondary'}
                        onClick={() => {
                            onSetFilterHandler('completed')
                        }}>Completed
                </Button>
            </Grid>

        </div>
    );
};

export default TodoList;
