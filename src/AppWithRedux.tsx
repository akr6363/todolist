import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import {AddItemComponent} from "./components/AddItemComponent";
import {
    AppBar,
    Button, Checkbox,
    Container, createTheme, CssBaseline, FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {amber, lightGreen} from "@mui/material/colors";
import {
    addTodoListAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setTasksFilterAC,
    todoListReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TodoLIstType = {
    id: string
    title: string
    filter: filterType
}
export type filterType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksType = {
    [todoListsId: string]: TaskType[]
}


function AppWithRedux(): JSX.Element {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, TodoLIstType[]>(state => state.todoLists)


    const [isDarkMode, setDarkMode] = useState<boolean>(false)



    function setTasksFilter(value: filterType, todoListsId: string) {
        dispatch(setTasksFilterAC(todoListsId, value))
    }
    function changeTodoListTitle(newTitle: string, todoListsId: string) {
        dispatch(changeTodoListTitleAC(newTitle, todoListsId))

    }
    function removeTasksList(todoListsId: string) {
        dispatch(removeTodoListAC(todoListsId))
    }
    function addTodoList(title: string) {
        dispatch(addTodoListAC(title))
    }




    const customTheme = createTheme({
        palette: {
            primary: {
                main: '#afafaf',
            },
            secondary: amber,
            background: {
                default: '#f1f1f1',
            },
            mode: isDarkMode ? 'dark' : 'light'
        }
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoLists
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={(e)=>setDarkMode(e.currentTarget.checked)} />}
                                label={isDarkMode ? "Light mode" : "Dark mode"}
                            />
                        </FormGroup>

                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{p: '15px 0'}} justifyContent={"center"}>
                        <AddItemComponent addItem={addTodoList} title={'Add new list'}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoLists.map(tl => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={tl.id}>
                                    <Paper elevation={4} sx={{p: '15px 15px'}}>
                                        <TodoList
                                            id={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                            setTasksFilter={setTasksFilter}
                                            removeTasksList={removeTasksList}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>

                </Container>
            </div>
        </ThemeProvider>
    );
}

export default AppWithRedux;
