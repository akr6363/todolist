import React, {ChangeEvent} from 'react';
import {filterType, TaskType, TodoLIstType} from "../App";
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
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {changeTodoListTitleAC, removeTodoListAC, setTasksFilterAC} from "../state/todolist-reducer";


type TodoListPropsType = {
    todoList: TodoLIstType
}


const TodoList: React.FC<TodoListPropsType> = ({todoList}) => {

    const {id, title, filter} = todoList

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

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

    const todoListItems: Array<JSX.Element> = getTasksForRender(tasks, filter).map((task) => {
        const onRemoveTaskClickHandler = () =>{
            dispatch(removeTaskAC(task.id, id))
        }
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
        dispatch(setTasksFilterAC(id, value))
    }
    const removeTasksListOnClickHandler = () => {
        dispatch(removeTodoListAC(id))
    }
    const changeTodoListTitleHandler = (newTitle: string) => {
        dispatch(changeTodoListTitleAC(newTitle, id))
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
