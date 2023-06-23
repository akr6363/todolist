import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import TodoList from "../components/Todolist/TodoList";
import {AddItemComponent} from "../components/AddItemComponent/AddItemComponent";

import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import {ThemeProvider} from "@mui/material";

import {Menu} from '@mui/icons-material';
import {addTodoListAC, addTodoListsTC, fetchTodoListsTC} from "../state/todolist-reducer";
import {lightTheme} from "../assets/styles/customTheme";
import {useAppDispatch, useAppSelector} from "../state/hooks";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";



const App: React.FC = () => {

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todoLists)
    const status = useAppSelector(state => state.app.status)
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListsTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline/>
            <div className="App">
                <ErrorSnackBar/>
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
                                    onChange={(e) => setDarkMode(e.currentTarget.checked)}/>}
                                label={isDarkMode ? "Light mode" : "Dark mode"}
                            />
                        </FormGroup>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress color="secondary"/>}
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
                                            todoList={tl}
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
