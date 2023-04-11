import React, {ChangeEvent} from 'react';
import {filterType, TaskType} from "../App";
import {AddItemComponent} from "./AddItemComponent";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


type TodoListPropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListId: string) => void
    setTasksFilter: (value: filterType, todoListsId: string) => void
    addTask: (title: string, todoListsId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListsId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListsId: string) => void
    changeTodoListTitle: (newTitle: string, todoListsId: string) => void
    removeTasksList: (todoListsId: string) => void
    filter: filterType
}


const TodoList: React.FC<TodoListPropsType> = (
    {
        id,
        title,
        tasks,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        setTasksFilter,
        filter,
        addTask,
        removeTasksList,
        changeTodoListTitle
    }) => {

    const todoListItems: Array<JSX.Element> = tasks.map((task) => {

        const onRemoveTaskClickHandler = () => removeTask(task.id, id)
        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked, id)
        }

        const changeTaskTitleHandler = (newTitle: string) => {
            changeTaskTitle(task.id, newTitle, id)
        }

        return (
            <ListItem key={task.id}
                      divider
                      disablePadding
                      secondaryAction={
                          <IconButton onClick={onRemoveTaskClickHandler}
                                      size={'small'}>
                              <DeleteForeverIcon/>
                          </IconButton>
                      }>
                <Checkbox
                    edge={'start'}
                    color={'secondary'}
                    size={'small'}
                    checked={task.isDone}
                    onChange={onChangeTaskStatusHandler}/>
                <EditableSpan title={task.title}
                              isDone={task.isDone}
                              changeTitle={changeTaskTitleHandler}/>
            </ListItem>

        )
    })

    const onAddTaskClickHandler = (title: string) => {
        addTask(title, id)
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

    return (
        <div className={'todolist'}>
            <Typography variant={'h5'} align='center' fontWeight='bold' gutterBottom>
                <EditableSpan title={title} changeTitle={changeTodoListTitleHandler}/>
                <Button onClick={removeTasksListOnClickHandler}
                        variant={'contained'}
                        size={'small'}
                        endIcon={<DeleteForeverIcon/>}
                        sx={{ml: '10px'}}>
                    DEL
                </Button>

            </Typography>
            <AddItemComponent addItem={onAddTaskClickHandler}/>
            <List>
                {todoListItems}
            </List>
            <div className={'btn-container'}>
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
            </div>
        </div>
    );
};

export default TodoList;
