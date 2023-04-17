import React, {useState} from 'react';
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


function App(): JSX.Element {

    const todoListsId_1 = v1()
    const todoListsId_2 = v1()

    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const [todoLists, setTodoLists] = useState<TodoLIstType[]>([
        {id: todoListsId_1, title: 'What to learn', filter: 'all'},
        {id: todoListsId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todoListsId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListsId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cheese', isDone: true},
        ],
    })

    function removeTask(taskId: string, todoListsId: string) {
        let newTasksList = tasks[todoListsId].filter((task) => task.id !== taskId)
        setTasks({...tasks, [todoListsId]: newTasksList})
    }
    function addTask(title: string, todoListsId: string) {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        let newTasksList = [newTask, ...tasks[todoListsId]]
        setTasks({...tasks, [todoListsId]: newTasksList})
    }
    function changeTaskStatus(taskId: string, isDone: boolean, todoListsId: string) {
        let updateTasks = tasks[todoListsId]
            .map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        setTasks({...tasks, [todoListsId]: updateTasks})
    }
    function changeTaskTitle(taskId: string, title: string, todoListsId: string) {
        let updateTasks = tasks[todoListsId]
            .map(task => task.id === taskId ? {...task, title: title} : task)
        setTasks({...tasks, [todoListsId]: updateTasks})
    }


    function setTasksFilter(value: filterType, todoListsId: string) {
        setTodoLists(todoLists
            .map((tl) => tl.id === todoListsId ? {...tl, filter: value} : tl))
    }
    function changeTodoListTitle(newTitle: string, todoListsId: string) {
        setTodoLists(todoLists
            .map(tl => tl.id === todoListsId
                ? {...tl, title: newTitle}
                : tl))

    }
    function removeTasksList(todoListsId: string) {
        setTodoLists(todoLists.filter((tl) => tl.id !== todoListsId))
        delete tasks[todoListsId]
    }
    function addTodoList(title: string) {
        const newTodoList: TodoLIstType = {id: v1(), title: title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }



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
                                            tasks={getTasksForRender(tasks[tl.id], tl.filter)}
                                            filter={tl.filter}
                                            removeTask={removeTask}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
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

export default App;
